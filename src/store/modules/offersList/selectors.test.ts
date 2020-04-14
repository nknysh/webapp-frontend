import { IOffersListDomain, initialState } from './model';
import { selectedHotelSelector } from './selectors';

describe('offersList selector', () => {
  it('selectedHotelSelector initial state (empty string)', () => {
    const fixture = {
      ...initialState,
    } as IOffersListDomain;

    expect(selectedHotelSelector.resultFunc(fixture)).toEqual('');
  });

  it('selectedHotelSelector passing', () => {
    const fixture = {
      selectedHotel: 'A',
    } as IOffersListDomain;

    expect(selectedHotelSelector.resultFunc(fixture)).toEqual('A');
  });
});
