import { pipe } from 'ramda';
import { connect } from 'react-redux';

import { bookingBuilderSelector } from 'store/modules/bookingBuilder';
import { fetchHotelRoomRatesByDates, getHotelName } from 'store/modules/hotels';
import {
  fetchBooking,
  getBookingAppliedOffers,
  getBookingAppliedOffersCount,
  getBookingCurrencySymbol,
  getBookingHolds,
  getBookingStatus,
  getBookingTotal,
  getBookingTotalBeforeDiscount,
  getBookingTotals,
  isBookingOnRequest,
  removeRoom,
  replaceProducts,
  updateBooking,
  getAccommodationEditModalErrors,
} from 'store/modules/bookings';

import { bookingCanBookSelector, bookingResponseAllErrors } from 'store/modules/bookingBuilder';

export const mapStateToProps = (state, { id }) => ({
  booking: bookingBuilderSelector(state),
  canBook: bookingCanBookSelector(state),
  currencyCode: getBookingCurrencySymbol(state, id),
  errors: bookingResponseAllErrors(state),
  holds: getBookingHolds(state, id),
  hotelName: getHotelName(state, id),
  isOnRequest: isBookingOnRequest(state, id),
  offers: getBookingAppliedOffers(state, id),
  offersCount: getBookingAppliedOffersCount(state, id),
  preDiscountTotal: getBookingTotalBeforeDiscount(state, id),
  status: getBookingStatus(state),
  total: getBookingTotal(state, id),
  totals: getBookingTotals(state, id),
  accommodationEditModalErrors: getAccommodationEditModalErrors(state, id),
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
