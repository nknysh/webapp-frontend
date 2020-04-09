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
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { subDays } from 'date-fns';
import i18n from 'config/i18n';
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
export const SEARCH_QUERY_RESET = 'SEARCH_QUERY_RESET';
export const SEARCH_FILTERS_RESET = 'SEARCH_FILTERS_RESET';
export const SEARCH_RESULTS = 'SEARCH_RESULTS';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const SEARCH_BY_QUERY = 'SEARCH_BY_QUERY';

export const SEARCH_OPTIONS_REQUEST = 'SEARCH/SEARCH_OPTIONS_REQUEST';
export const SEARCH_OPTIONS_SUCCESS = 'SEARCH/SEARCH_OPTIONS_SUCCESS';
export const SEARCH_OPTIONS_FAILURE = 'SEARCH/SEARCH_OPTIONS_FAILURE';

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
 * Reset search query action
 *
 * @param {object} payload
 * @returns {object}
 */
export const resetSearchQuery = payload => ({
  type: SEARCH_QUERY_RESET,
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
 * Search query object
 *
 * @param {object} filters
 * @returns {Object}
 */
export const sanitizePriceRange = filters => {
  const sanitizedPrices = filters.prices ? filters.prices.map(v => (v === '' || v === 0 ? undefined : v)) : [];

  return {
    ...filters,
    // Fun fact: It's prices here, and in the middleware. But it's priceRange in the back end.
    prices: {
      min: sanitizedPrices[0],
      max: sanitizedPrices[1],
    },
  };
};

/**
 * Search by name
 *
 * Auto complete search bar using name only
 *
 * @param {object} destination
 * @param {string} destination.value the typed in value for the name
 * @param {boolean} destination.doSearch if true, we should set the search query, thus triggering a search
 * @returns {Function}
 */
export const searchByName = (destination, limit) => async (dispatch, getState) => {
  // SRs can be a different country so get actingCountryCode
  const actingCountryCode = getUserCountryContext(getState());

  // we only want to set the search query (and thus perform an actual search)
  // under specific circumstances
  // @see https://pureescapes.atlassian.net/browse/OWA-628
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
      { actingCountryCode: isNilOrEmpty(actingCountryCode) ? undefined : actingCountryCode, limit },
      { cancelToken: searchNameCancelToken.token }
    );

    const result = prop('result', data);
    const hotels = pathOr({}, ['entities', 'hotels'], data);
    const countries = pathOr({}, ['entities', 'countries'], data);

    // Set the hotels to the hotels key in redux
    dispatch(setHotels(entitiesObject('hotels', hotels)));
    // Set the countries to the countries keys in redux
    dispatch(setCountries(entitiesObject('countries', countries)));
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
    mergeDeepLeft({ actingCountryCode: isNilOrEmpty(actingCountryCode) ? undefined : actingCountryCode }),
    over(lensProp('lodging'), map(mergeDeepLeft({ repeatCustomer: repeatGuest, ...occasions })))
  )(query);
};

export const subDaysFromPayload = over(
  lensPath(['dates', 'endDate']),
  pipe(input => new Date(input), partialRight(subDays, [1]))
);

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

  // Sanitize the query object
  const filters = propOr({}, 'filters', query);
  const sanitizedQuery = {
    ...query,
    filters: pipe(sanitizePriceRange)(filters),
  };

  dispatch(searchByQueryAction(sanitizedQuery));
  dispatch(loadingAction(SEARCH_BY_QUERY, sanitizedQuery));
  const canSearch = getCanSearch(getState());

  // Make sure that we don't trigger an incomplete search
  if (!canSearch) return dispatch(successAction(SEARCH_BY_QUERY, {}));

  const term = path(['destination', 'value'], sanitizedQuery);
  const occasions = prop('occasions', sanitizedQuery);
  const repeatGuest = prop('repeatGuest', sanitizedQuery);

  // Set a cancel token so that multiple trigger cancel the previous request
  searchQueryCancelToken && searchQueryCancelToken.cancel('New search initiated');
  searchQueryCancelToken = createCancelToken();

  const payloadWithRawDays = getPayloadFromSearchQuery(sanitizedQuery, actingCountryCode, repeatGuest, occasions);

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
    const countries = path(['entities', 'countries'], data);
    const hotelsResults = path(['result', 'hotels'], data);
    const countriesResults = path(['result', 'countries'], data);

    dispatch(setCountries({ entities: { countries }, result: countriesResults }));
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

export const searchOptionsInitAction = () => async dispatch => {
  dispatch(searchOptionsRequestAction());
  try {
    const options = await client.getOptions();
    dispatch(searchOptionsSuccessAction({ options }));
  } catch (error) {
    // Try again, and keep trying because sometimes the proxy fails
    dispatch(searchOptionsInitAction());
    dispatch(searchOptionsFailureAction({ error }));
  }
};

export const searchOptionsRequestAction = () => ({
  type: SEARCH_OPTIONS_REQUEST,
});

export const searchOptionsSuccessAction = response => ({
  type: SEARCH_OPTIONS_SUCCESS,
  payload: { ...response.options.data.data },
});

export const searchOptionsFailureAction = error => ({
  type: SEARCH_OPTIONS_FAILURE,
  payload: { error },
});
