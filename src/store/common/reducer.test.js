import { Status } from './status';
import initialState from './initialState';
import { successReducer, errorReducer } from './reducer';

describe('common reducers', () => {
  it('successReducer returns state with success', () => {
    const result = successReducer(initialState, { payload: { some: 'data' } });
    const expected = {
      status: Status.SUCCESS,
      error: undefined,
      data: {
        some: 'data',
      },
    };

    expect(result).toEqual(expected);
  });
  it('errorReducer returns state with error', () => {
    const result = errorReducer(initialState, { payload: { some: 'data' } });
    const expected = {
      status: Status.ERROR,
      data: undefined,
      error: {
        some: 'data',
      },
    };

    expect(result).toEqual(expected);
  });
});
