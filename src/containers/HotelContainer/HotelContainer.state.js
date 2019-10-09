import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { getHotel, getHotelsBrochures, getHotelsPhotos } from 'store/modules/hotels';
import { fetchHotel } from 'store/modules/hotel';
import {
  addRoom,
  getBooking,
  getBookingCanHold,
  getBookingPoliciesAndTerms,
  getBookingReady,
  removeRoom,
  updateBooking,
} from 'store/modules/bookings';

export const mapStateToProps = (state, { id }) => ({
  booking: getBooking(state, id),
  brochures: getHotelsBrochures(state, id),
  canBook: getBookingReady(state, id),
  canHold: getBookingCanHold(state, id),
  hotel: getHotel(state, id),
  photos: getHotelsPhotos(state, id),
  policiesAndTerms: getBookingPoliciesAndTerms(state, id),
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
