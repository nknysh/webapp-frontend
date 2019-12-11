import { pipe } from 'ramda';
import { connect } from 'react-redux';

import { fetchHotelRoomRatesByDates, getHotelName } from 'store/modules/hotels';
import {
  getBookingAppliedOffers,
  getBookingAppliedOffersCount,
  getBookingCurrencySymbol,
  getBookingHolds,
  getBookingStatus,
  getBookingTotal,
  getBookingTotalBeforeDiscount,
  getBookingTotals,
  isBookingOnRequest,
  replaceProducts,
  updateBooking,
  getAccommodationEditModalErrors,
} from 'store/modules/bookings';

import { getUserCountryContext } from 'store/modules/auth';

import {
  bookingBuilderSelector,
  bookingCanBookSelector,
  bookingSelector,
  bookingResponseAllErrors,
} from 'store/modules/bookingBuilder';

export const mapStateToProps = (state, { id }) => ({
  booking: bookingBuilderSelector(state),
  bookingDomain: bookingSelector(state),
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
  actingCountryCode: getUserCountryContext(state),
});

export const mapDispatchToProps = dispatch => ({
  updateBooking: pipe(updateBooking, dispatch),
  getRatesForDates: pipe(fetchHotelRoomRatesByDates, dispatch),
  replaceProducts: pipe(replaceProducts, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
