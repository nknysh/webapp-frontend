import {
  getAllAssociatedProductUuidsFromOffer,
  hasOfferGotApplications,
  returnObjectWithUndefinedsAsEmptyStrings,
  transformApiOfferToUiOffer,
  transformUiOfferToApiOffer,
} from '../utils';
import { initialState } from '../model';
import { IOfferAPI, IOfferUI } from 'services/BackendApi';

describe('offer module utils test', () => {
  describe('getAllAssociatedProductUuidsFromOffer', () => {
    it('initial state offer will have no product', () => {
      const fixture = {
        ...initialState.offer,
      } as IOfferUI;

      const productArray = getAllAssociatedProductUuidsFromOffer(fixture);

      expect(productArray).toMatchObject([]);
    });

    it('pulls products from prerequisites and applications', () => {
      const fixture = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          accommodationProducts: ['1'],
        },
        subProductDiscounts: {
          'Meal Plan': [
            {
              products: [
                {
                  uuid: '2',
                },
              ],
            },
          ],
          Supplement: [
            {
              products: [
                {
                  uuid: '3',
                },
              ],
            },
          ],
        },
        productDiscounts: {
          Transfer: [
            {
              products: [
                {
                  uuid: '4',
                },
              ],
            },
          ],
          Fine: [
            {
              products: [
                {
                  uuid: '5',
                },
              ],
            },
          ],
          'Ground Service': [
            {
              products: [
                {
                  uuid: '6',
                },
              ],
            },
          ],
        },
      } as IOfferUI;

      const productArray = getAllAssociatedProductUuidsFromOffer(fixture);

      expect(productArray.includes('1')).toEqual(true);
      expect(productArray.includes('2')).toEqual(true);
      expect(productArray.includes('3')).toEqual(true);
      expect(productArray.includes('4')).toEqual(true);
      expect(productArray.includes('5')).toEqual(true);
      expect(productArray.includes('6')).toEqual(true);
    });
  });

  describe('hasOfferGotApplications', () => {
    it('it has no applications', () => {
      const fixture = {
        ...initialState.offer,
      } as IOfferUI;

      expect(hasOfferGotApplications(fixture)).toEqual(false);
    });

    it('it has stepping, which is an application', () => {
      const fixture = {
        ...initialState.offer,
        stepping: {},
      } as IOfferUI;

      expect(hasOfferGotApplications(fixture)).toEqual(true);
    });

    it('it has accommodationProductDiscount, which is an application', () => {
      const fixture = {
        ...initialState.offer,
        accommodationProductDiscount: {},
      } as IOfferUI;

      expect(hasOfferGotApplications(fixture)).toEqual(true);
    });

    it('it has productDiscounts, which is an application', () => {
      const fixture = {
        ...initialState.offer,
        productDiscounts: {},
      } as IOfferUI;

      expect(hasOfferGotApplications(fixture)).toEqual(true);
    });

    it('it has subProductDiscounts, which is an application', () => {
      const fixture = {
        ...initialState.offer,
        subProductDiscounts: {},
      } as IOfferUI;

      expect(hasOfferGotApplications(fixture)).toEqual(true);
    });
  });

  describe('returnObjectWithUndefinedsAsEmptyStrings', () => {
    it('will return undefined as undefined', () => {
      expect(returnObjectWithUndefinedsAsEmptyStrings(undefined)).toEqual(undefined);
    });

    it('returns undefined values as empty strings', () => {
      const fixture = {
        a: undefined,
        b: 5,
        c: 'TEST',
      };

      expect(returnObjectWithUndefinedsAsEmptyStrings(fixture)).toMatchObject({
        a: '',
        b: 5,
        c: 'TEST',
      });
    });

    it('returns undefined values as empty strings', () => {
      const fixture = {
        a: undefined,
        b: 5,
        c: undefined,
      };

      expect(returnObjectWithUndefinedsAsEmptyStrings(fixture)).toMatchObject({
        a: '',
        b: 5,
        c: '',
      });
    });

    it('returns undefined values as empty strings', () => {
      const fixture = {
        c: undefined,
      };

      expect(returnObjectWithUndefinedsAsEmptyStrings(fixture)).toMatchObject({
        c: '',
      });
    });
  });

  describe('transformApiOfferToUiOffer', () => {
    it('adds indexes to sub product discount supplements', () => {
      const fixture: IOfferAPI = {
        ...initialState.offer,
        subProductDiscounts: {
          'Meal Plan': [],
          Supplement: [
            {
              products: [{ uuid: 'A' }],
            },
          ],
        },
      };

      const transformed = transformApiOfferToUiOffer(fixture);

      expect(transformed).toMatchObject({
        ...initialState.offer,
        subProductDiscounts: {
          'Meal Plan': [],
          Supplement: [
            {
              index: 0,
              products: [{ uuid: 'A' }],
            },
          ],
        },
      });
    });
  });

  describe('transformUiOfferToApiOffer', () => {
    it('adds indexes to sub product discount supplements', () => {
      const fixture: IOfferUI = {
        ...initialState.offer,
        subProductDiscounts: {
          'Meal Plan': [],
          Supplement: [
            {
              index: 0,
              products: [{ uuid: 'A' }],
            },
            {
              index: 1,
              products: [{ uuid: 'B' }],
            },
          ],
        },
      };

      const transformed = transformUiOfferToApiOffer(fixture);

      expect(transformed).toMatchObject({
        ...initialState.offer,
        subProductDiscounts: {
          'Meal Plan': [],
          Supplement: [
            {
              products: [{ uuid: 'A' }],
            },
            {
              products: [{ uuid: 'B' }],
            },
          ],
        },
      });
    });
  });
});
