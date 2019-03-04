import { initialState } from 'store/common';

import {
  getAuth,
  getAuthData,
  getAuthError,
  getAuthStatus,
  getAuthToken,
  getCurrentUser,
  isAuthenticated,
} from './selectors';

const state = {
  auth: {
    ...initialState,
    data: {
      token: 'foo',
      user: 'foo',
    },
  },
};

describe('auth selectors', () => {
  describe('getAuth', () => {
    it('returns the root key', () => {
      expect(getAuth(state)).toBe(state.auth);
    });
  });
  describe('getAuthData', () => {
    it('returns the root key', () => {
      expect(getAuthData(state)).toBe(state.auth.data);
    });
  });
  describe('getAuthError', () => {
    it('returns the root key', () => {
      expect(getAuthError(state)).toBe(state.auth.error);
    });
  });
  describe('getAuthStatus', () => {
    it('returns the root key', () => {
      expect(getAuthStatus(state)).toBe(state.auth.status);
    });
  });
  describe('getAuthToken', () => {
    it('returns the root key', () => {
      expect(getAuthToken(state)).toBe(state.auth.data.token);
    });
  });
  describe('getCurrentUser', () => {
    it('returns the root key', () => {
      expect(getCurrentUser(state)).toBe(state.auth.data.user);
    });
  });
  describe('isAuthenticated', () => {
    it('returns the root key', () => {
      expect(isAuthenticated(state)).toBeTruthy();
    });
  });
});
