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
} from '../selectors';

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
});
