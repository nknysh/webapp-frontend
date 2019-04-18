import { Status } from './status';
import { successAction, errorAction } from './actions';

describe('common actions', () => {
  it('successAction returns dynamic generated action object', () => {
    const action = successAction('FOO_ACTION', { some: 'data' });
    const expected = {
      type: `FOO_ACTION_${Status.SUCCESS}`,
      payload: { some: 'data' },
    };

    expect(action).toEqual(expected);
  });

  it('errorAction returns dynamic generated action object', () => {
    const action = errorAction('FOO_ACTION', { some: 'error' });
    const expected = {
      type: `FOO_ACTION_${Status.ERROR}`,
      payload: { some: 'error' },
    };

    expect(action).toEqual(expected);
  });
});
