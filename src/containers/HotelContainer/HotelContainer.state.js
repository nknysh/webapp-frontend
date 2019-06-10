import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { getHotel, getHotelsBrochures, getHotelsPhotos } from 'store/modules/hotels/selectors';

import { fetchHotel } from 'store/modules/hotel/actions';
import { getHotelStatus } from 'store/modules/hotel/selectors';

import { updateBooking, removeRoom, addRoom } from 'store/modules/bookings/actions';
import { getBooking, getBookingReady } from 'store/modules/bookings/selectors';

export const mapStateToProps = (state, { id }) => {
  const hotel = getHotel(state, id);
  return {
    brochures: getHotelsBrochures(state, id),
    canBook: getBookingReady(state, id),
    photos: getHotelsPhotos(state, id),
    booking: getBooking(state, id),
    hotel,
    hotelStatus: getHotelStatus(state),
  };
};

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
