import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { fetchHotels } from 'store/modules/hotels/actions';
import { fetchSearchResults } from 'store/modules/search/actions';

import { getCountriesData, getCountryName } from 'store/modules/countries/selectors';
import { getHotelsStatus, getHotelsData, getHotel, getHotelRegions } from 'store/modules/hotels/selectors';
import { getSearchStatus, getSearchQuery, getSearchResults } from 'store/modules/search/selectors';

export const mapStateToProps = state => ({
  hotels: getHotelsData(state),
  countries: getCountriesData(state),
  getCountryName: getCountryName(state),
  getHotel: getHotel(state),
  regions: getHotelRegions(state),
  searchQuery: getSearchQuery(state),
  results: getSearchResults(state),
  hotelsStatus: getHotelsStatus(state),
  resultsStatus: getSearchStatus(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchHotels: pipe(
    fetchHotels,
    dispatch
  ),
  fetchResults: pipe(
    fetchSearchResults,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
