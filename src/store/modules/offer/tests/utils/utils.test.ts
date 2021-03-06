import {
  getAllAssociatedProductUuidsFromOffer,
  hasOfferGotApplications,
  returnObjectWithUndefinedsAsEmptyStrings,
  transformApiOfferToUiOffer,
  transformUiOfferToApiOffer,
  getOrderedOffers,
  toOrderedOffer,
  toggleAgeNameOnProductDiscountProduct,
} from '../../utils';
import { initialState, IOfferUiState, ECombinationMode } from '../../model';
import { IOfferAPI, IOfferUI, IUIOfferProductDiscountInstance, IOfferProductDiscounts, IDiscountProduct } from 'services/BackendApi';
import { IMealPlanProductOptions, IProduct } from 'services/BackendApi/types/HotelResponse';
import { mockOffersOrderingData } from '../mock';
import { subProductDiscounts } from '../../../../../services/BackendApi/types/OffersSearchResponse';
import { offerToggleAgeNameOnSubProductAction } from '../../actions';

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

    it('it has no productDiscounts applications', () => {
      const fixture = {
        ...initialState.offer,
        productDiscounts: {},
      } as IOfferUI;

      expect(hasOfferGotApplications(fixture)).toEqual(false);
    });

    it('it has productDiscounts, which is an application', () => {
      const fixture = {
        ...initialState.offer,
        productDiscounts: {
          Transfer: [],
        },
      } as IOfferUI;

      expect(hasOfferGotApplications(fixture)).toEqual(true);
    });

    it('it has no subProductDiscounts applications', () => {
      const fixture = {
        ...initialState.offer,
        subProductDiscounts: {},
      } as IOfferUI;

      expect(hasOfferGotApplications(fixture)).toEqual(false);
    });

    it('it has subProductDiscounts, which is an application', () => {
      const fixture = {
        ...initialState.offer,
        subProductDiscounts: {
          Supplement: [],
        },
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
    it('Converts "default" age names to "Adult"', () => {
      const inputDiscounts = {
        ...initialState.offer.productDiscounts,
        Transfer: [
          {
            discountPercentage: null,
            greenTaxDiscountApproach: undefined,
            maximumQuantity: null,
            products: [{ ageNames: ['default'] }],
          },
        ],
      } as IOfferProductDiscounts<any>;

      const outputDiscounts = {
        ...initialState.offer.productDiscounts,
        Transfer: [
          {
            products: [{ ageNames: ['Adult'] }],
          },
        ],
      } as IOfferProductDiscounts<any>;

      const fixture: IOfferAPI = {
        ...initialState.offer,
        combines: true,
        productDiscounts: inputDiscounts,
      };

      const transformed = transformApiOfferToUiOffer(fixture);
      // @ts-ignore
      expect(transformed.productDiscounts.Transfer[0].products).toEqual(outputDiscounts.Transfer[0].products);
    });

    test('adds uuids to sub product discount supplements', () => {
      const fixture: IOfferAPI = {
        ...initialState.offer,
        combines: true,
        subProductDiscounts: {
          'Meal Plan': [
            {
              products: [{ uuid: 'B', ageNames: [] }],
            },
          ],
          Supplement: [
            {
              products: [{ uuid: 'A', ageNames: [] }],
            },
          ],
        },
      };

      const transformed = transformApiOfferToUiOffer(fixture);
      expect(typeof transformed.subProductDiscounts?.['Meal Plan']![0]!.products[0].uuid).toBe('string');
      expect(typeof transformed.subProductDiscounts?.Supplement![0]!.products[0].uuid).toBe('string');
    });

    it('adds UUIDS to product discount supplements', () => {
      const fixture: IOfferAPI = {
        ...initialState.offer,
        combines: true,
        productDiscounts: {
          Transfer: [
            {
              products: [{ uuid: 'A', ageNames: [] }],
            },
          ],
          Supplement: [
            {
              products: [{ uuid: 'B', ageNames: [] }],
            },
          ],
          Fine: [
            {
              products: [{ uuid: 'C', ageNames: [] }],
            },
          ],
          'Ground Service': [
            {
              products: [{ uuid: 'C', ageNames: [] }],
            },
          ],
        },
      };

      const transformed = transformApiOfferToUiOffer(fixture);

      expect(typeof transformed.productDiscounts?.Transfer![0]!.products[0].uuid).toBe('string');
      expect(typeof transformed.productDiscounts?.Supplement![0]!.products[0].uuid).toBe('string');
      expect(typeof transformed.productDiscounts?.Fine![0]!.products[0].uuid).toBe('string');
      expect(typeof transformed.productDiscounts?.['Ground Service']![0]!.products[0].uuid).toBe('string');
    });
  });

  describe('transformUiOfferToApiOffer', () => {
    it('Converts "Adult" age names to "default"', () => {
      const inputDiscounts = {
        ...initialState.offer.productDiscounts,
        Transfer: [
          {
            products: [{ ageNames: ['Adult'] }],
          },
        ],
      } as IOfferProductDiscounts<any>;

      const outputDiscounts = {
        ...initialState.offer.productDiscounts,
        Transfer: [
          {
            discountPercentage: null,
            greenTaxDiscountApproach: undefined,
            maximumQuantity: null,
            products: [{ ageNames: ['default'] }],
          },
        ],
      } as IOfferProductDiscounts<any>;

      const fixture: IOfferAPI = {
        ...initialState.offer,
        productDiscounts: inputDiscounts,
        combines: true,
        furtherInformation: '',
      };

      const uiFixture: IOfferUiState = {
        ...initialState.uiState,
        combinationMode: ECombinationMode.COMBINES_WITH_ANY,
      };

      const transformed = transformUiOfferToApiOffer(fixture as IOfferUI, uiFixture);

      expect(transformed.productDiscounts).toEqual(outputDiscounts);
    });

    it('Converts furtherInformation to null if given an empty string', () => {
      const fixture: IOfferAPI = {
        ...initialState.offer,
        combines: true,
        furtherInformation: '',
      };

      const uiFixture: IOfferUiState = {
        ...initialState.uiState,
        combinationMode: ECombinationMode.COMBINES_WITH_ANY,
      };

      const transformed = transformUiOfferToApiOffer(fixture as IOfferUI, uiFixture);

      expect(transformed.furtherInformation).toBeUndefined();
    });

    it('ui combination mode COMBINES WITH ANY', () => {
      const fixture: IOfferUI = {
        ...initialState.offer,
      };

      const uiFixture: IOfferUiState = {
        ...initialState.uiState,
        combinationMode: ECombinationMode.COMBINES_WITH_ANY,
      };

      const transformed = transformUiOfferToApiOffer(fixture, uiFixture);

      expect(transformed.combines).toEqual(true);
      expect(transformed.combinesWith).toBeUndefined();
      expect(transformed.cannotCombineWith).toBeUndefined();
    });

    it('ui combination mode COMBINES WITH LIST', () => {
      const fixture: IOfferUI = {
        ...initialState.offer,
      };

      const uiFixture: IOfferUiState = {
        ...initialState.uiState,
        combinationMode: ECombinationMode.COMBINES_WITH_LIST,
        combinationOfferUuids: ['a'],
      };

      const transformed = transformUiOfferToApiOffer(fixture, uiFixture);

      expect(transformed.combines).toEqual(true);
      expect(transformed.cannotCombineWith).toBeUndefined();
      expect(transformed.combinesWith).toMatchObject(['a']);
    });

    it('ui combination mode CANNOT_COMBINE_WITH_LIST', () => {
      const fixture: IOfferUI = {
        ...initialState.offer,
      };

      const uiFixture: IOfferUiState = {
        ...initialState.uiState,
        combinationMode: ECombinationMode.CANNOT_COMBINE_WITH_LIST,
        combinationOfferUuids: ['a'],
      };

      const transformed = transformUiOfferToApiOffer(fixture, uiFixture);

      expect(transformed.combines).toEqual(true);
      expect(transformed.combinesWith).toBeUndefined();
      expect(transformed.cannotCombineWith).toMatchObject(['a']);
    });

    it('ui combination mode COMBINES_WITH_NONE', () => {
      const fixture: IOfferUI = {
        ...initialState.offer,
      };

      const uiFixture: IOfferUiState = {
        ...initialState.uiState,
        combinationMode: ECombinationMode.COMBINES_WITH_NONE,
        combinationOfferUuids: [],
      };

      const transformed = transformUiOfferToApiOffer(fixture, uiFixture);

      expect(transformed.combines).toEqual(false);
      expect(transformed.cannotCombineWith).toBeUndefined();
      expect(transformed.combinesWith).toBeUndefined();
    });
  });
});

