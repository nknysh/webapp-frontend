import { Status } from './status';
import { successAction, errorAction, extractData, fetchRelationships } from './actions';

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

  describe('extractData', () => {
    it('returns array of unique relationship ids based on schema', () => {
      const entities = [
        {
          barId: 'foo',
        },
      ];

      const relationships = {
        bar: {
          path: ['barId'],
        },
      };

      expect(extractData(['path'], relationships, entities)).toMatchSnapshot();
    });
  });

  describe('fetchRelationships', () => {
    it('calls fetch actions for relationships if they do not exist', () => {
      const relationships = { foo: ['fooId1', 'fooId2'] };
      const actions = { foo: jest.fn() };
      const getState = () => ({
        foo: {
          data: {
            fooId2: {
              title: 'foo 1',
            },
          },
        },
      });
      const dispatch = jest.fn();

      fetchRelationships(relationships, actions, getState, dispatch);

      expect(actions.foo).toHaveBeenCalledTimes(1);
      expect(actions.foo).toHaveBeenCalledWith('fooId1');
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
