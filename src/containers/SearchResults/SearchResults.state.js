import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { getHotelsFromSearchResults } from 'store/modules/hotels';
import {
  searchByQuery,
  getSearchStatus,
  getSearchQuery,
  getSearchResultsMeta,
  getSearchResultsResult,
  getCanSearch,
} from 'store/modules/search';

export const mapStateToProps = state => ({
  searchQuery: getSearchQuery(state),
  searchStatus: getSearchStatus(state, 'byQuery'),
  result: getHotelsFromSearchResults(state, getSearchResultsResult(state, 'byQuery')),
  meta: getSearchResultsMeta(state, 'byQuery'),
  canSearch: getCanSearch(state),
});

export const mapDispatchToProps = dispatch => ({
  searchByQuery: pipe(
    searchByQuery,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
