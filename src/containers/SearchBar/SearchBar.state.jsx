import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { setSearchQuery, searchByName } from 'store/modules/search';

import { getCountryName } from 'store/modules/countries';
import { getHotelName } from 'store/modules/hotels';
import { getSearchQuery, getSearchStatus, getCanSearch } from 'store/modules/search';

export const mapStateToProps = state => ({
  searchStatus: getSearchStatus(state),
  getCountryName: code => getCountryName(state, code),
  getHotelName: name => getHotelName(state, name),
  searchQuery: getSearchQuery(state),
  canSearch: getCanSearch(state),
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
