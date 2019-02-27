import { getToken } from './auth';

describe('auth utils', () => {
  describe('getToken', () => {
    it('returns token from query string', () => {
      const mockWindow = {
        location: {
          search: 'token=12345',
        },
      };

      expect(getToken(mockWindow)).toEqual('12345');
    });

    it('returns false when token does not exist', () => {
      const mockWindow = {
        location: {
          search: 'notAToken=12345',
        },
      };

      expect(getToken(mockWindow)).toBeFalsy();
    });
  });
});
