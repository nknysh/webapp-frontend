import { pipe } from 'ramda';
import { connect } from 'react-redux';

import { fetchHotelRoomRatesByDates, getHotelName, getHotelCurrencySymbol } from 'store/modules/hotels';
import {
  updateBooking,
  removeRoom,
  replaceProducts,
  fetchBooking,
  getBooking,
  getBookingTotals,
  getBookingTotal,
  getBookingReady,
  getBookingStatus,
  getBookingNonAccommodationErrors,
  isBookingOnRequest,
  getBookingHolds,
  getBookingAppliedOffers,
  getBookingAppliedOffersCount,
  getBookingTotalBeforeDiscount,
} from 'store/modules/bookings';

export const mapStateToProps = (state, { id }) => ({
  booking: getBooking(state, id),
  canBook: getBookingReady(state, id),
  currencyCode: getHotelCurrencySymbol(state, id),
  errors: getBookingNonAccommodationErrors(state, id),
  holds: getBookingHolds(state, id),
  hotelName: getHotelName(state, id),
  isOnRequest: isBookingOnRequest(state, id),
  offers: getBookingAppliedOffers(state, id),
  offersCount: getBookingAppliedOffersCount(state, id),
  preDiscountTotal: getBookingTotalBeforeDiscount(state, id),
  status: getBookingStatus(state),
  total: getBookingTotal(state, id),
  totals: getBookingTotals(state, id),
});

export const mapDispatchToProps = dispatch => ({
  fetchBooking: pipe(
    fetchBooking,
    dispatch
  ),
  updateBooking: pipe(
    updateBooking,
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
  replaceProducts: pipe(
    replaceProducts,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
