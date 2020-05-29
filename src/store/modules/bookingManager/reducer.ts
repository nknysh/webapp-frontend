import { initialState, IBookingManagerDomain } from './model';
import * as Actions from './actions';
import produce from 'immer';
import { ENetworkRequestStatus } from 'services/BackendApi';

const bookingManagerReducer = (state: IBookingManagerDomain = initialState, action: Actions.BookingManagerAction) => {
  switch (action.type) {
    case Actions.GET_BOOKING_REQUEST:
      return produce(state, draftState => {
        draftState.networkRequests.bookingLoad = ENetworkRequestStatus.PENDING;
        return draftState;
      });

    case Actions.GET_BOOKING_SUCCESS:
      return produce(state, draftState => {
        draftState.booking = action.booking;
        draftState.networkRequests.bookingLoad = ENetworkRequestStatus.SUCCESS;
        return draftState;
      });

    case Actions.GET_BOOKING_FAILURE:
      return produce(state, draftState => {
        draftState.networkRequests.bookingLoad = ENetworkRequestStatus.ERROR;
        return draftState;
      });

    case Actions.REQUEST_TO_BOOK_REQUEST:
      return produce(state, draftState => {
        draftState.networkRequests.requestToBook = ENetworkRequestStatus.PENDING;
        return draftState;
      });

    case Actions.REQUEST_TO_BOOK_SUCCESS:
      return produce(state, draftState => {
        draftState.networkRequests.requestToBook = ENetworkRequestStatus.SUCCESS;
        return draftState;
      });

    case Actions.REQUEST_TO_BOOK_FAILURE:
      return produce(state, draftState => {
        draftState.networkRequests.requestToBook = ENetworkRequestStatus.ERROR;
        return draftState;
      });

    case Actions.CONFIRM_REQUEST:
      return produce(state, draftState => {
        draftState.networkRequests.confirm = ENetworkRequestStatus.PENDING;
        return draftState;
      });

    case Actions.CONFIRM_SUCCESS:
      return produce(state, draftState => {
        draftState.networkRequests.confirm = ENetworkRequestStatus.SUCCESS;
        return draftState;
      });

    case Actions.CONFIRM_FAILURE:
      return produce(state, draftState => {
        draftState.networkRequests.confirm = ENetworkRequestStatus.ERROR;
        return draftState;
      });

    case Actions.CANCEL_REQUEST:
      return produce(state, draftState => {
        draftState.networkRequests.cancel = ENetworkRequestStatus.PENDING;
        return draftState;
      });

    case Actions.CANCEL_SUCCESS:
      return produce(state, draftState => {
        draftState.networkRequests.cancel = ENetworkRequestStatus.SUCCESS;
        return draftState;
      });

    case Actions.CANCEL_FAILURE:
      return produce(state, draftState => {
        draftState.networkRequests.cancel = ENetworkRequestStatus.ERROR;
        return draftState;
      });

    default:
      return state;
  }
};

export default bookingManagerReducer;
