import { useState } from 'react';
import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { extractFieldDefaults } from 'utils';

import { getHotel } from 'store/modules/hotels/selectors';
import { getHotelStatus } from 'store/modules/hotel/selectors';
import {
  getBookingTotal,
  getBookingByHotelId,
  getBookingReady,
  getBookingStatus,
} from 'store/modules/booking/selectors';
import { getSearchDates } from 'store/modules/search/selectors';

import { fetchHotel } from 'store/modules/hotel/actions';
import { updateBooking, completeBooking, removeBooking } from 'store/modules/booking/actions';

import { fields as guestFields } from 'config/forms/bookingForm';
import { fields as bankTransferFields } from 'config/forms/bankTransfer';
import { PaymentType, ViewType } from './HotelBookingContainer.types';

export const useHotelBookingContainerState = () => {
  const [complete, setComplete] = useState(false);
  const [view, setView] = useState(ViewType.DETAILS);
  const [paymentType, setPaymentType] = useState(PaymentType.CC);
  const [modalOpen, setModalOpen] = useState(false);
  const [guestFormValues, setGuestFormValues] = useState(extractFieldDefaults(guestFields));
  const [bankTransferFormValues, setBankTransferFormValues] = useState(extractFieldDefaults(bankTransferFields));

  return [
    [complete, setComplete],
    [view, setView],
    [paymentType, setPaymentType],
    [modalOpen, setModalOpen],
    [guestFormValues, setGuestFormValues],
    [bankTransferFormValues, setBankTransferFormValues],
  ];
};

export const mapStateToProps = (state, { id }) => ({
  hotel: getHotel(state, id),
  hotelStatus: getHotelStatus(state),
  booking: getBookingByHotelId(state, id),
  bookingStatus: getBookingStatus(state),
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
