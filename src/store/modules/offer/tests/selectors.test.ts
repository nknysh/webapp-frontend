import {
  getOfferRequestIsPendingSelector,
  offerErrorSelector,
  offerSelector,
  offerHotelUuidSelector,
  offerNameSelector,
  offerTermsSelector,
  offerFurtherInformationSelector,
  offerStayBetweenPrerequisitesSelector,
  offerBooleanPrerequisitesSelector,
} from '../selectors';
import { initialState } from '../model';

describe('Offer Selectors', () => {
  describe('getOfferRequestPendingSelector', () => {
    it('Selects correctly', () => {
      expect(getOfferRequestIsPendingSelector.resultFunc(initialState)).toEqual(true);
    });
  });

  describe('offerErrorSelector', () => {
    it('Selects correctly', () => {
      expect(offerErrorSelector.resultFunc(initialState)).toEqual(null);
    });
  });

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
      const fixtureOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          dates: [
            {
              startDate: '2020-01-01',
              endDate: '2020-01-05',
            },
          ],
        },
      };

      const selected = offerStayBetweenPrerequisitesSelector.resultFunc(fixtureOffer);

      expect(selected).toMatchObject([['2020-01-01', '2020-01-02', '2020-01-03', '2020-01-04', '2020-01-05']]);
    });

    it('handles multiple date prerequisites', () => {
      const fixtureOffer = {
        ...initialState.offer,
        prerequisites: {
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
          ],
        },
      };

      const selected = offerStayBetweenPrerequisitesSelector.resultFunc(fixtureOffer);

      expect(selected).toMatchObject([
        ['2020-01-01', '2020-01-02', '2020-01-03', '2020-01-04', '2020-01-05'],
        ['2020-05-01', '2020-05-02', '2020-05-03'],
      ]);
    });
  });

  describe('offer boolean prerequisites selector', () => {
    it('returns when no payloads are set', () => {
      const fixtureOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
        },
      };

      const selected = offerBooleanPrerequisitesSelector.resultFunc(fixtureOffer);

      expect(selected).toMatchObject({
        anniversary: null,
        birthday: null,
        honeymoon: null,
        repeatCustomer: null,
        wedding: null,
      });
    });

    it('returns when some are not set and some are true and false', () => {
      const fixtureOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          payload: {
            anniversary: true,
            wedding: false,
          },
        },
      };

      const selected = offerBooleanPrerequisitesSelector.resultFunc(fixtureOffer);

      expect(selected).toMatchObject({
        anniversary: true,
        birthday: null,
        honeymoon: null,
        repeatCustomer: null,
        wedding: false,
      });
    });

    it('returns when all are set to true', () => {
      const fixtureOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          payload: {
            anniversary: true,
            birthday: true,
            honeymoon: true,
            repeatCustomer: true,
            wedding: true,
          },
        },
      };

      const selected = offerBooleanPrerequisitesSelector.resultFunc(fixtureOffer);

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
