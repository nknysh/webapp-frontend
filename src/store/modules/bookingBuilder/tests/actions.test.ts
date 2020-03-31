import {
  saveCustomItemAction,
  removeCustomItemAction
} from '../actions';

describe('Bookin Builder actions', () => {
  it('Returns the correct object literals', () => {
    expect(saveCustomItemAction('123-456')).toMatchSnapshot();
    expect(removeCustomItemAction(0, '123-456')).toMatchSnapshot();
  });
});
