import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { searchByQuery } from 'store/modules/search/actions';
import {
  getSearchStatus,
  getSearchQuery,
  getSearchResultsMeta,
  getSearchResultsResult,
  getCanSearch,
} from 'store/modules/search/selectors';
import { getHotelsFromSearchResults } from 'store/modules/hotels/selectors';

export const mapStateToProps = state => ({
  searchQuery: getSearchQuery(state),
  searchStatus: getSearchStatus(state),
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
