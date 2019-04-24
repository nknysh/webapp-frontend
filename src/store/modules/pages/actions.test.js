import { getPageById, getPage } from './actions';

describe('pages actions', () => {
  describe('getPageById', () => {
    it('returns action', () => {
      expect(getPageById('foo')).toMatchSnapshot();
    });
  });
  describe('getPage', () => {
    it('calls dispatch thunks', () => {
      const dispatch = jest.fn();

      getPage('about-us')(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(3);
    });
  });
});
