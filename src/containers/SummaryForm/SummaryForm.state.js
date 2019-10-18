import { pipe } from 'ramda';
import { connect } from 'react-redux';

import { fetchHotelRoomRatesByDates, getHotelName } from 'store/modules/hotels';
import {
  fetchBooking,
  getBooking,
  getBookingAppliedOffers,
  getBookingAppliedOffersCount,
  getBookingCurrencySymbol,
  getBookingHolds,
  getBookingNonAccommodationErrors,
  getBookingReady,
  getBookingStatus,
  getBookingTotal,
  getBookingTotalBeforeDiscount,
  getBookingTotals,
  isBookingOnRequest,
  removeRoom,
  replaceProducts,
  updateBooking,
  getAccommodationEditErrors,
} from 'store/modules/bookings';

export const mapStateToProps = (state, { id }) => ({
  booking: getBooking(state, id),
  canBook: getBookingReady(state, id),
  currencyCode: getBookingCurrencySymbol(state, id),
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
  accommodationEditErrors: getAccommodationEditErrors(state, id),
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
