import { connect } from 'react-redux';
import { pipe } from 'ramda';

import {
  setSearchQuery,
  searchFiltersReset,
  searchByName,
  searchByQuery,
  getSearchQuery,
  getSearchStatus,
  getSearchFiltersPrices,
  getSearchOccassions,
  getMappedSearchResults,
  getCanSearch,
} from 'store/modules/search';
import { getCountriesData } from 'store/modules/countries';
import { getHotelsData, getHotelsStatus } from 'store/modules/hotels';
import { getCurrentCountry } from 'store/modules/auth';
import {
  searchRegionsSelector,
  searchStarRatingsSelector,
  searchFiltersSelector,
} from '../../store/modules/search/selectors';

export const mapStateToProps = state => ({
  countries: getCountriesData(state),
  currentCountry: getCurrentCountry(state),
  hotels: getHotelsData(state),
  hotelsStatus: getHotelsStatus(state),
  nameSearchResults: getMappedSearchResults(state, 'byName'),
  occasions: getSearchOccassions(state, 'byQuery'),
  prices: getSearchFiltersPrices(state, 'byQuery'),
  searchQuery: getSearchQuery(state),
  nameSearchStatus: getSearchStatus(state, 'byName'),
  querySearchStatus: getSearchStatus(state, 'byQuery'),
  canSearch: getCanSearch(state),
  // Properly memoized selectors
  features: searchFiltersSelector(state),
  regions: searchRegionsSelector(state),
  starRatings: searchStarRatingsSelector(state),
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
