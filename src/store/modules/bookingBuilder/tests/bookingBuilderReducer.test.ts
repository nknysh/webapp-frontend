import { bookingBuilderReducer } from '../reducer';
import * as Actions from '../actions';
import { initialState, BookingBuilderDomain } from '../model';

describe('Booking Builder Reducer', () => {
  it('Clears the TA Margin state', () => {
    const inputState: BookingBuilderDomain = {
      ...initialState,
      isTAMarginApplied: true,
      taMarginType: 'fixed',
      taMarginAmount: '100',
    };

    const action = Actions.resetBookingBuilderUiStateAction();

    const testState: BookingBuilderDomain = bookingBuilderReducer(inputState, action);
    expect(testState.isTAMarginApplied).toEqual(true);
    expect(testState.taMarginType).toEqual('percentage');
    expect(testState.taMarginAmount).toEqual('0');
  });
});
