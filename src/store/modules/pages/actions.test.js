import { getPageById, getPageAction } from './actions';

describe('pages actions', () => {
  describe('getPageAction', () => {
    it('returns action', () => {
      expect(getPageAction('foo')).toMatchSnapshot();
    });
  });
  describe('getPageById', () => {
    it('calls dispatch thunks', () => {
      const dispatch = jest.fn();

      getPageById('about-us')(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(3);
    });
  });
});
