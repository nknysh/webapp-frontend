import lunr from 'lunr';
import { curry, map, propOr, pathOr, prop, pipe, path, cond, equals, T, always } from 'ramda';

import {
  filterByRange,
  filterByArrayValues,
  queryAvailable,
  queryFilterRegions,
  queryFilterStarRatings,
  queryHoneymooners,
  queryPreferred,
  querySearchType,
  searchByQueries,
  toList,
  IndexTypes,
} from 'utils';

import { successAction } from 'store/common';
import { getHotel, getHotelRegions } from 'store/modules/hotels/selectors';
import { getSearchQuery } from 'store/modules/search/selectors';

import { getIndex } from './selectors';

export const INDEXING = 'INDEXING';
export const INDEX_SEARCH = 'INDEX_SEARCH';

const buildIndexQueryArr = (searchQuery, { regions }) =>
  toList(
    queryAvailable(),
    queryPreferred(),
    queryHoneymooners(searchQuery),
    querySearchType(propOr({}, 'search', searchQuery)),
    queryFilterRegions(pathOr({}, ['filters', 'regions'], searchQuery), regions),
    queryFilterStarRatings(pathOr({}, ['filters', 'starRatings'], searchQuery))
  );

export const indexing = payload => ({
  type: INDEXING,
  payload,
});
export const searchIndexAction = payload => ({
  type: INDEX_SEARCH,
  payload,
});

function newIndex(ref, fields = [], data = []) {
  return lunr(function() {
    this.ref(ref);

    const buildField = field => this.field(field);
    const addDoc = doc => this.add(doc);

    map(buildField, fields);
    map(addDoc, data);
  });
}

export const index = payload => dispatch => {
  const { index, ref, fields, data } = payload;

  dispatch(indexing(payload));

  const built = newIndex(ref, fields, data);

  dispatch(successAction(INDEXING, { [index]: built }));
};

export const searchIndex = indexKey => (dispatch, getState) => {
  dispatch(searchIndexAction(indexKey));

  const state = getState();
  const query = getSearchQuery(state);
  const index = getIndex(state, indexKey);

  if (!indexKey || !index || !prop('fields', index)) return dispatch(successAction(INDEX_SEARCH, []));
  const queries = buildIndexQueryArr(query, { regions: getHotelRegions(state) });

  const addFilters = curry((type, results) =>
    cond([
      // Hotel index filters
      [
        equals(IndexTypes.HOTEL),
        pipe(
          filterByRange(getHotel(state), pathOr([], ['filters', 'prices'], query), 'listPrice'),
          filterByArrayValues(getHotel(state), pathOr([], ['filters', 'features'], query), 'amenities'),
          filterByArrayValues(getHotel(state), { [path(['filters', 'mealPlan'], query)]: true }, 'mealPlans')
        )(results),
      ],
      [T, always(results)],
    ])(type)
  );

  const getResults = pipe(
    searchByQueries,
    addFilters(indexKey)
  );

  const results = getResults(index, queries);

  dispatch(successAction(INDEX_SEARCH, { [indexKey]: results }));
};
