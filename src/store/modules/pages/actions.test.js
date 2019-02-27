import { GET_PAGE, getPageById } from './actions';

describe('pages actions', () => {
  describe('getPageById', () => {
    it('returns action', () => {
      expect(getPageById('foo')).toEqual({
        type: GET_PAGE,
        payload: {
          pageId: 'foo',
        },
      });
    });
  });
});
