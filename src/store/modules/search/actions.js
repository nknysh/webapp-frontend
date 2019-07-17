import {
  lensPath,
  lensProp,
  map,
  mergeDeepLeft,
  omit,
  over,
  partialRight,
  path,
  pathOr,
  pipe,
  prop,
  propOr,
  set,
} from 'ramda';
import { subDays } from 'date-fns';

import client from 'api/search';
import { createCancelToken, wasCancelled } from 'api/helpers';

let searchNameCancelToken = undefined;
let searchQueryCancelToken = undefined;

import { successAction, errorFromResponse, entitiesObject, loadingAction, idleAction } from 'store/common';

import { setHotels } from 'store/modules/hotels/actions';
import { getUserCountryContext } from 'store/modules/auth/selectors';
import { setCountries } from 'store/modules/countries/actions';
import { getCanSearch } from './selectors';

export const SEARCH_QUERY_UPDATE = 'SEARCH_QUERY_UPDATE';
export const SEARCH_FILTERS_RESET = 'SEARCH_FILTERS_RESET';
export const SEARCH_RESULTS = 'SEARCH_RESULTS';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';

export const SEARCH_BY_QUERY = 'SEARCH_BY_QUERY';

export const setSearchQuery = payload => ({
  type: SEARCH_QUERY_UPDATE,
  payload,
});

export const searchFiltersReset = payload => ({
  type: SEARCH_FILTERS_RESET,
  payload,
});

export const searchByNameAction = payload => ({
  type: SEARCH_BY_NAME,
  payload,
});

export const searchByQueryAction = payload => ({
  type: SEARCH_BY_QUERY,
  payload,
});

export const searchByName = destination => async (dispatch, getState) => {
  const actingCountryCode = getUserCountryContext(getState());

  dispatch(setSearchQuery({ destination }));
  dispatch(searchByNameAction(destination));
  dispatch(loadingAction(SEARCH_BY_NAME, { destination }));

  searchNameCancelToken && searchNameCancelToken.cancel('New search initiated');
  searchNameCancelToken = createCancelToken();

  try {
    const {
      data: { data },
    } = await client.getSearchByName(
      prop('value', destination),
      { actingCountryCode },
      { cancelToken: searchNameCancelToken.token }
    );

    const result = prop('result', data);
    const hotels = pathOr({}, ['entities', 'hotels'], data);
    const countries = pathOr({}, ['entities', 'countries'], data);

    dispatch(setHotels(entitiesObject('hotels', hotels)));
    dispatch(setCountries(entitiesObject('countries', countries)));
    dispatch(successAction(SEARCH_BY_NAME, { byName: { result } }));
    searchNameCancelToken = undefined;
  } catch (e) {
    wasCancelled(e) ? dispatch(idleAction('SEARCH', {})) : dispatch(errorFromResponse(SEARCH_BY_NAME, e));
  }
};

export const searchByQuery = query => async (dispatch, getState) => {
  const actingCountryCode = getUserCountryContext(getState());

  dispatch(searchByQueryAction(query));
  dispatch(loadingAction(SEARCH_BY_QUERY, query));
  const canSearch = getCanSearch(getState());

  if (!canSearch) return dispatch(successAction(SEARCH_BY_QUERY, {}));

  const term = path(['destination', 'value'], query);
  const occasions = prop('occasions', query);
  const repeatGuest = prop('repeatGuest', query);

  searchQueryCancelToken && searchQueryCancelToken.cancel('New search initiated');
  searchQueryCancelToken = createCancelToken();

  const payload = pipe(
    omit(['prices']),
    mergeDeepLeft({ actingCountryCode }),
    over(lensPath(['dates', 'endDate']), partialRight(subDays, [1])),
    over(lensProp('lodging'), map(mergeDeepLeft({ repeatCustomer: repeatGuest, ...occasions }))),
    set(lensProp('suitableForHoneymooners'), propOr(false, 'honeymoon', occasions))
  )(query);

  try {
    const {
      data: { data, meta },
    } = await client.getSearch(payload, {}, { cancelToken: searchQueryCancelToken.token });

    const hotels = path(['entities', 'hotels'], data);
    const uploads = path(['entities', 'uploads'], data);
    const countries = path(['entities', 'countries'], data);
    const hotelsResults = path(['result', 'hotels'], data);
    const countriesResults = path(['result', 'countries'], data);

    dispatch(setHotels({ entities: { hotels, uploads }, result: hotelsResults }));
    dispatch(setCountries({ entities: { countries }, result: countriesResults }));
    dispatch(successAction(SEARCH_BY_QUERY, { byQuery: { meta: { term, ...meta }, result: hotelsResults } }));
    searchQueryCancelToken = undefined;
  } catch (e) {
    wasCancelled(e) ? dispatch(idleAction('SEARCH', {})) : dispatch(errorFromResponse(SEARCH_BY_QUERY, e));
  }
};
