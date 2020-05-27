import { IBooking } from 'services/BackendApi';

export const GET_BOOKING_REQUEST = 'bookingManager/GET_BOOKING_REQUEST';
export const GET_BOOKING_SUCCESS = 'bookingManager/GET_BOOKING_SUCCESS';
export const GET_BOOKING_FAILURE = 'bookingManager/GET_BOOKING_FAILURE';

export type GetBookingRequestAction = ReturnType<typeof getBookingRequestAction>;
export const getBookingRequestAction = (uuid: string) => ({
  type: GET_BOOKING_REQUEST as typeof GET_BOOKING_REQUEST,
  uuid,
});

export type GetBookingSuccessAction = ReturnType<typeof getBookingSuccessAction>;
export const getBookingSuccessAction = (booking: IBooking) => ({
  type: GET_BOOKING_SUCCESS as typeof GET_BOOKING_SUCCESS,
  booking,
});

export type GetBookingFailureAction = ReturnType<typeof getBookingFailureAction>;
export const getBookingFailureAction = (error: string) => ({
  type: GET_BOOKING_FAILURE as typeof GET_BOOKING_FAILURE,
  error,
});

export type BookingManagerAction = GetBookingRequestAction | GetBookingSuccessAction | GetBookingFailureAction;
