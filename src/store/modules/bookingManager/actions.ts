import { IBooking } from 'services/BackendApi';

export const GET_BOOKING_REQUEST = 'bookingManager/GET_BOOKING_REQUEST';
export const GET_BOOKING_SUCCESS = 'bookingManager/GET_BOOKING_SUCCESS';
export const GET_BOOKING_FAILURE = 'bookingManager/GET_BOOKING_FAILURE';

export const REQUEST_TO_BOOK_REQUEST = 'bookingManager/REQUEST_TO_BOOK_REQUEST';
export const REQUEST_TO_BOOK_SUCCESS = 'bookingManager/REQUEST_TO_BOOK_SUCCESS';
export const REQUEST_TO_BOOK_FAILURE = 'bookingManager/REQUEST_TO_BOOK_FAILURE';

export const CANCEL_REQUEST = 'bookingManager/CANCEL_REQUEST';
export const CANCEL_SUCCESS = 'bookingManager/CANCEL_SUCCESS';
export const CANCEL_FAILURE = 'bookingManager/CANCEL_FAILURE';

export const CONFIRM_REQUEST = 'bookingManager/CONFIRM_REQUEST';
export const CONFIRM_SUCCESS = 'bookingManager/CONFIRM_SUCCESS';
export const CONFIRM_FAILURE = 'bookingManager/CONFIRM_FAILURE';

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

// Request to Book actions
export type RequestToBookRequestAction = ReturnType<typeof requestToBookRequestAction>;
export const requestToBookRequestAction = (booking: IBooking) => ({
  type: REQUEST_TO_BOOK_REQUEST as typeof REQUEST_TO_BOOK_REQUEST,
  booking,
});
export type RequestToBookSuccessAction = ReturnType<typeof requestToBookSuccessAction>;
export const requestToBookSuccessAction = (booking: IBooking) => ({
  type: REQUEST_TO_BOOK_SUCCESS as typeof REQUEST_TO_BOOK_SUCCESS,
  booking,
});
export type RequestToBookFailureAction = ReturnType<typeof requestToBookFailureAction>;
export const requestToBookFailureAction = error => ({
  type: REQUEST_TO_BOOK_FAILURE as typeof REQUEST_TO_BOOK_FAILURE,
  error,
});

// Cancel actions
export type CancelRequestAction = ReturnType<typeof cancelRequestAction>;
export const cancelRequestAction = (booking: IBooking) => ({
  type: CANCEL_REQUEST as typeof CANCEL_REQUEST,
  booking,
});
export type CancelSuccessAction = ReturnType<typeof cancelSuccessAction>;
export const cancelSuccessAction = (booking: IBooking) => ({
  type: CANCEL_SUCCESS as typeof CANCEL_SUCCESS,
  booking,
});
export type CancelFailureAction = ReturnType<typeof cancelFailureAction>;
export const cancelFailureAction = error => ({
  type: CANCEL_FAILURE as typeof CANCEL_FAILURE,
  error,
});

// confirm actions
export type ConfirmRequestAction = ReturnType<typeof confirmRequestAction>;
export const confirmRequestAction = (uuid: string) => ({
  type: CONFIRM_REQUEST as typeof CONFIRM_REQUEST,
  uuid,
});
export type ConfirmSuccessAction = ReturnType<typeof confirmSuccessAction>;
export const confirmSuccessAction = (booking: IBooking) => ({
  type: CONFIRM_SUCCESS as typeof CONFIRM_SUCCESS,
  booking,
});
export type ConfirmFailureAction = ReturnType<typeof confirmFailureAction>;
export const confirmFailureAction = error => ({
  type: CONFIRM_FAILURE as typeof CONFIRM_FAILURE,
  error,
});

export type BookingManagerAction =
  | GetBookingRequestAction
  | GetBookingSuccessAction
  | GetBookingFailureAction
  | RequestToBookRequestAction
  | RequestToBookSuccessAction
  | RequestToBookFailureAction
  | CancelRequestAction
  | CancelSuccessAction
  | CancelFailureAction
  | ConfirmRequestAction
  | ConfirmSuccessAction
  | ConfirmFailureAction;
