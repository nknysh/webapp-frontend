import { connect } from 'react-redux';
import { pipe } from 'ramda';

import {
  setSearchQuery,
  searchFiltersReset,
  searchByName,
  getSearchQuery,
  getSearchStatus,
  getSearchFiltersRegions,
  getSearchFiltersStarRatings,
  getSearchFiltersFeatures,
  getSearchFiltersPrices,
} from 'store/modules/search';
import { getCountriesData, getCountryName } from 'store/modules/countries';
import { getHotelName, getHotelsData, getHotelsStatus } from 'store/modules/hotels';

export const mapStateToProps = state => ({
  countries: getCountriesData(state),
  features: getSearchFiltersFeatures(state, 'byQuery'),
  getCountryName: code => getCountryName(state, code),
  getHotelName: name => getHotelName(state, name),
  hotels: getHotelsData(state),
  hotelsStatus: getHotelsStatus(state),
  regions: getSearchFiltersRegions(state, 'byQuery'),
  searchQuery: getSearchQuery(state),
  searchStatus: getSearchStatus(state),
  starRatings: getSearchFiltersStarRatings(state, 'byQuery'),
  prices: getSearchFiltersPrices(state, 'byQuery'),
});

export const mapDispatchToProps = dispatch => ({
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
