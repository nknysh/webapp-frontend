import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { fetchSearch } from 'store/modules/search/actions';
import { getSearchStatus, getSearchQuery } from 'store/modules/search/selectors';

import { getCountryName } from 'store/modules/countries/selectors';
import { getHotel, getHotelFeaturedPhoto } from 'store/modules/hotels/selectors';
import { getIndexResults } from 'store/modules/indexes/selectors';

export const mapStateToProps = state => ({
  getCountryName: getCountryName(state),
  getHotel: getHotel(state),
  getResults: getIndexResults(state),
  searchQuery: getSearchQuery(state),
  searchStatus: getSearchStatus(state),
  getHotelFeaturedPhoto: getHotelFeaturedPhoto(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchSearch: pipe(
    fetchSearch,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
