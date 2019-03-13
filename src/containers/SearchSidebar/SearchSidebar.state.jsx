import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { fetchDestinations } from 'store/modules/destinations/actions';
import { fetchHotels } from 'store/modules/hotels/actions';
import { setSearchQuery, resetFilters } from 'store/modules/search/actions';

import { getDestinationsData, getDestinationTitle } from 'store/modules/destinations/selectors';
import { getHotelsData, getHotelRegions, getHotelName } from 'store/modules/hotels/selectors';
import { getSearchQuery } from 'store/modules/search/selectors';

export const mapStateToProps = state => ({
  hotels: getHotelsData(state),
  destinations: getDestinationsData(state),
  getDestinationTitle: getDestinationTitle(state),
  getHotelName: getHotelName(state),
  regions: getHotelRegions(state),
  searchQuery: getSearchQuery(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchDestinations: pipe(
    fetchDestinations,
    dispatch
  ),
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
