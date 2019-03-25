import { initialState } from 'store/common';

import { updateBooking } from './actions';
import reducer from './reducer';

describe('countries reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_COUNTRIES', () => {
    const action = updateBooking();
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });
});
