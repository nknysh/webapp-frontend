import * as Actions from './actions';
import reducer from './reducer';
import { initialState } from './model';

describe('booking manager reducer', () => {
  it('GET_BOOKING_REQUEST', () => {
    const state = {
      ...initialState,
    };
    const action = Actions.getBookingRequestAction('a');
    const updatedState = reducer(state, action);
    expect(updatedState.networkRequests.bookingLoad).toEqual('LOADING');
  });

  it('GET_BOOKING_SUCCESS', () => {
    const state = {
      ...initialState,
    };
    const action = Actions.getBookingSuccessAction({
      uuid: 'a',
      guestEmail: 'test',
    });
    const updatedState = reducer(state, action);
    expect(updatedState.networkRequests.bookingLoad).toEqual('LOADED');
    expect(updatedState.booking).toMatchObject({
      uuid: 'a',
      guestEmail: 'test',
    });
  });

  it('GET_BOOKING_FAILURE', () => {
    const state = {
      ...initialState,
    };
    const action = Actions.getBookingFailureAction('a');
    const updatedState = reducer(state, action);
    expect(updatedState.networkRequests.bookingLoad).toEqual('ERROR');
  });

  it('REQUEST_TO_BOOK_REQUEST', () => {
    const state = {
      ...initialState,
    };
    const action = Actions.requestToBookRequestAction({});
    const updatedState = reducer(state, action);
    expect(updatedState.networkRequests.requestToBook).toEqual('LOADING');
  });

  it('REQUEST_TO_BOOK_SUCCESS', () => {
    const state = {
      ...initialState,
    };
    const action = Actions.requestToBookSuccessAction({});
    const updatedState = reducer(state, action);
    expect(updatedState.networkRequests.requestToBook).toEqual('LOADED');
  });

  it('REQUEST_TO_BOOK_FAILURE', () => {
    const state = {
      ...initialState,
    };
    const action = Actions.requestToBookFailureAction({});
    const updatedState = reducer(state, action);
    expect(updatedState.networkRequests.requestToBook).toEqual('ERROR');
  });

  it('CANCEL_REQUEST', () => {
    const state = {
      ...initialState,
    };
    const action = Actions.cancelRequestAction({});
    const updatedState = reducer(state, action);
    expect(updatedState.networkRequests.cancel).toEqual('LOADING');
  });

  it('CANCEL_SUCCESS', () => {
    const state = {
      ...initialState,
    };
    const action = Actions.cancelSuccessAction({});
    const updatedState = reducer(state, action);
    expect(updatedState.networkRequests.cancel).toEqual('LOADED');
  });

  it('CANCEL_FAILURE', () => {
    const state = {
      ...initialState,
    };
    const action = Actions.cancelFailureAction({});
    const updatedState = reducer(state, action);
    expect(updatedState.networkRequests.cancel).toEqual('ERROR');
  });

  it('CONFIRM_REQUEST', () => {
    const state = {
      ...initialState,
    };
    const action = Actions.confirmRequestAction('a');
    const updatedState = reducer(state, action);
    expect(updatedState.networkRequests.confirm).toEqual('LOADING');
  });

  it('CONFIRM_SUCCESS', () => {
    const state = {
      ...initialState,
    };
    const action = Actions.confirmSuccessAction({});
    const updatedState = reducer(state, action);
    expect(updatedState.networkRequests.confirm).toEqual('LOADED');
  });

  it('CONFIRM_FAILURE', () => {
    const state = {
      ...initialState,
    };
    const action = Actions.confirmFailureAction({});
    const updatedState = reducer(state, action);
    expect(updatedState.networkRequests.confirm).toEqual('ERROR');
  });
});
