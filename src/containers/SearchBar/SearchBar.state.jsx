import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { setSearchQuery, searchByName } from 'store/modules/search';
import { getSearchQuery, getSearchStatus, getCanSearch, getMappedSearchResults } from 'store/modules/search';

export const mapStateToProps = state => ({
  canSearch: getCanSearch(state),
  nameSearchResults: getMappedSearchResults(state, 'byName'),
  nameSearchStatus: getSearchStatus(state, 'byName'),
  searchQuery: getSearchQuery(state),
});

export const mapDispatchToProps = dispatch => ({
  setSearchQuery: pipe(
    setSearchQuery,
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
