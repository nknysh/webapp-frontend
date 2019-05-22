import { pipe } from 'ramda';
import { connect } from 'react-redux';

import { updateBooking, checkBooking, removeRoom, updateBookingExtras } from 'store/modules/booking/actions';
import {
  getBookingByHotelId,
  getBookingTotal,
  getBookingReady,
  getBookingStatus,
} from 'store/modules/booking/selectors';

import { fetchHotelRoomRatesByDates } from 'store/modules/hotels/actions';
import { getHotel } from 'store/modules/hotels/selectors';

export const mapStateToProps = (state, { hotelUuid }) => ({
  booking: getBookingByHotelId(state, hotelUuid),
  canBook: getBookingReady(state, hotelUuid),
  hotel: getHotel(state, hotelUuid),
  status: getBookingStatus(state),
  total: getBookingTotal(state, hotelUuid),
});

export const mapDispatchToProps = dispatch => ({
  updateBooking: pipe(
    updateBooking,
    dispatch
  ),
  updateBookingExtras: pipe(
    updateBookingExtras,
    dispatch
  ),
  checkBooking: pipe(
    checkBooking,
    dispatch
  ),
  removeRoom: pipe(
    removeRoom,
    dispatch
  ),
  getRatesForDates: pipe(
    fetchHotelRoomRatesByDates,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
