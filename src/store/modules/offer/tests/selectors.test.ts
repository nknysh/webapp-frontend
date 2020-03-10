import {
  getOfferRequestIsPendingSelector,
  offerErrorSelector,
  offerSelector,
  offerHotelUuidSelector,
  offerNameSelector,
  offerTermsSelector,
  offerFurtherInformationSelector,
  offerStayBetweenPrerequisitesSelector,
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
});
