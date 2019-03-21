import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { setSearchQuery } from 'store/modules/search/actions';

import { fetchSearch } from 'store/modules/search/actions';
import { getCountriesData, getCountryName } from 'store/modules/countries/selectors';
import { getHotelsData, getHotelName } from 'store/modules/hotels/selectors';
import { getSearchQuery } from 'store/modules/search/selectors';
import { getSearchStatus } from 'store/modules/search/selectors';

export const mapStateToProps = state => ({
  hotels: getHotelsData(state),
  searchStatus: getSearchStatus(state),
  countries: getCountriesData(state),
  getCountryName: getCountryName(state),
  getHotelName: getHotelName(state),
  searchQuery: getSearchQuery(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchSearch: pipe(
    fetchSearch,
    dispatch
  ),
  setSearchQuery: pipe(
    setSearchQuery,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
