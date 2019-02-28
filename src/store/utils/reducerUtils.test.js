import { initialState } from 'store/utils';

import { statusLens, errorLens, dataLens, getErrorActionName, getSuccessActionName, normalizer } from './reducerUtils';

describe('reducerUtils', () => {
  describe('lenses', () => {
    it('are functions', () => {
      expect(statusLens(initialState)).toBeInstanceOf(Function);
      expect(errorLens(initialState)).toBeInstanceOf(Function);
      expect(dataLens(initialState)).toBeInstanceOf(Function);
    });
  });

  it('returns action name from getters', () => {
    expect(getSuccessActionName('FOO')).toEqual('FOO_SUCCESS');
    expect(getErrorActionName('FOO')).toEqual('FOO_ERROR');
  });

  describe('normalizer', () => {
    it('normalizes array data by predicate', () => {
      const reducedState = {
        data: [
          {
            id: 1,
            title: 'item 1',
          },
          {
            id: 2,
            title: 'item 2',
          },
        ],
      };

      expect(normalizer('id', reducedState)).toMatchSnapshot();
    });
  });
});
