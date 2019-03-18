import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { fetchHotels } from 'store/modules/hotels/actions';

import { getCountriesData } from 'store/modules/countries/selectors';
import { getHotelsData, getHotelsStatus } from 'store/modules/hotels/selectors';
import { getSearchQuery } from 'store/modules/search/selectors';

export const mapStateToProps = state => ({
  hotels: getHotelsData(state),
  countries: getCountriesData(state),
  searchQuery: getSearchQuery(state),
  hotelsStatus: getHotelsStatus(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchHotels: pipe(
    fetchHotels,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
