import { mapStateToProps } from './App.state';

describe('App.state', () => {
  describe('mapStateToProps', () => {
    it('returns empty object', () => {
      expect(mapStateToProps()).toEqual({});
    });
  });
});
