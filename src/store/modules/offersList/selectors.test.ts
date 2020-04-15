import { IOffersListDomain, initialState } from './model';
import { selectedHotelSelector, pageCountSelector, offersListQuerySelector } from './selectors';

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
      const itemsPerPageFixture = 0;
      const totalResultsFixture = 10;

      expect(pageCountSelector.resultFunc(itemsPerPageFixture, totalResultsFixture)).toEqual(0);
    });

    it('total results is missing', () => {
      const itemsPerPageFixture = 4;
      const totalResultsFixture = 0;

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

  describe('offersListQuerySelector', () => {
    it('with defaults', () => {
      const sortByFixture = 'createdAt';
      const filterFixture = '';
      const currentPageFixture = 0;
      const itemsPerPageFixture = 10;
      const sortOrderFixture = 'asc';
      const filterFieldsFixture = ['uuid', 'name'];
      const selectedHotelFixture = '';

      const result = offersListQuerySelector.resultFunc(
        sortByFixture,
        filterFixture,
        currentPageFixture,
        itemsPerPageFixture,
        sortOrderFixture,
        filterFieldsFixture,
        selectedHotelFixture
      );
      expect(result).toMatchObject({
        sort: 'offer.createdAt',
        page: { offset: 0, limit: 10 },
        associations: 'hotel',
        fields: { hotel: 'uuid, name, countryCode' },
        filter: { offer: {} },
      });
    });

    it('different sort by', () => {
      const sortByFixture = 'name';
      const filterFixture = '';
      const currentPageFixture = 0;
      const itemsPerPageFixture = 10;
      const sortOrderFixture = 'asc';
      const filterFieldsFixture = ['uuid', 'name'];
      const selectedHotelFixture = '';

      const result = offersListQuerySelector.resultFunc(
        sortByFixture,
        filterFixture,
        currentPageFixture,
        itemsPerPageFixture,
        sortOrderFixture,
        filterFieldsFixture,
        selectedHotelFixture
      );
      expect(result).toMatchObject({
        sort: 'offer.name',
        page: { offset: 0, limit: 10 },
        associations: 'hotel',
        fields: { hotel: 'uuid, name, countryCode' },
        filter: { offer: {} },
      });
    });

    it('sort order desc', () => {
      const sortByFixture = 'createdAt';
      const filterFixture = '';
      const currentPageFixture = 0;
      const itemsPerPageFixture = 10;
      const sortOrderFixture = 'desc';
      const filterFieldsFixture = ['uuid', 'name'];
      const selectedHotelFixture = '';

      const result = offersListQuerySelector.resultFunc(
        sortByFixture,
        filterFixture,
        currentPageFixture,
        itemsPerPageFixture,
        sortOrderFixture,
        filterFieldsFixture,
        selectedHotelFixture
      );
      expect(result).toMatchObject({
        sort: '-offer.createdAt',
        page: { offset: 0, limit: 10 },
        associations: 'hotel',
        fields: { hotel: 'uuid, name, countryCode' },
        filter: { offer: {} },
      });
    });

    it('with a filter', () => {
      const sortByFixture = 'createdAt';
      const filterFixture = 'TEST';
      const currentPageFixture = 0;
      const itemsPerPageFixture = 10;
      const sortOrderFixture = 'asc';
      const filterFieldsFixture = ['uuid', 'name'];
      const selectedHotelFixture = '';

      const result = offersListQuerySelector.resultFunc(
        sortByFixture,
        filterFixture,
        currentPageFixture,
        itemsPerPageFixture,
        sortOrderFixture,
        filterFieldsFixture,
        selectedHotelFixture
      );
      expect(result).toMatchObject({
        sort: 'offer.createdAt',
        page: { offset: 0, limit: 10 },
        associations: 'hotel',
        fields: { hotel: 'uuid, name, countryCode' },
        filter: {
          offer: {
            'uuid,name:ilike': 'TEST',
          },
        },
      });
    });

    it('with a selected hotel', () => {
      const sortByFixture = 'createdAt';
      const filterFixture = '';
      const currentPageFixture = 0;
      const itemsPerPageFixture = 10;
      const sortOrderFixture = 'asc';
      const filterFieldsFixture = ['uuid', 'name'];
      const selectedHotelFixture = 'A';

      const result = offersListQuerySelector.resultFunc(
        sortByFixture,
        filterFixture,
        currentPageFixture,
        itemsPerPageFixture,
        sortOrderFixture,
        filterFieldsFixture,
        selectedHotelFixture
      );
      expect(result).toMatchObject({
        sort: 'offer.createdAt',
        page: { offset: 0, limit: 10 },
        associations: 'hotel',
        fields: { hotel: 'uuid, name, countryCode' },
        filter: {
          offer: {
            hotelUuid: 'A',
          },
        },
      });
    });

    it('with a filter and a selected hotel', () => {
      const sortByFixture = 'createdAt';
      const filterFixture = 'TEST';
      const currentPageFixture = 0;
      const itemsPerPageFixture = 10;
      const sortOrderFixture = 'asc';
      const filterFieldsFixture = ['uuid', 'name'];
      const selectedHotelFixture = 'A';

      const result = offersListQuerySelector.resultFunc(
        sortByFixture,
        filterFixture,
        currentPageFixture,
        itemsPerPageFixture,
        sortOrderFixture,
        filterFieldsFixture,
        selectedHotelFixture
      );
      expect(result).toMatchObject({
        sort: 'offer.createdAt',
        page: { offset: 0, limit: 10 },
        associations: 'hotel',
        fields: { hotel: 'uuid, name, countryCode' },
        filter: {
          offer: {
            'uuid,name:ilike': 'TEST',
            hotelUuid: 'A',
          },
        },
      });
    });

    it('higher current page', () => {
      const sortByFixture = 'createdAt';
      const filterFixture = '';
      const currentPageFixture = 3;
      const itemsPerPageFixture = 10;
      const sortOrderFixture = 'asc';
      const filterFieldsFixture = ['uuid', 'name'];
      const selectedHotelFixture = '';

      const result = offersListQuerySelector.resultFunc(
        sortByFixture,
        filterFixture,
        currentPageFixture,
        itemsPerPageFixture,
        sortOrderFixture,
        filterFieldsFixture,
        selectedHotelFixture
      );
      expect(result).toMatchObject({
        sort: 'offer.createdAt',
        page: { offset: 30, limit: 10 },
        associations: 'hotel',
        fields: { hotel: 'uuid, name, countryCode' },
        filter: {
          offer: {},
        },
      });
    });

    it('higher current page and more items per page', () => {
      const sortByFixture = 'createdAt';
      const filterFixture = '';
      const currentPageFixture = 3;
      const itemsPerPageFixture = 12;
      const sortOrderFixture = 'asc';
      const filterFieldsFixture = ['uuid', 'name'];
      const selectedHotelFixture = '';

      const result = offersListQuerySelector.resultFunc(
        sortByFixture,
        filterFixture,
        currentPageFixture,
        itemsPerPageFixture,
        sortOrderFixture,
        filterFieldsFixture,
        selectedHotelFixture
      );
      expect(result).toMatchObject({
        sort: 'offer.createdAt',
        page: { offset: 36, limit: 12 },
        associations: 'hotel',
        fields: { hotel: 'uuid, name, countryCode' },
        filter: {
          offer: {},
        },
      });
    });
  });
});
