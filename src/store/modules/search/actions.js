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
import i18n from 'config/i18n';
import client from 'api/search';
import { createCancelToken, wasCancelled } from 'api/helpers';

let searchNameCancelToken = undefined;
let searchQueryCancelToken = undefined;

import { successAction, errorFromResponse, entitiesObject, loadingAction, idleAction } from 'store/common';

import { setHotels } from 'store/modules/hotels/actions';
import { getUserCountryContext } from 'store/modules/auth/selectors';
import { getCanSearch } from './selectors';

export const SEARCH_QUERY_UPDATE = 'SEARCH_QUERY_UPDATE';
export const SEARCH_FILTERS_RESET = 'SEARCH_FILTERS_RESET';
export const SEARCH_RESULTS = 'SEARCH_RESULTS';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const SEARCH_BY_QUERY = 'SEARCH_BY_QUERY';

/**
 * Set search query action
 *
 * @param {object} payload
 * @returns {object}
 */
export const setSearchQuery = payload => ({
  type: SEARCH_QUERY_UPDATE,
  payload,
});

/**
 * Search filters reset action
 *
 * @param {object} payload
 * @returns {object}
 */
export const searchFiltersReset = payload => ({
  type: SEARCH_FILTERS_RESET,
  payload,
});

/**
 * Search by name action
 *
 * @param {object} payload
 * @returns {object}
 */
export const searchByNameAction = payload => ({
  type: SEARCH_BY_NAME,
  payload,
});

/**
 * Search by query action
 *
 * @param {object} payload
 * @returns {object}
 */
export const searchByQueryAction = payload => ({
  type: SEARCH_BY_QUERY,
  payload,
});

/**
 * Search by name
 *
 * Auto complete search bar using name only
 *
 * @param {object} destination
 * @returns {Function}
 */
export const searchByName = destination => async (dispatch, getState) => {
  // SRs can be a different country so get actingCountryCode
  const actingCountryCode = getUserCountryContext(getState());

  dispatch(setSearchQuery({ destination }));
  dispatch(searchByNameAction(destination));
  dispatch(loadingAction(SEARCH_BY_NAME, { destination }));

  // Create a cancel token so that multiple triggers cancel previous requests
  searchNameCancelToken && searchNameCancelToken.cancel('New search initiated');
  searchNameCancelToken = createCancelToken();

  // Stored in local storage so we can retrieve it later if needs be
  localStorage.setItem(SEARCH_BY_NAME, JSON.stringify(destination));

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

    // Set the hotels to the hotels key in redux
    dispatch(setHotels(entitiesObject('hotels', hotels)));
    dispatch(successAction(SEARCH_BY_NAME, { byName: { result } }));

    // Reset the search token
    searchNameCancelToken = undefined;
  } catch (e) {
    wasCancelled(e) ? dispatch(idleAction('SEARCH', {})) : dispatch(errorFromResponse(SEARCH_BY_NAME, e));
  }
};

export const getPayloadFromSearchQuery = (query, actingCountryCode, repeatGuest, occasions) => {
  return pipe(
    omit(['prices']),
    mergeDeepLeft({ actingCountryCode }),
    over(lensProp('lodging'), map(mergeDeepLeft({ repeatCustomer: repeatGuest, ...occasions }))),
    set(lensProp('suitableForHoneymooners'), propOr(false, 'honeymoon', occasions))
  )(query);
};

export const subDaysFromPayload = over(lensPath(['dates', 'endDate']), partialRight(subDays, [1]));

/**
 * Search by query
 *
 * The main search that handles results for the search page
 *
 * @param {object} query
 * @returns {Function}
 */
export const searchByQuery = query => async (dispatch, getState) => {
  // SRs can be a different country
  const actingCountryCode = getUserCountryContext(getState());

  dispatch(searchByQueryAction(query));
  dispatch(loadingAction(SEARCH_BY_QUERY, query));
  const canSearch = getCanSearch(getState());

  // Make sure that we don't trigger an incomplete search
  if (!canSearch) return dispatch(successAction(SEARCH_BY_QUERY, {}));

  const term = path(['destination', 'value'], query);
  const occasions = prop('occasions', query);
  const repeatGuest = prop('repeatGuest', query);

  // Set a cancel token so that multiple trigger cancel the previous request
  searchQueryCancelToken && searchQueryCancelToken.cancel('New search initiated');
  searchQueryCancelToken = createCancelToken();

  const payloadWithRawDays = getPayloadFromSearchQuery(query, actingCountryCode, repeatGuest, occasions);

  localStorage.setItem(SEARCH_BY_QUERY, JSON.stringify(payloadWithRawDays));

  const payload = subDaysFromPayload(payloadWithRawDays);

  try {
    const {
      data: { data, meta },
    } = await client.getSearch(payload, {}, { cancelToken: searchQueryCancelToken.token });

    // We get everything back in one payload so we need to trigger multiple actions so
    // the data ends up in the right keys
    const hotels = path(['entities', 'hotels'], data);
    const uploads = path(['entities', 'uploads'], data);
    const hotelsResults = path(['result', 'hotels'], data);

    dispatch(setHotels({ entities: { hotels, uploads }, result: hotelsResults }));
    dispatch(successAction(SEARCH_BY_QUERY, { byQuery: { meta: { term, ...meta }, result: hotelsResults } }));

    // Reset the cancel token
    searchQueryCancelToken = undefined;
  } catch (e) {
    wasCancelled(e)
      ? dispatch(idleAction('SEARCH', {}))
      : dispatch(errorFromResponse(SEARCH_BY_QUERY, e, i18n.t('searchByQueryErrorResponse')));
  }
};
