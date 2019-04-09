import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { getHotel } from 'store/modules/hotels/selectors';
import { getHotelStatus } from 'store/modules/hotel/selectors';
import { getBookingByHotelId } from 'store/modules/booking/selectors';
import { getSearchDates } from 'store/modules/search/selectors';

import { fetchHotel } from 'store/modules/hotel/actions';
import { updateBooking } from 'store/modules/booking/actions';

export const mapStateToProps = (state, { id }) => ({
  hotel: getHotel(state, id),
  hotelStatus: getHotelStatus(state),
  getBooking: getBookingByHotelId(state),
  dates: getSearchDates(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchHotel: pipe(
    fetchHotel,
    dispatch
  ),
  updateBooking: pipe(
    updateBooking,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
