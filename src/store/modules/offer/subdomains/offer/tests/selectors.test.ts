import { IDateRange } from 'interfaces';
import {
  IOfferPrerequisitesPayload,
  IAccommodationProductForHotelItem,
  IOfferPrerequisites,
  IOfferSubProductDiscounts,
  IOfferUI,
  IOfferProductDiscounts,
  IProduct,
  IUIOfferProductDiscountInstance,
  IHotel,
} from 'services/BackendApi';

import { IBootstrapExtraPersonSupplementProduct } from 'store/modules/bootstrap/model';

import {
  offerSelector,
  offerHotelUuidSelector,
  offerNameSelector,
  offerTermsSelector,
  offerFurtherInformationSelector,
  offerStayBetweenPrerequisitesSelector,
  offerStayBetweenPrerequisitesRawSelector,
  offerBooleanPrerequisitesSelector,
  offerCountryCodePrerequisiteSelector,
  offerTaCountriesPrerequisiteSelector,
  offerTaCountriesLabelPrerequisiteSelector,
  offerAccommodationProductPrerequisitesRawSelector,
  offerAccommodationProductPrerequisitesSelector,
  offerAccommodationProductPrerequisitesLabelSelector,
  offerAdvancePrerequisiteSelector,
  offerMaxLodgingsPrerequisiteSelector,
  offerStayLengthPrerequisiteSelector,
  hotelNameSelector,
  offerSteppingApplicationSelector,
  offerAccommodationDiscountSelector,
  offerSubProductDiscountsSelector,
  offersubProductDiscountsSupplementsSelector,
  offerExtraPersonSupplementsSelector,
  offerTaCountriesPrerequisiteByRegionSelector,
  offerProductDiscountsFinesSelector,
  offerProductDiscountsGroundServicesSelector,
  offersubProductDiscountsMealPlansSelector,
  offerProductDiscountsSelector,
  offerProductDiscountsTransfersSelector,
  offerProductDiscountsSupplementsSelector,
  isAccomodationPreReqAllSelected,
} from '../selectors';
import { IBootstrapCountry } from 'store/modules/bootstrap/model';

import { initialState, IOfferModel, IOfferUiState, IHotelAvailableProducts } from '../../../model';
import { ITaCountriesUiData, ITACountry } from '../../../types';

const mockAvailableProducts: IProduct<any>[] = [
  {
    uuid: 'mock_product_uuid',
    name: 'Mock Product',
    type: 'mock type',
    category: 'mockCategory',
    options: {},
    meta: {},
    ownerType: 'owner',
    ownerUuid: 'owner_uuid',
    createdAt: '2020-01-01',
    updatedAt: '2020-01-01',
  },
];

