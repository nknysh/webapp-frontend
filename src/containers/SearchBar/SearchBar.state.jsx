import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { setSearchQuery, resetSearchQuery, searchByName } from 'store/modules/search';
import {
  getBaseSearchQuery,
  getSearchStatus,
  isSearchQueryValidSelector,
  getMappedSearchResults,
} from 'store/modules/search';

import { isSR } from 'store/modules/auth';
import {
  taNamesSelector,
  isFetchingTaSelector,
} from 'store/modules/fastSearch';

export const mapStateToProps = state => ({
  canSearch: isSearchQueryValidSelector(state),
  nameSearchResults: getMappedSearchResults(state, 'byName'),
  nameSearchStatus: getSearchStatus(state, 'byName'),
  searchQuery: getBaseSearchQuery(state),
  isSr: isSR(state),
  taNames: taNamesSelector(state),
  isFetchingTA: isFetchingTaSelector(state),
});

export const mapDispatchToProps = dispatch => ({
  setSearchQuery: pipe(setSearchQuery, dispatch),
  resetSearchQuery: pipe(resetSearchQuery, dispatch),
  searchByName: pipe(searchByName, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
