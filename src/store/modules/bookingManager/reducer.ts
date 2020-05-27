import { initialState, IBookingManagerDomain } from './model';
import * as Actions from './actions';
import produce from 'immer';

const bookingManagerReducer = (state: IBookingManagerDomain = initialState, action: Actions.BookingManagerAction) => {
  switch (action.type) {
    case Actions.GET_BOOKING_REQUEST:
      return produce(state, draftState => {
        draftState.status = 'LOADING';
        return draftState;
      });

    case Actions.GET_BOOKING_SUCCESS:
      return produce(state, draftState => {
        draftState.booking = action.booking;
        draftState.status = 'LOADED';
        return draftState;
      });

    case Actions.GET_BOOKING_FAILURE:
      return produce(state, draftState => {
        draftState.status = 'ERROR';
        return draftState;
      });
  }

  return state;
};

export default bookingManagerReducer;
