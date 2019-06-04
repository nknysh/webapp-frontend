import { useState } from 'react';
import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { PAYMENT_ENABLED } from 'config';
import { extractFieldDefaults } from 'utils';

import { getHotel } from 'store/modules/hotels/selectors';
import { getHotelStatus } from 'store/modules/hotel/selectors';
import {
  getBookingTotal,
  getBookingByHotelId,
  getBookingReady,
  getBookingStatus,
  isBookingOnRequest,
} from 'store/modules/booking/selectors';
import { getSearchDates } from 'store/modules/search/selectors';

import { fetchHotel } from 'store/modules/hotel/actions';
import { updateBooking, completeBooking, removeBooking } from 'store/modules/booking/actions';

import { fields as guestFields } from 'config/forms/bookingForm';
import { PaymentType, ViewType } from './HotelBookingContainer.types';

export const useHotelBookingContainerState = () => {
  const [complete, setComplete] = useState(false);
  const [view, setView] = useState(ViewType.DETAILS);
  const [paymentType, setPaymentType] = useState(PAYMENT_ENABLED ? PaymentType.CC : PaymentType.OR);
  const [modalOpen, setModalOpen] = useState(false);
  const [guestFormValues, setGuestFormValues] = useState(extractFieldDefaults(guestFields));

  return [
    [complete, setComplete],
    [view, setView],
    [paymentType, setPaymentType],
    [modalOpen, setModalOpen],
    [guestFormValues, setGuestFormValues],
  ];
};

export const mapStateToProps = (state, { id }) => ({
  hotel: getHotel(state, id),
  hotelStatus: getHotelStatus(state),
  booking: getBookingByHotelId(state, id),
  bookingStatus: getBookingStatus(state),
  isOnRequest: isBookingOnRequest(state, id),
  dates: getSearchDates(state),
  canBook: getBookingReady(state, id),
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