describe('Offer Selectors', () => {
  describe('offerSelector', () => {
    it('Selects correctly', () => {
      const mockOfferDomain: IOfferModel = {
        uiState: {} as IOfferUiState,
        associatedOffersMapping: {},
        associatedProductsMapping: {},
        availableProducts: {} as IHotelAvailableProducts,
        offersOnHotel: [],
        offer: {
          uuid: 'NEW_OFFER',
          cannotCombineWith: [],
          combinesWith: [],
          combines: true,
          hotel: {} as IHotel,
          order: Infinity,
          name: '',
          termsAndConditions: '',
          furtherInformation: '',
          hotelUuid: '',
          prerequisites: {
            dates: [],
            countryCodes: [],
            advance: undefined,
            maximumLodgingsInBooking: undefined,
          },
          preDiscount: false,
          productDiscounts: {},
          subProductDiscounts: {},
          stepping: undefined,
          updatedAt: '',
          createdAt: '',
        },
      };

      expect(offerSelector.resultFunc(mockOfferDomain)).toMatchObject(mockOfferDomain.offer);
    });
  });

  describe('offer sub selectors', () => {
    it('Selects hotel uuid correctly', () => {
      expect(offerHotelUuidSelector.resultFunc(initialState.offer)).toEqual('');
    });

    it('Selects name correctly', () => {
      expect(offerNameSelector.resultFunc(initialState.offer)).toEqual('');
    });

    it('Selects terms and conditions correctly', () => {
      expect(offerTermsSelector.resultFunc(initialState.offer)).toEqual('');
    });

    it('Selects further information correctly', () => {
      expect(offerFurtherInformationSelector.resultFunc(initialState.offer)).toEqual('');
    });
  });

  describe('offer stay between selector', () => {
    it('handles a 5 date range correctly', () => {
      const fixture = {
        ...initialState.offer.prerequisites,
        dates: [
          {
            startDate: '2020-01-01',
            endDate: '2020-01-05',
          },
        ] as IDateRange[],
      };

      const selected = offerStayBetweenPrerequisitesSelector.resultFunc(fixture);

      expect(selected).toMatchObject([['2020-01-01', '2020-01-02', '2020-01-03', '2020-01-04', '2020-01-05']]);
    });

    it('handles multiple date prerequisites', () => {
      const fixture = {
        ...initialState.offer.prerequisites,
        dates: [
          {
            startDate: '2020-01-01',
            endDate: '2020-01-05',
          },
          {
            startDate: '2020-05-01',
            endDate: '2020-05-03',
          },
        ] as IDateRange[],
      };

      const selected = offerStayBetweenPrerequisitesSelector.resultFunc(fixture);

      expect(selected).toMatchObject([
        ['2020-01-01', '2020-01-02', '2020-01-03', '2020-01-04', '2020-01-05'],
        ['2020-05-01', '2020-05-02', '2020-05-03'],
      ]);
    });

    it('raw selector works', () => {
      const fixture = {
        ...initialState.offer.prerequisites,
        dates: [
          {
            startDate: '2020-01-01',
            endDate: '2020-01-05',
          },
        ] as IDateRange[],
      };

      const selected = offerStayBetweenPrerequisitesRawSelector.resultFunc(fixture);

      expect(selected).toMatchObject([
        {
          startDate: '2020-01-01',
          endDate: '2020-01-05',
        },
      ]);
    });
  });

  describe('offer boolean prerequisites selector', () => {
    it('returns when no payloads are set', () => {
      const fixture = {} as IOfferPrerequisitesPayload;

      const selected = offerBooleanPrerequisitesSelector.resultFunc(fixture);

      expect(selected).toMatchObject({
        anniversary: null,
        birthday: null,
        honeymoon: null,
        repeatCustomer: null,
        wedding: null,
      });
    });

    it('returns when some are not set and some are true and false', () => {
      const fixture = {
        anniversary: true,
        wedding: false,
      } as IOfferPrerequisitesPayload;

      const selected = offerBooleanPrerequisitesSelector.resultFunc(fixture);

      expect(selected).toMatchObject({
        anniversary: true,
        birthday: null,
        honeymoon: null,
        repeatCustomer: null,
        wedding: false,
      });
    });

    it('returns when all are set to true', () => {
      const fixture = {
        anniversary: true,
        birthday: true,
        honeymoon: true,
        repeatCustomer: true,
        wedding: true,
      } as IOfferPrerequisitesPayload;

      const selected = offerBooleanPrerequisitesSelector.resultFunc(fixture);

      expect(selected).toMatchObject({
        anniversary: true,
        birthday: true,
        honeymoon: true,
        repeatCustomer: true,
        wedding: true,
      });
    });
  });

  describe('offer countries prerequisites', () => {
    it('returns base array of countries correctly', () => {
      const fixture = {
        ...initialState.offer.prerequisites,
        countryCodes: ['AZ', 'UK'],
      };

      const selected = offerCountryCodePrerequisiteSelector.resultFunc(fixture);

      expect(selected).toMatchObject(['AZ', 'UK']);
    });

    it('returns base array of countries correctly even if no countries', () => {
      const fixture = {
        ...initialState.offer.prerequisites,
        countryCodes: [],
      };

      const selected = offerCountryCodePrerequisiteSelector.resultFunc(fixture);

      expect(selected).toMatchObject([]);
    });

    it('returns TA countries in label/value format, where value is true for countries who have a matching `code` in the prerequisites', () => {
      const prerequisitesCountriesFixture = ['B'];

      const countriesFixture: IBootstrapCountry[] = [
        {
          code: 'A',
          name: 'Country A',
          region: 'Region A',
          isDestination: true,
        },
        {
          code: 'B',
          name: 'Country B',
          region: 'Region B',
          isDestination: true,
        },
        {
          code: 'C',
          name: 'Country C',
          region: 'Region C',
          isDestination: true,
        },
      ];

      const selected = offerTaCountriesPrerequisiteSelector.resultFunc(prerequisitesCountriesFixture, countriesFixture);

      expect(selected).toMatchObject([
        {
          label: 'Country A',
          value: false,
        },
        {
          label: 'Country B',
          value: true,
        },
        {
          label: 'Country C',
          value: false,
        },
      ]);
    });

    it('returns TA countries in label/value format. if no country codes in prerequisites, all countries are returned with value false', () => {
      const prerequisitesCountriesFixture = [];

      const countriesFixture: IBootstrapCountry[] = [
        {
          code: 'A',
          name: 'Country A',
          region: 'Region A',
          isDestination: true,
        },
        {
          code: 'B',
          name: 'Country B',
          region: 'Region B',
          isDestination: true,
        },
        {
          code: 'C',
          name: 'Country C',
          region: 'Region C',
          isDestination: true,
        },
      ];

      const selected = offerTaCountriesPrerequisiteSelector.resultFunc(prerequisitesCountriesFixture, countriesFixture);

      expect(selected).toMatchObject([
        {
          label: 'Country A',
          value: false,
        },
        {
          label: 'Country B',
          value: false,
        },
        {
          label: 'Country C',
          value: false,
        },
      ]);
    });

    it('has the correct TA label for all countries selected when no countries are selected', () => {
      const prerequisitesCountriesFixture = [];

      const countriesFixture: IBootstrapCountry[] = [
        {
          code: 'A',
          name: 'Country A',
          region: 'Region A',
          isDestination: true,
        },
        {
          code: 'B',
          name: 'Country B',
          region: 'Region B',
          isDestination: true,
        },
        {
          code: 'C',
          name: 'Country C',
          region: 'Region C',
          isDestination: true,
        },
      ];

      const selected = offerTaCountriesLabelPrerequisiteSelector.resultFunc(prerequisitesCountriesFixture);

      expect(selected).toEqual('Any Country');
    });

    it('has the correct TA label for some countries selected', () => {
      const prerequisitesCountriesFixture = ['A', 'B'];

      const countriesFixture: IBootstrapCountry[] = [
        {
          code: 'A',
          name: 'Country A',
          region: 'Region A',
          isDestination: true,
        },
        {
          code: 'B',
          name: 'Country B',
          region: 'Region B',
          isDestination: true,
        },
        {
          code: 'C',
          name: 'Country C',
          region: 'Region C',
          isDestination: true,
        },
      ];

      const selected = offerTaCountriesLabelPrerequisiteSelector.resultFunc(prerequisitesCountriesFixture);

      expect(selected).toEqual('2 Countries');
    });

    it('has the correct TA label for every country selected', () => {
      const prerequisitesCountriesFixture = ['A', 'B', 'C'];
      const selected = offerTaCountriesLabelPrerequisiteSelector.resultFunc(prerequisitesCountriesFixture);

      expect(selected).toEqual('3 Countries');
    });
  });

  describe('isAccomodationPreReqAllSelected', () => {
    const options = {} as IAccommodationProductForHotelItem['options'];
    const accommodationProductsFixture: IAccommodationProductForHotelItem[] = [
      {
        uuid: 'a',
        name: 'Product A',
        type: 'Accommodation',
        options,
      },
      {
        uuid: 'b',
        name: 'Product B',
        type: 'Accommodation',
        options,
      },
      {
        uuid: 'c',
        name: 'Product C',
        type: 'Accommodation',
        options,
      },
    ];

    it('returns true if none are selected', () => {
      expect(isAccomodationPreReqAllSelected.resultFunc([])).toEqual(true);
    });
  });

  describe('offer accommodation products prerequisite', () => {
    it('returns base array of accommodation products correctly', () => {
      const fixture = {
        ...initialState.offer.prerequisites,
        accommodationProducts: ['a', 'b'],
      };

      const selected = offerAccommodationProductPrerequisitesRawSelector.resultFunc(fixture);

      expect(selected).toMatchObject(['a', 'b']);
    });

    it('returns base array of accommodation products even if none', () => {
      const fixture = {
        ...initialState.offer.prerequisites,
        accommodationProducts: [],
      };

      const selected = offerAccommodationProductPrerequisitesRawSelector.resultFunc(fixture);

      expect(selected).toMatchObject([]);
    });

    it('creates a formatted array of all accommodation products on the hotel', () => {
      const prerequisitesFixture = ['b'];
      const options = {} as IAccommodationProductForHotelItem['options'];

      const accommodationProductsFixture: IAccommodationProductForHotelItem[] = [
        {
          uuid: 'a',
          name: 'Product A',
          type: 'Accommodation',
          options,
        },
        {
          uuid: 'b',
          name: 'Product B',
          type: 'Accommodation',
          options,
        },
        {
          uuid: 'c',
          name: 'Product C',
          type: 'Accommodation',
          options,
        },
      ];

      const selected = offerAccommodationProductPrerequisitesSelector.resultFunc(
        prerequisitesFixture,
        accommodationProductsFixture
      );

      expect(selected).toMatchObject([
        {
          label: 'Product A',
          value: false,
        },
        {
          label: 'Product B',
          value: true,
        },
        {
          label: 'Product C',
          value: false,
        },
      ]);
    });

    it('returns a label for accommodation products (some selected)', () => {
      const prerequisitesFixture = ['b', 'c'];
      const selected = offerAccommodationProductPrerequisitesLabelSelector.resultFunc(prerequisitesFixture, false);
      expect(selected).toEqual('2 Accommodation Products');
    });

    it('returns a label for accommodation products (all selected)', () => {
      const prerequisitesFixture = ['a', 'b', 'c'];
      const options = {} as IAccommodationProductForHotelItem['options'];
      const accommodationProductsFixture: IAccommodationProductForHotelItem[] = [
        {
          uuid: 'a',
          name: 'Product A',
          type: 'Accommodation',
          options,
        },
        {
          uuid: 'b',
          name: 'Product B',
          type: 'Accommodation',
          options,
        },
        {
          uuid: 'c',
          name: 'Product C',
          type: 'Accommodation',
          options,
        },
      ];

      const selected = offerAccommodationProductPrerequisitesLabelSelector.resultFunc(prerequisitesFixture, true);

      expect(selected).toEqual('Any Accommodation Products');
    });

    it('returns a label for accommodation products (none selected)', () => {
      const prerequisitesFixture = [];
      const options = {} as IAccommodationProductForHotelItem['options'];

      const accommodationProductsFixture: IAccommodationProductForHotelItem[] = [
        {
          uuid: 'a',
          name: 'Product A',
          type: 'Accommodation',
          options,
        },
        {
          uuid: 'b',
          name: 'Product B',
          type: 'Accommodation',
          options,
        },
        {
          uuid: 'c',
          name: 'Product C',
          type: 'Accommodation',
          options,
        },
      ];

      const selected = offerAccommodationProductPrerequisitesLabelSelector.resultFunc(prerequisitesFixture, true);

      expect(selected).toEqual('Any Accommodation Products');
    });
  });

  describe('offer advance selector', () => {
    it('select advance prerequisite (return stub if not present)', () => {
      const prerequisitesFixture = {
        ...initialState.offer.prerequisites,
      } as IOfferPrerequisites;

      const selected = offerAdvancePrerequisiteSelector.resultFunc(prerequisitesFixture);

      expect(selected).toEqual({ bookBy: '', maximum: '', minimum: '' });
    });

    it('select advance prerequisite (return with data)', () => {
      const prerequisitesFixture = {
        ...initialState.offer.prerequisites,
        advance: {
          bookBy: '2020-01-01',
        },
      } as IOfferPrerequisites;

      const selected = offerAdvancePrerequisiteSelector.resultFunc(prerequisitesFixture);

      expect(selected).toMatchObject({
        bookBy: '2020-01-01',
      });
    });
  });

  describe('offer max lodgings selector', () => {
    it('returns an empty string when undefined', () => {
      const prerequisitesFixture = {
        ...initialState.offer.prerequisites,
      } as IOfferPrerequisites;

      const selected = offerMaxLodgingsPrerequisiteSelector.resultFunc(prerequisitesFixture);

      expect(selected).toEqual('');
    });

    it('returns max lodgings (when set)', () => {
      const prerequisitesFixture = {
        ...initialState.offer.prerequisites,
        maximumLodgingsInBooking: 5,
      } as IOfferPrerequisites;

      const selected = offerMaxLodgingsPrerequisiteSelector.resultFunc(prerequisitesFixture);

      expect(selected).toEqual(5);
    });
  });

  describe('offer stay length selector', () => {
    it('select stay length prerequisite (return undefined if not present)', () => {
      const prerequisitesFixture = {
        ...initialState.offer.prerequisites,
      } as IOfferPrerequisites;

      const selected = offerStayLengthPrerequisiteSelector.resultFunc(prerequisitesFixture);

      expect(selected).toMatchObject({ maximum: '', minimum: '', strictMinMaxStay: false });
    });

    it('select advance prerequisite (return with data)', () => {
      const prerequisitesFixture = {
        ...initialState.offer.prerequisites,
        stayLength: {
          minimum: 4,
          maximum: 9,
          strictMinMaxStay: true,
        },
      } as IOfferPrerequisites;

      const selected = offerStayLengthPrerequisiteSelector.resultFunc(prerequisitesFixture);

      expect(selected).toMatchObject({
        minimum: 4,
        maximum: 9,
        strictMinMaxStay: true,
      });
    });
  });

  describe('hotelNameSelector', () => {
    it('select the hotel name', () => {
      const fixture = { hotel: { name: 'TEST NAME' } } as IOfferUI;
      expect(hotelNameSelector.resultFunc(fixture)).toEqual('TEST NAME');
    });
  });

  describe('select stepping', () => {
    it('should select stepping when all set', () => {
      const fixture = {
        ...initialState.offer,
        stepping: {
          everyXNights: 3,
          applyTo: 5,
          maximumNights: 7,
          discountCheapest: true,
        },
      } as IOfferUI;

      const selected = offerSteppingApplicationSelector.resultFunc(fixture);

      expect(selected).toMatchObject({
        everyXNights: 3,
        applyTo: 5,
        maximumNights: 7,
        discountCheapest: true,
      });
    });

    it('should select stepping (any values that are undefined are returned as strings)', () => {
      const fixture = {
        ...initialState.offer,
        stepping: {
          everyXNights: undefined,
          applyTo: 5,
          maximumNights: undefined,
          discountCheapest: true,
        },
      } as IOfferUI;

      const selected = offerSteppingApplicationSelector.resultFunc(fixture);

      expect(selected).toMatchObject({
        everyXNights: '',
        applyTo: 5,
        maximumNights: '',
        discountCheapest: true,
      });
    });

    it('should select stepping (values not set are not returned)', () => {
      const fixture = {
        ...initialState.offer,
        stepping: {
          applyTo: 5,
          discountCheapest: true,
        },
      } as IOfferUI;

      const selected = offerSteppingApplicationSelector.resultFunc(fixture);

      expect(selected).toMatchObject({
        applyTo: 5,
        discountCheapest: true,
      });
    });

    it('should select stepping (return undefined if not set)', () => {
      const fixture = {
        ...initialState.offer,
      } as IOfferUI;

      const selected = offerSteppingApplicationSelector.resultFunc(fixture);

      expect(selected).toEqual(undefined);
    });
  });

  describe('select accommodation discount', () => {
    it('select accommodation discount (return undefined if not present)', () => {
      const fixture = {
        ...initialState.offer,
      } as IOfferUI;

      const selected = offerAccommodationDiscountSelector.resultFunc(fixture);

      expect(selected).toEqual(undefined);
    });

    it('select accommodation discount (return with data)', () => {
      const fixture = {
        ...initialState.offer,
        accommodationProductDiscount: {
          discountPercentage: 10,
          greenTaxDiscountApproach: 'A',
        },
      } as IOfferUI;

      const selected = offerAccommodationDiscountSelector.resultFunc(fixture);

      expect(selected).toMatchObject({
        discountPercentage: 10,
        greenTaxDiscountApproach: 'A',
      });
    });
  });

  describe('select sub product discounts', () => {
    it('gets undefined if none are set', () => {
      const fixture = {
        ...initialState.offer,
      } as IOfferUI;

      const selected = offerSubProductDiscountsSelector.resultFunc(fixture);

      expect(selected).toEqual({});
    });

    it('gets the object if some are set', () => {
      const fixture = {
        ...initialState.offer,
        subProductDiscounts: {
          'Meal Plan': [],
          Supplement: [],
        },
      } as IOfferUI;

      const selected = offerSubProductDiscountsSelector.resultFunc(fixture);

      expect(selected).toMatchObject({
        'Meal Plan': [],
        Supplement: [],
      });
    });
  });

  describe('select sub product discount supplements', () => {
    it('gets an empty array if none are set', () => {
      const fixture = {};

      const selected = offersubProductDiscountsSupplementsSelector.resultFunc(fixture);

      expect(selected).toMatchObject([]);
    });

    it('gets an array of discounts if set', () => {
      const fixture = {
        'Meal Plan': [],
        Supplement: [
          {
            uuid: 'AA',
            products: [{ uuid: 'A', ageNames: [] }],
          },
          {
            uuid: 'BB',
            products: [{ uuid: 'B', ageNames: [] }],
          },
        ],
      } as IOfferSubProductDiscounts<IUIOfferProductDiscountInstance>;

      const selected = offersubProductDiscountsSupplementsSelector.resultFunc(fixture);

      expect(selected).toMatchObject([
        {
          uuid: 'AA',
          products: [{ uuid: 'A', ageNames: [] }],
        },
        {
          uuid: 'BB',
          products: [{ uuid: 'B', ageNames: [] }],
        },
      ]);
    });

    it('gets an array of discounts if set, respects set indexes', () => {
      const fixture = {
        'Meal Plan': [],
        Supplement: [
          {
            uuid: '4',
            products: [{ uuid: 'A', ageNames: [] }],
          },
          {
            uuid: '6',
            products: [{ uuid: 'B', ageNames: [] }],
          },
        ],
      } as IOfferSubProductDiscounts<IUIOfferProductDiscountInstance>;

      const selected = offersubProductDiscountsSupplementsSelector.resultFunc(fixture);

      expect(selected).toMatchObject([
        {
          uuid: '4',
          products: [{ uuid: 'A', ageNames: [] }],
        },
        {
          uuid: '6',
          products: [{ uuid: 'B', ageNames: [] }],
        },
      ]);
    });
  });

  describe('select extra person supplement supplements', () => {
    it('returns an empty array when we have supplements, but none are extra person', () => {
      const supplementFixture = [
        {
          uuid: '0',
          ageNames: [],
          products: [{ uuid: 'A', ageNames: [] }],
        },
        {
          uuid: '1',
          ageNames: [],
          products: [{ uuid: 'B', ageNames: [] }],
        },
      ] as IUIOfferProductDiscountInstance[];

      const epsFixture = {
        uuid: 'C',
        name: 'EPS',
      } as IBootstrapExtraPersonSupplementProduct;

      const selected = offerExtraPersonSupplementsSelector.resultFunc(supplementFixture, epsFixture);

      expect(selected).toEqual([]);
    });

    it('returns 1 or more EPS supplements with correct index', () => {
      const supplementFixture = [
        {
          uuid: '0',
          products: [{ uuid: 'A', ageNames: [] }],
        },
        {
          uuid: '1',
          products: [{ uuid: 'EPS', ageNames: [] }],
        },
        {
          uuid: '2',
          products: [{ uuid: 'C', ageNames: [] }],
        },
        {
          uuid: '3',
          products: [{ uuid: 'EPS', ageNames: [] }],
        },
      ] as IUIOfferProductDiscountInstance[];

      const epsFixture = {
        uuid: 'EPS',
        name: 'EPS',
      } as IBootstrapExtraPersonSupplementProduct;

      const selected = offerExtraPersonSupplementsSelector.resultFunc(supplementFixture, epsFixture);

      expect(selected).toMatchObject([
        {
          uuid: '1',
          products: [{ uuid: 'EPS', ageNames: [] }],
        },
        {
          uuid: '3',
          products: [{ uuid: 'EPS', ageNames: [] }],
        },
      ]);
    });
  });

  describe('offerTaCountriesPrerequisiteByRegionSelector', () => {
    it('returns a map of regions with a total string and a countries array', () => {
      const input: ITACountry[] = [
        {
          label: 'Country A',
          region: 'Region A',
          value: true,
          code: 'CA',
        },
        {
          label: 'Country B',
          region: 'Region B',
          value: false,
          code: 'CB',
        },
      ];

      const expected: ITaCountriesUiData = {
        'Region A': {
          total: '1 Country',
          countries: [{ ...input[0] }],
        },
        'Region B': {
          total: '0 Countries',
          countries: [{ ...input[1] }],
        },
      };
      const result = offerTaCountriesPrerequisiteByRegionSelector.resultFunc(input);
      expect(result).toMatchObject(expected);
    });
  });

  describe('select product discount fines', () => {
    it('gets an empty array if none are set', () => {
      const fixture = {};

      const selected = offerProductDiscountsFinesSelector.resultFunc(fixture, mockAvailableProducts);

      expect(selected).toMatchObject([]);
    });

    it('gets an array of discounts if set', () => {
      const fixture = {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
          {
            uuid: '0',
            products: [{ uuid: 'A', ageNames: [] }],
          },
          {
            uuid: '1',
            products: [{ uuid: 'B', ageNames: [] }],
          },
        ],
      } as IOfferProductDiscounts<IUIOfferProductDiscountInstance>;

      const selected = offerProductDiscountsFinesSelector.resultFunc(fixture, mockAvailableProducts);

      expect(selected).toMatchObject([
        {
          uuid: '0',
          products: [{ uuid: 'A', ageNames: [] }],
        },
        {
          uuid: '1',
          products: [{ uuid: 'B', ageNames: [] }],
        },
      ]);
    });

    it('gets an array of discounts if set, respects set indexes', () => {
      const fixture = {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
          {
            uuid: '4',
            products: [{ uuid: 'A', ageNames: [] }],
          },
          {
            uuid: '6',
            products: [{ uuid: 'B', ageNames: [] }],
          },
        ],
      } as IOfferProductDiscounts<IUIOfferProductDiscountInstance>;

      const selected = offerProductDiscountsFinesSelector.resultFunc(fixture, mockAvailableProducts);

      expect(selected).toMatchObject([
        {
          uuid: '4',
          products: [{ uuid: 'A', ageNames: [] }],
        },
        {
          uuid: '6',
          products: [{ uuid: 'B', ageNames: [] }],
        },
      ]);
    });
  });

  describe('select product discounts', () => {
    it('gets undefined if none are set', () => {
      const fixture = {
        ...initialState.offer,
      } as IOfferUI;

      const selected = offerProductDiscountsSelector.resultFunc(fixture);

      expect(selected).toEqual({});
    });

    it('gets the object if some are set', () => {
      const fixture = {
        ...initialState.offer,
        productDiscounts: {
          'Ground Service': [],
          Supplement: [],
        },
      } as IOfferUI;

      const selected = offerProductDiscountsSelector.resultFunc(fixture);

      expect(selected).toMatchObject({
        'Ground Service': [],
        Supplement: [],
      });
    });
  });

  describe('select sub product discount meal plans', () => {
    it('gets an empty array if none are set', () => {
      const fixture = {};

      const selected = offersubProductDiscountsMealPlansSelector.resultFunc(fixture, mockAvailableProducts);

      expect(selected).toMatchObject([]);
    });

    it('gets an array of discounts if set', () => {
      const fixture = {
        'Meal Plan': [
          {
            uuid: '0',
            products: [{ uuid: 'A', ageNames: [] }],
          },
          {
            uuid: '1',
            products: [{ uuid: 'B', ageNames: [] }],
          },
        ],
      } as IOfferSubProductDiscounts<IUIOfferProductDiscountInstance>;

      const selected = offersubProductDiscountsMealPlansSelector.resultFunc(fixture, mockAvailableProducts);

      expect(selected).toMatchObject([
        {
          uuid: '0',
          products: [{ uuid: 'A', ageNames: [] }],
        },
        {
          uuid: '1',
          products: [{ uuid: 'B', ageNames: [] }],
        },
      ]);
    });

    it('gets an array of discounts if set, respects set indexes', () => {
      const fixture = {
        'Meal Plan': [
          {
            uuid: '4',
            products: [{ uuid: 'A', ageNames: [] }],
          },
          {
            uuid: '6',
            products: [{ uuid: 'B', ageNames: [] }],
          },
        ],
      } as IOfferSubProductDiscounts<IUIOfferProductDiscountInstance>;

      const selected = offersubProductDiscountsMealPlansSelector.resultFunc(fixture, mockAvailableProducts);

      expect(selected).toMatchObject([
        {
          uuid: '4',
          products: [{ uuid: 'A', ageNames: [] }],
        },
        {
          uuid: '6',
          products: [{ uuid: 'B', ageNames: [] }],
        },
      ]);
    });
  });

  describe('select product discount ground services', () => {
    it('gets an empty array if none are set', () => {
      const fixture = {};

      const selected = offerProductDiscountsGroundServicesSelector.resultFunc(fixture, mockAvailableProducts);

      expect(selected).toMatchObject([]);
    });

    it('gets an array of discounts if set', () => {
      const fixture = {
        'Ground Service': [
          {
            uuid: '0',
            products: [{ uuid: 'A', ageNames: [] }],
          },
          {
            uuid: '1',
            products: [{ uuid: 'B', ageNames: [] }],
          },
        ],
      } as IOfferProductDiscounts<IUIOfferProductDiscountInstance>;

      const selected = offerProductDiscountsGroundServicesSelector.resultFunc(fixture, mockAvailableProducts);

      expect(selected).toMatchObject([
        {
          uuid: '0',
          products: [{ uuid: 'A', ageNames: [] }],
        },
        {
          uuid: '1',
          products: [{ uuid: 'B', ageNames: [] }],
        },
      ]);
    });

    it('gets an array of discounts if set, respects set indexes', () => {
      const fixture = {
        'Ground Service': [
          {
            uuid: '4',
            products: [{ uuid: 'A', ageNames: [] }],
          },
          {
            uuid: '6',
            products: [{ uuid: 'B', ageNames: [] }],
          },
        ],
      } as IOfferProductDiscounts<IUIOfferProductDiscountInstance>;

      const selected = offerProductDiscountsGroundServicesSelector.resultFunc(fixture, mockAvailableProducts);

      expect(selected).toMatchObject([
        {
          uuid: '4',
          products: [{ uuid: 'A', ageNames: [] }],
        },
        {
          uuid: '6',
          products: [{ uuid: 'B', ageNames: [] }],
        },
      ]);
    });
  });

  describe('select product discount transfers', () => {
    it('gets an empty array if none are set', () => {
      const fixture = {};

      const selected = offerProductDiscountsTransfersSelector.resultFunc(fixture, mockAvailableProducts);

      expect(selected).toMatchObject([]);
    });

    it('gets an array of discounts if set', () => {
      const fixture = {
        Transfer: [
          {
            uuid: '0',
            products: [{ uuid: 'A', ageNames: [] }],
          },
          {
            uuid: '1',
            products: [{ uuid: 'B', ageNames: [] }],
          },
        ],
      } as IOfferProductDiscounts<IUIOfferProductDiscountInstance>;

      const selected = offerProductDiscountsTransfersSelector.resultFunc(fixture, mockAvailableProducts);

      expect(selected).toMatchObject([
        {
          uuid: '0',
          products: [{ uuid: 'A', ageNames: [] }],
        },
        {
          uuid: '1',
          products: [{ uuid: 'B', ageNames: [] }],
        },
      ]);
    });

    it('gets an array of discounts if set, respects set indexes', () => {
      const fixture = {
        Transfer: [
          {
            uuid: '4',
            products: [{ uuid: 'A', ageNames: [] }],
          },
          {
            uuid: '6',
            products: [{ uuid: 'B', ageNames: [] }],
          },
        ],
      } as IOfferProductDiscounts<IUIOfferProductDiscountInstance>;

      const selected = offerProductDiscountsTransfersSelector.resultFunc(fixture, mockAvailableProducts);

      expect(selected).toMatchObject([
        {
          uuid: '4',
          products: [{ uuid: 'A', ageNames: [] }],
        },
        {
          uuid: '6',
          products: [{ uuid: 'B', ageNames: [] }],
        },
      ]);
    });
  });

  describe('select product discount supplements', () => {
    it('gets an empty array if none are set', () => {
      const fixture = {};

      const selected = offerProductDiscountsSupplementsSelector.resultFunc(fixture, mockAvailableProducts);

      expect(selected).toMatchObject([]);
    });

    it('gets an array of discounts if set', () => {
      const fixture = {
        Supplement: [
          {
            uuid: '0',
            products: [{ uuid: 'A', ageNames: [] }],
          },
          {
            uuid: '1',
            products: [{ uuid: 'B', ageNames: [] }],
          },
        ],
      } as IOfferProductDiscounts<IUIOfferProductDiscountInstance>;

      const selected = offerProductDiscountsSupplementsSelector.resultFunc(fixture, mockAvailableProducts);

      expect(selected).toMatchObject([
        {
          uuid: '0',
          products: [{ uuid: 'A', ageNames: [] }],
        },
        {
          uuid: '1',
          products: [{ uuid: 'B', ageNames: [] }],
        },
      ]);
    });

    it('gets an array of discounts if set, respects set indexes', () => {
      const fixture = {
        Supplement: [
          {
            uuid: '4',
            products: [{ uuid: 'A', ageNames: [] }],
          },
          {
            uuid: '6',
            products: [{ uuid: 'B', ageNames: [] }],
          },
        ],
      } as IOfferProductDiscounts<IUIOfferProductDiscountInstance>;

      const selected = offerProductDiscountsSupplementsSelector.resultFunc(fixture, mockAvailableProducts);

      expect(selected).toMatchObject([
        {
          uuid: '4',
          products: [{ uuid: 'A', ageNames: [] }],
        },
        {
          uuid: '6',
          products: [{ uuid: 'B', ageNames: [] }],
        },
      ]);
    });
  });
});
