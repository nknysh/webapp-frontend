import { initialState, BookingBuilderDomain } from './model';
import * as Actions from './actions';
import { makeBookingBuilderStub } from './utils';

const bookingBuilderReducer = (state: BookingBuilderDomain = initialState, action: Actions.BookingBuilderAction) => {
  switch (action.type) {
    case Actions.CLEAR_BOOKING_BUILDER:
      return initialState;

    case Actions.COPY_BOOKING_BUILDER:
      return {
        currentBookingBuilder: action.bookingBuilder,
      };

    case Actions.CREATE_STUB_BOOKING_BUILDER:
      return {
        currentBookingBuilder: makeBookingBuilderStub(action.hotel),
      };
    default:
      return state;
  }
};

export default bookingBuilderReducer;
