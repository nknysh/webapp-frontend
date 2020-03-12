import { IDateRange } from 'interfaces';
import { IOfferPrerequisitesPayload } from 'services/BackendApi';
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
} from '../selectors';
import { IBootstrapCountry } from 'store/modules/bootstrap/model';

import { initialState } from '../../../model';

describe('Offer Selectors', () => {
  describe('offerSelector', () => {
    it('Selects correctly', () => {
      expect(offerSelector.resultFunc(initialState)).toEqual({
        uuid: '',
        name: '',
        termsAndConditions: '',
        furtherInformation: '',
        hotelUuid: '',
        prerequisites: {
          dates: [],
          countryCodes: [],
        },
        preDiscount: false,
      });
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
          isDestination: true,
        },
        {
          code: 'B',
          name: 'Country B',
          isDestination: true,
        },
        {
          code: 'C',
          name: 'Country C',
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
          isDestination: true,
        },
        {
          code: 'B',
          name: 'Country B',
          isDestination: true,
        },
        {
          code: 'C',
          name: 'Country C',
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
          isDestination: true,
        },
        {
          code: 'B',
          name: 'Country B',
          isDestination: true,
        },
        {
          code: 'C',
          name: 'Country C',
          isDestination: true,
        },
      ];

      const selected = offerTaCountriesLabelPrerequisiteSelector.resultFunc(
        prerequisitesCountriesFixture,
        countriesFixture
      );

      expect(selected).toEqual('All Countries');
    });

    it('has the correct TA label for some countries selected', () => {
      const prerequisitesCountriesFixture = ['A', 'B'];

      const countriesFixture: IBootstrapCountry[] = [
        {
          code: 'A',
          name: 'Country A',
          isDestination: true,
        },
        {
          code: 'B',
          name: 'Country B',
          isDestination: true,
        },
        {
          code: 'C',
          name: 'Country C',
          isDestination: true,
        },
      ];

      const selected = offerTaCountriesLabelPrerequisiteSelector.resultFunc(
        prerequisitesCountriesFixture,
        countriesFixture
      );

      expect(selected).toEqual('2 Countries');
    });

    it('has the correct TA label for every country selected', () => {
      const prerequisitesCountriesFixture = ['A', 'B', 'C'];

      const countriesFixture: IBootstrapCountry[] = [
        {
          code: 'A',
          name: 'Country A',
          isDestination: true,
        },
        {
          code: 'B',
          name: 'Country B',
          isDestination: true,
        },
        {
          code: 'C',
          name: 'Country C',
          isDestination: true,
        },
      ];

      const selected = offerTaCountriesLabelPrerequisiteSelector.resultFunc(
        prerequisitesCountriesFixture,
        countriesFixture
      );

      expect(selected).toEqual('All Countries');
    });
  });
});
