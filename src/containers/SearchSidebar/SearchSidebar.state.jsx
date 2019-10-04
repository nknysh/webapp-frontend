import { connect } from 'react-redux';
import { pipe } from 'ramda';

import {
  setSearchQuery,
  searchFiltersReset,
  searchByName,
  searchByQuery,
  getSearchQuery,
  getSearchStatus,
  getSearchFiltersRegions,
  getSearchFiltersStarRatings,
  getSearchFiltersFeatures,
  getSearchFiltersPrices,
  getSearchOccassions,
  getMappedSearchResults,
  getCanSearch,
} from 'store/modules/search';
import { getCountriesData } from 'store/modules/countries';
import { getHotelsData, getHotelsStatus } from 'store/modules/hotels';
import { getCurrentCountry } from 'store/modules/auth';

export const mapStateToProps = state => ({
  countries: getCountriesData(state),
  currentCountry: getCurrentCountry(state),
  features: getSearchFiltersFeatures(state, 'byQuery'),
  hotels: getHotelsData(state),
  hotelsStatus: getHotelsStatus(state),
  nameSearchResults: getMappedSearchResults(state, 'byName'),
  occasions: getSearchOccassions(state, 'byQuery'),
  prices: getSearchFiltersPrices(state, 'byQuery'),
  regions: getSearchFiltersRegions(state, 'byQuery'),
  searchQuery: getSearchQuery(state),
  nameSearchStatus: getSearchStatus(state, 'byName'),
  querySearchStatus: getSearchStatus(state, 'byQuery'),
  starRatings: getSearchFiltersStarRatings(state, 'byQuery'),
  canSearch: getCanSearch(state),
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
  searchByQuery: pipe(
    searchByQuery,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
