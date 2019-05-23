import { fetchHotelsAction } from './actions';

describe('hotels actions', () => {
  describe('fetchHotelsAction', () => {
    it('returns action', () => {
      expect(fetchHotelsAction('foo')).toMatchSnapshot();
    });
  });
});
