import { useState } from 'react';
import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { PAYMENT_ENABLED } from 'config';
import { extractFieldDefaults } from 'utils';

import { getSearchDates } from 'store/modules/search';
import { getHotel } from 'store/modules/hotels';
import { fetchHotel, getHotelStatus } from 'store/modules/hotel';
import {
  completeAndHold,
  completeBooking,
  getBookingCreated,
  getBookingCurrencySymbol,
  getBookingStatus,
  getBookingTotal,
  isBookingOnRequest,
  removeBooking,
  updateBooking,
} from 'store/modules/bookings';

import { fields as guestFields } from 'config/forms/bookingForm';

import { PaymentType, ViewType } from './HotelBookingContainer.types';

import { bookingSelector, bookingCanBookSelector, bookingCanHoldSelector } from 'store/modules/bookingBuilder';

export const useHotelBookingContainerState = () => {
  const [complete, setComplete] = useState(false);
  const [view, setView] = useState(ViewType.DETAILS);
  const [paymentType, setPaymentType] = useState(PAYMENT_ENABLED ? PaymentType.CC : PaymentType.OR);
  const [guestFormValues, setGuestFormValues] = useState(extractFieldDefaults(guestFields));

  return [
    [complete, setComplete],
    [view, setView],
    [paymentType, setPaymentType],
    [guestFormValues, setGuestFormValues],
  ];
};

export const mapStateToProps = (state, { id }) => ({
  booking: bookingSelector(state),
  bookingStatus: getBookingStatus(state),
  canBook: bookingCanBookSelector(state),
  canHold: bookingCanHoldSelector(state),
  created: getBookingCreated(state, id),
  currencyCode: getBookingCurrencySymbol(state, id),
  dates: getSearchDates(state),
  hotel: getHotel(state, id),
  hotelStatus: getHotelStatus(state),
  isOnRequest: isBookingOnRequest(state, id),
  total: getBookingTotal(state, id),
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
  completeBooking: pipe(
    completeBooking,
    dispatch
  ),
  removeBooking: pipe(
    removeBooking,
    dispatch
  ),
  completeAndHold: pipe(
    completeAndHold,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
