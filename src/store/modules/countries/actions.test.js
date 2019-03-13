import { setCountriesAction, setCountries } from './actions';

describe('pages actions', () => {
  describe('setCountriesAction', () => {
    it('returns action', () => {
      expect(setCountriesAction('foo')).toMatchSnapshot();
    });
  });
  describe('setCountries', () => {
    it('calls dispatch thunks', () => {
      const dispatch = jest.fn();

      setCountries()(dispatch, () => {});

      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
