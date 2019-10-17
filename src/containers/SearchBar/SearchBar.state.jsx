import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { setSearchQuery, resetSearchQuery, searchByName } from 'store/modules/search';
import { getBaseSearchQuery, getSearchStatus, getCanSearch, getMappedSearchResults } from 'store/modules/search';

export const mapStateToProps = state => ({
  canSearch: getCanSearch(state),
  nameSearchResults: getMappedSearchResults(state, 'byName'),
  nameSearchStatus: getSearchStatus(state, 'byName'),
  searchQuery: getBaseSearchQuery(state),
});

export const mapDispatchToProps = dispatch => ({
  setSearchQuery: pipe(
    setSearchQuery,
    dispatch
  ),
  resetSearchQuery: pipe(
    resetSearchQuery,
    dispatch
  ),
  searchByName: pipe(
    searchByName,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
