import {
  saveCustomItemAction,
  removeCustomItemAction,
  updateAgreeToTermsAction,
  setIsPristineAction,
  setLatestBookingOperationAction
} from '../actions';

describe('Bookin Builder actions', () => {
  it('Returns the correct object literals', () => {
    expect(saveCustomItemAction('123-456')).toMatchSnapshot();
    expect(removeCustomItemAction(0, '123-456')).toMatchSnapshot();
    
    expect(updateAgreeToTermsAction(true)).toMatchSnapshot();
    expect(setIsPristineAction(true)).toMatchSnapshot();
    expect(setLatestBookingOperationAction('SAMPLE_ACTION')).toMatchSnapshot();
  });
});
