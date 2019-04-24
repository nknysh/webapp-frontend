import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { fetchHotels } from 'store/modules/hotels/actions';
import { setSearchQuery, searchFiltersReset, searchByName } from 'store/modules/search/actions';

import { getCountriesData, getCountryName } from 'store/modules/countries/selectors';
import {
  getHotelFeatures,
  getHotelName,
  getHotelRegions,
  getHotelsData,
  getHotelsStatus,
  getHotelStarRatings,
} from 'store/modules/hotels/selectors';
import { getSearchQuery, getSearchStatus } from 'store/modules/search/selectors';

export const mapStateToProps = state => ({
  countries: getCountriesData(state),
  features: getHotelFeatures(state),
  getCountryName: getCountryName(state),
  getHotelName: getHotelName(state),
  hotels: getHotelsData(state),
  hotelsStatus: getHotelsStatus(state),
  regions: getHotelRegions(state),
  searchQuery: getSearchQuery(state),
  searchStatus: getSearchStatus(state),
  starRatings: getHotelStarRatings(state),
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
  searchFiltersReset: pipe(
    searchFiltersReset,
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
