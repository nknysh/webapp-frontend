import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { setSearchQuery } from 'store/modules/search/actions';
import { searchByName } from 'store/modules/search/actions';

import { getCountryName } from 'store/modules/countries/selectors';
import { getHotelName } from 'store/modules/hotels/selectors';
import { getSearchQuery, getSearchStatus } from 'store/modules/search/selectors';

export const mapStateToProps = state => ({
  searchStatus: getSearchStatus(state),
  getCountryName: getCountryName(state),
  getHotelName: name => getHotelName(state, name),
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
