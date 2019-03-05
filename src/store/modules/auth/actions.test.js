import { authSignUp, signUp } from './actions';

describe('auth actions', () => {
  describe('authSignUp', () => {
    it('returns action', () => {
      expect(authSignUp({})).toMatchSnapshot();
    });
  });
  describe('signUp', () => {
    it('calls dispatch thunks', () => {
      const dispatch = jest.fn();

      signUp({})(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
