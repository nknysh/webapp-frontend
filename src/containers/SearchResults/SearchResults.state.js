import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { fetchHotels } from 'store/modules/hotels/actions';
import { fetchHotelsSearchResults } from 'store/modules/search/actions';

import { getCountriesData, getCountryName } from 'store/modules/countries/selectors';
import { getHotelsData, getHotel, getHotelRegions } from 'store/modules/hotels/selectors';
import { getSearchQuery, getSearchResults } from 'store/modules/search/selectors';

export const mapStateToProps = state => ({
  hotels: getHotelsData(state),
  countries: getCountriesData(state),
  getCountryName: getCountryName(state),
  getHotel: getHotel(state),
  regions: getHotelRegions(state),
  searchQuery: getSearchQuery(state),
  results: getSearchResults(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchHotels: pipe(
    fetchHotels,
    dispatch
  ),
  fetchResults: pipe(
    fetchHotelsSearchResults,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
