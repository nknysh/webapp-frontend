import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { getHotel, getHotelsBrochures, getHotelsPhotos } from 'store/modules/hotels/selectors';

import { fetchHotel } from 'store/modules/hotel/actions';
import { getHotelStatus } from 'store/modules/hotel/selectors';

import { updateBooking, removeRoom, addRoom } from 'store/modules/bookings/actions';
import { getBooking, getBookingReady, getBookingCanHold } from 'store/modules/bookings/selectors';
import { isSR } from 'store/modules/auth/selectors';

export const mapStateToProps = (state, { id }) => ({
  isSr: isSR(state),
  booking: getBooking(state, id),
  brochures: getHotelsBrochures(state, id),
  canBook: getBookingReady(state, id),
  canHold: getBookingCanHold(state, id),
  hotel: getHotel(state, id),
  hotelStatus: getHotelStatus(state),
  photos: getHotelsPhotos(state, id),
});

export const mapDispatchToProps = dispatch => ({
  fetchHotel: pipe(
    fetchHotel,
    dispatch
  ),
  addRoom: pipe(
    addRoom,
    dispatch
  ),
  removeRoom: pipe(
    removeRoom,
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
