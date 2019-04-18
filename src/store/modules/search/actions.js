import { prop, path } from 'ramda';

import { IndexTypes } from 'utils';

import client from 'api/search';

import { successAction, errorAction } from 'store/common';
import { searchIndex } from 'store/modules/indexes/actions';

import { fetchHotelsSuccess } from 'store/modules/hotels/actions';
import { setCountries } from 'store/modules/countries/actions';

import { getSearchValue } from './selectors';

export const SEARCH_INDEX_BUILD = 'SEARCH_INDEX_BUILD';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const RESET_SEARCH_FILTERS = 'RESET_SEARCH_FILTERS';
export const SEARCH_RESULTS = 'SEARCH_RESULTS';
export const FETCH_SEARCH = 'FETCH_SEARCH';

export const buildIndex = payload => ({
  type: SEARCH_INDEX_BUILD,
  payload,
});

export const setSearchQueryAction = payload => ({
  type: SET_SEARCH_QUERY,
  payload,
});

export const resetFiltersAction = payload => ({
  type: RESET_SEARCH_FILTERS,
  payload,
});

export const searchResults = payload => ({
  type: SEARCH_RESULTS,
  payload,
});

export const fetchSearchAction = payload => ({
  type: FETCH_SEARCH,
  payload,
});

export const resetFilters = payload => dispatch => {
  dispatch(resetFiltersAction(payload));

  const index = prop('index', payload);
  index && dispatch(searchIndex(index));
};

export const setSearchQuery = ({ index = IndexTypes.HOTELS, ...payload }) => dispatch => {
  dispatch(setSearchQueryAction(payload));
  dispatch(searchIndex(index));
};

export const fetchSearch = ({ value, index = IndexTypes.HOTELS }) => (dispatch, getState) => {
  const payload = { name: value };

  const state = getState();
  const searchValue = getSearchValue(state);

  dispatch(fetchSearchAction(payload));

  client
    .getSearch(payload, { name: searchValue })
    .then(({ data: { data } }) => {
      const hotelsEntities = path(['entities', 'hotels'], data);
      const hotelsResults = path(['result', 'hotels'], data);
      const photosEntities = path(['entities', 'photos'], data);
      const countriesEntities = path(['entities', 'countries'], data);
      const countriesResults = path(['result', 'countries'], data);

      dispatch(
        fetchHotelsSuccess({ entities: { hotels: hotelsEntities, photos: photosEntities }, result: hotelsResults })
      );
      dispatch(setCountries({ entities: { countries: countriesEntities }, result: countriesResults }));
      dispatch(searchIndex(index));
      dispatch(successAction(FETCH_SEARCH, { result: prop('result', data) }));
    })
    .catch(error => dispatch(errorAction(FETCH_SEARCH, error)));
};
