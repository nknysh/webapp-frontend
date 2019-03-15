import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { fetchHotels } from 'store/modules/hotels/actions';
import { setSearchQuery, resetFilters } from 'store/modules/search/actions';

import { getCountriesData, getCountryName } from 'store/modules/countries/selectors';
import {
  getHotelsData,
  getHotelRegions,
  getHotelName,
  getHotelStarRatings,
  getHotelAmenities,
} from 'store/modules/hotels/selectors';
import { getSearchQuery } from 'store/modules/search/selectors';

export const mapStateToProps = state => ({
  hotels: getHotelsData(state),
  countries: getCountriesData(state),
  getCountryName: getCountryName(state),
  getHotelName: getHotelName(state),
  regions: getHotelRegions(state),
  starRatings: getHotelStarRatings(state),
  amenities: getHotelAmenities(state),
  searchQuery: getSearchQuery(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchHotels: pipe(
    fetchHotels,
    dispatch
  ),
  setSearchQuery: pipe(
    setSearchQuery,
    dispatch
  ),
  resetFilters: pipe(
    resetFilters,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
