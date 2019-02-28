import { FETCH_PAGE, getPageById, getPage } from './actions';

describe('pages actions', () => {
  describe('getPageById', () => {
    it('returns action', () => {
      expect(getPageById('foo')).toEqual({
        type: FETCH_PAGE,
        payload: {
          pageId: 'foo',
        },
      });
    });
  });
  describe('getPage', () => {
    it('calls dispatch thunks', () => {
      const dispatch = jest.fn();

      getPage('about-us')(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
