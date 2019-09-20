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
  getSearchOccassions,
  getMappedSearchResults,
} from 'store/modules/search';
import { getCountriesData } from 'store/modules/countries';
import { getHotelsData, getHotelsStatus } from 'store/modules/hotels';

export const mapStateToProps = state => ({
  countries: getCountriesData(state),
  features: getSearchFiltersFeatures(state, 'byQuery'),
  hotels: getHotelsData(state),
  hotelsStatus: getHotelsStatus(state),
  nameSearchResults: getMappedSearchResults(state, 'byName'),
  occasions: getSearchOccassions(state, 'byQuery'),
  prices: getSearchFiltersPrices(state, 'byQuery'),
  regions: getSearchFiltersRegions(state, 'byQuery'),
  searchQuery: getSearchQuery(state),
  searchStatus: getSearchStatus(state, 'byName'),
  starRatings: getSearchFiltersStarRatings(state, 'byQuery'),
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