describe('getOrderedOffers', () => {
  it('orders offers on hotel correctly', () => {
    const { basic } = mockOffersOrderingData;
    expect(getOrderedOffers(basic.offersOnHotel)).toMatchObject(basic.orderedOffers);
  });
});

describe('toOrderedOffer', () => {
  it('transforms offer properly', () => {
    const input = { uuid: 'a-a', name: 'a', order: 0 };
    const output = { uuid: 'a-a', name: 'a' };

    expect(toOrderedOffer(input)).toMatchObject(output);
  });
});

describe('toggleAgeNameOnProductDiscountProduct', () => {
  it('Handles products with no ageNames property', () => {
    const aciton = offerToggleAgeNameOnSubProductAction("Meal Plan", 'DISCOUNT_ID', 'PRODUCT_ID', 'child');
    const state: IOfferUI['subProductDiscounts'] = {
      'Meal Plan': [{
        uuid: 'DISCOUNT_ID',
        products: [
          {
            uuid: 'PRODUCT_ID',
          } as IDiscountProduct
        ]
      }
      ]
    };

    const expected: IOfferUI['subProductDiscounts'] = {
      'Meal Plan': [{
        uuid: 'DISCOUNT_ID',
        products: [
          {
            uuid: 'PRODUCT_ID',
            ageNames: ['child'],
          } as IDiscountProduct
        ]
      }
      ]
    };
    const result = toggleAgeNameOnProductDiscountProduct(state, aciton);
    expect(result).toMatchObject(expected);
  });

  it('returns the input if the product ID doesn\'t exist', () => {
    const aciton = offerToggleAgeNameOnSubProductAction("Meal Plan", 'DISCOUNT_ID', 'WRONG_PRODUCT_ID', 'child');
    const state: IOfferUI['subProductDiscounts'] = {
      'Meal Plan': [{
        uuid: 'DISCOUNT_ID',
        products: [
          {
            uuid: 'PRODUCT_ID',
          } as IDiscountProduct
        ]
      }
      ]
    };
    const result = toggleAgeNameOnProductDiscountProduct(state, aciton);
    expect(result).toEqual(state);
  });
})
