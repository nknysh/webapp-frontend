import { fetchHotelsAction, fetchHotels } from './actions';

describe('hotels actions', () => {
  describe('fetchHotelsAction', () => {
    it('returns action', () => {
      expect(fetchHotelsAction('foo')).toMatchSnapshot();
    });
  });
  describe('fetchHotels', () => {
    it('calls dispatch thunks', () => {
      const dispatch = jest.fn();

      fetchHotels()(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
