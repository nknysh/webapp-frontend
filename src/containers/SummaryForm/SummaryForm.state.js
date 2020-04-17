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
  getBookingTravelAgent
} from 'store/modules/bookings';

import { getUserCountryContext, isSR as isSrSelector } from 'store/modules/auth';

import {
  bookingBuilderSelector,
  bookingCanBookSelector,
  bookingSelector,
  bookingResponseAllErrors,
  guestInfoSelector,
  agreeToTermsSelector,
  updateAgreeToTermsAction,
  domainValidationSelector,
  isPristineSelector,
  setIsPristineAction
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
  travelAgentUserUuid: getBookingTravelAgent(state, id),
  isSr: isSrSelector(state),
  guestInfo: guestInfoSelector(state),
  agreeToTerms: agreeToTermsSelector(state),
  domainValidation: domainValidationSelector(state),
  isPristine: isPristineSelector(state)
});

export const mapDispatchToProps = dispatch => ({
  updateBooking: pipe(updateBooking, dispatch),
  getRatesForDates: pipe(fetchHotelRoomRatesByDates, dispatch),
  replaceProducts: pipe(replaceProducts, dispatch),
  updateAgreeToTermsAction: pipe(updateAgreeToTermsAction, dispatch),
  setIsPristineAction: pipe(setIsPristineAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps);
