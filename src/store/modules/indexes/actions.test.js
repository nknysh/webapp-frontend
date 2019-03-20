import { index } from './actions';

describe('pages actions', () => {
  describe('index', () => {
    it('calls dispatch thunks', () => {
      const dispatch = jest.fn();

      index({})(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
