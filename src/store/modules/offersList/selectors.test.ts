import { IOffersListDomain, initialState } from './model';
import { selectedHotelSelector, pageCountSelector } from './selectors';

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

  describe('pageCountSelector', () => {
    it('items per page is missing', () => {
      const itemsPerPageFixture = undefined;
      const totalResultsFixture = 10;

      expect(pageCountSelector.resultFunc(itemsPerPageFixture, totalResultsFixture)).toEqual(0);
    });

    it('total results is missing', () => {
      const itemsPerPageFixture = 4;
      const totalResultsFixture = undefined;

      expect(pageCountSelector.resultFunc(itemsPerPageFixture, totalResultsFixture)).toEqual(0);
    });

    it('page count should be total results / items per page (no rounding)', () => {
      const itemsPerPageFixture = 2;
      const totalResultsFixture = 10;

      expect(pageCountSelector.resultFunc(itemsPerPageFixture, totalResultsFixture)).toEqual(5);
    });

    it('page count should be total results / items per page (rounded up)', () => {
      const itemsPerPageFixture = 2;
      const totalResultsFixture = 11;

      expect(pageCountSelector.resultFunc(itemsPerPageFixture, totalResultsFixture)).toEqual(6);
    });
  });
});
