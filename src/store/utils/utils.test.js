import { initialState } from 'store/utils';

import { statusLens, errorLens, dataLens, getErrorActionName, getSuccessActionName } from './utils';

describe('utils', () => {
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
});
