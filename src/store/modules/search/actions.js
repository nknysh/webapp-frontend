import { prop, pathOr, path } from 'ramda';

import client from 'api/search';

import { successAction, errorFromResponse, entitiesObject, loadingAction } from 'store/common';

import { setHotels } from 'store/modules/hotels/actions';
import { setCountries } from 'store/modules/countries/actions';

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

export const searchByName = destination => async dispatch => {
  dispatch(setSearchQuery({ destination }));
  dispatch(searchByNameAction(destination));
  dispatch(loadingAction(SEARCH_BY_NAME, { destination }));

  try {
    const {
      data: { data },
    } = await client.getSearchByName(prop('value', destination));

    const result = prop('result', data);
    const hotels = pathOr({}, ['entities', 'hotels'], data);
    const countries = pathOr({}, ['entities', 'countries'], data);

    dispatch(setHotels(entitiesObject('hotels', hotels)));
    dispatch(setCountries(entitiesObject('countries', countries)));
    dispatch(successAction(SEARCH_BY_NAME, { byName: { result } }));
  } catch (e) {
    dispatch(errorFromResponse(SEARCH_BY_NAME, e));
    throw e;
  }
};

export const searchByQuery = query => async dispatch => {
  dispatch(searchByQueryAction(query));
  dispatch(loadingAction(SEARCH_BY_QUERY, query));

  const term = path(['destination', 'value'], query);

  try {
    const {
      data: { data, meta },
    } = await client.getSearch(query);

    const hotels = path(['entities', 'hotels'], data);
    const uploads = path(['entities', 'uploads'], data);
    const countries = path(['entities', 'countries'], data);

    const hotelsResults = path(['result', 'hotels'], data);
    const countriesResults = path(['result', 'countries'], data);

    dispatch(setHotels({ entities: { hotels, uploads }, result: hotelsResults }));
    dispatch(setCountries({ entities: { countries }, result: countriesResults }));
    dispatch(successAction(SEARCH_BY_QUERY, { byQuery: { meta: { term, ...meta }, result: hotelsResults } }));
  } catch (e) {
    dispatch(errorFromResponse(SEARCH_BY_QUERY, e));
    throw e;
  }
};
