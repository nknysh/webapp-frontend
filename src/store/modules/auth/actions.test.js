import {
  authSignUp,
  signUp,
  authRequest,
  logIn,
  authLogOut,
  logOut,
  resetPassword,
  setPassword,
  authSetPasswordReset,
  authPasswordReset,
} from './actions';

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

      expect(dispatch).toHaveBeenCalledTimes(1);
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
  describe('authLogOut', () => {
    it('returns action', () => {
      expect(authLogOut({})).toMatchSnapshot();
    });
  });
  describe('logOut', () => {
    it('calls dispatch thunks', () => {
      const dispatch = jest.fn();

      logOut({})(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(3);
    });
  });
  describe('authPasswordReset', () => {
    it('returns action', () => {
      expect(authPasswordReset({})).toMatchSnapshot();
    });
  });
  describe('resetPassword', () => {
    it('calls dispatch thunks', () => {
      const dispatch = jest.fn();

      resetPassword({})(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
  describe('authSetPasswordReset', () => {
    it('returns action', () => {
      expect(authSetPasswordReset({})).toMatchSnapshot();
    });
  });
  describe('setPassword', () => {
    it('calls dispatch thunks', () => {
      const dispatch = jest.fn();

      setPassword({})(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
