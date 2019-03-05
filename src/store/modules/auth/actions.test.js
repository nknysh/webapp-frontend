import { authSignUp, signUp, authRequest, logIn } from './actions';

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
  describe('authRequest', () => {
    it('returns action', () => {
      expect(authRequest({})).toMatchSnapshot();
    });
  });
  describe('logIn', () => {
    it('calls dispatch thunks', () => {
      const dispatch = jest.fn();

      logIn({})(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(3);
    });
  });
});
