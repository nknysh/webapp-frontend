import { mapStateToProps, mapDispatchToProps } from './App.state';

describe('App.state', () => {
  describe('mapStateToProps', () => {
    it('returns empty object', () => {
      expect(mapStateToProps()).toEqual({});
    });
  });

  describe('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const mappedDispatchToProps = mapDispatchToProps(dispatch);

    mappedDispatchToProps.getUserFromToken('foo');
    expect(dispatch).toHaveBeenCalled();
  });
});
