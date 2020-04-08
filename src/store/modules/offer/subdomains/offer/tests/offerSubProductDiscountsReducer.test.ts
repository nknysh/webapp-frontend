import { IDateRange } from 'interfaces';
import { IOfferUI } from 'services/BackendApi';
import { initialState, IOfferModel } from '../../../model';
import { offerReducer as reducer } from '../reducer';
import { getOfferSuccessAction } from '../../../actions';
import { IOfferPrerequisites, IDiscountProduct } from '../../../../../../services/BackendApi/types/OfferResponse';
import {
  offerAddSubProductDiscountAction,
  offerAddProductToSubProductDiscountAction,
  offerRemoveSubProductDiscountAction,
  offerRemoveProductFromSubProductDiscountAction,
  offerUpdateSubProductDiscountAction,
  offerToggleSubProductDiscountAgeNameAction,
} from '../actions';
import { Supplement } from '../../../../../../services/BackendApi/types/OffersSearchResponse';

const mockProduct: IDiscountProduct = { uuid: 'XXX' };

describe('offer reducer sub product supplements', () => {
  it('adds a new product discount to the array (object is completely empty)', () => {
    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {},
    };

    // Expect
    // {
    //   ...initialState.offer,
    //   subProductDiscounts: {
    //     Supplement: [
    //       {
    //         uuid: 'TEST_UUID',
    //         products: [],
    //       },
    //     ],
    //   },
    // };

    const action = offerAddSubProductDiscountAction('Supplement');
    const newState = reducer(testState, action);
    expect(newState.subProductDiscounts.Supplement![0]).toHaveProperty('uuid');
    expect(newState.subProductDiscounts.Supplement![0]).toHaveProperty('products');
    expect(typeof newState.subProductDiscounts.Supplement![0].uuid).toBe('string');
    expect(newState.subProductDiscounts.Supplement![0].products).toBeInstanceOf(Array);
  });

  it('adds a new product discount to the array (object already has empty array of Supplements)', () => {
    const action = offerAddSubProductDiscountAction('Supplement');

    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [],
      },
    };

    // Expect
    //{
    //   ...initialState.offer,
    //   subProductDiscounts: {
    //     Transfer: [],
    //     'Ground Service': [],
    //     Supplement: [],
    //     Supplement: [
    //       {
    //         uuid: 'TEST_UUID',
    //         products: [],
    //       },
    //     ],
    //   },
    // };

    const newState = reducer(testState, action);
    expect(newState.subProductDiscounts.Supplement).not.toBe(undefined);
    expect(newState.subProductDiscounts.Supplement![0]).toHaveProperty('uuid');
    expect(newState.subProductDiscounts.Supplement![0]).toHaveProperty('products');
    expect(typeof newState.subProductDiscounts.Supplement![0].uuid).toBe('string');
    expect(newState.subProductDiscounts.Supplement![0].products).toBeInstanceOf(Array);
    expect(newState.subProductDiscounts['Meal Plan']!.length).toEqual(0);
  });

  it('adds a new product discount to the array AND a product if given a product UUID', () => {
    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [],
      },
    };

    // Expect
    //{
    //   ...initialState.offer,
    //   subProductDiscounts: {
    //     Transfer: [],
    //     'Ground Service': [],
    //     Supplement: [],
    //     Supplement: [
    //       {
    //         uuid: 'TEST_UUID',
    //         products: [{ uuid: 'TEST_PRODUCT_UUID'}],
    //       },
    //     ],
    //   },
    // };

    const action = offerAddSubProductDiscountAction('Supplement', 'TEST_PRODUCT_UUID');
    const newState = reducer(testState, action);
    expect(newState.subProductDiscounts.Supplement![0].products[0]).toMatchObject({ uuid: 'TEST_PRODUCT_UUID' });
  });

  it('adds a product into the discount product array', () => {
    const action = offerAddProductToSubProductDiscountAction('Supplement', 'TEST_UUID', mockProduct);

    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [
          {
            uuid: 'TEST_UUID',
            discountPercentage: 1,
            maximumQuantity: 2,
            products: [],
          },
        ],
      },
    };

    const newState = reducer(testState, action);
    expect(newState.subProductDiscounts.Supplement![0].products[0]).toMatchObject(mockProduct);
  });

  it('adds a product to discount product array', () => {
    const action = offerAddProductToSubProductDiscountAction('Supplement', 'TEST_UUID_2', mockProduct);

    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [
          {
            uuid: 'TEST_UUID_1',
            discountPercentage: 1,
            maximumQuantity: 2,
            products: [{ uuid: 'A' }],
          },
          {
            uuid: 'TEST_UUID_2',
            discountPercentage: 10,
            maximumQuantity: 20,
            products: [{ uuid: 'B' }],
          },
          {
            uuid: 'TEST_UUID_3',
            discountPercentage: 11,
            maximumQuantity: 22,
            products: [{ uuid: 'C' }],
          },
        ],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [
          {
            uuid: 'TEST_UUID_1',
            discountPercentage: 1,
            maximumQuantity: 2,
            products: [{ uuid: 'A' }],
          },
          {
            uuid: 'TEST_UUID_2',
            discountPercentage: 10,
            maximumQuantity: 20,
            products: [{ uuid: 'B' }, mockProduct],
          },
          {
            uuid: 'TEST_UUID_3',
            discountPercentage: 11,
            maximumQuantity: 22,
            products: [{ uuid: 'C' }],
          },
        ],
      },
    };

    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('removes a product discount', () => {
    const action = offerRemoveSubProductDiscountAction('Supplement', 'TEST_UUID_2');

    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [
          {
            uuid: 'TEST_UUID_1',
            products: [{ uuid: 'A' }],
          },
          {
            uuid: 'TEST_UUID_2',
            products: [{ uuid: 'A' }],
          },
          {
            uuid: 'TEST_UUID_3',
            products: [{ uuid: 'A' }],
          },
        ],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [
          {
            uuid: 'TEST_UUID_1',
            products: [{ uuid: 'A' }],
          },
          {
            uuid: 'TEST_UUID_3',
            products: [{ uuid: 'A' }],
          },
        ],
      },
    };

    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('leaves an empty array when deleting the only discount', () => {
    const action = offerRemoveSubProductDiscountAction('Supplement', 'TEST_UUID_1');

    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [
          {
            uuid: 'TEST_UUID_1',
            products: [{ uuid: 'A' }],
          },
        ],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [],
      },
    };

    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('removes a product from a discount', () => {
    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [
          {
            uuid: 'MP_UUID_1',
            products: [{ uuid: 'P_UUID_1' }, { uuid: 'P_UUID_2' }, { uuid: 'P_UUID_3' }],
          },
        ],
        Supplement: [
          {
            uuid: 'S_UUID_1',
            products: [{ uuid: 'P_UUID_1' }, { uuid: 'P_UUID_2' }, { uuid: 'P_UUID_3' }],
          },
          {
            uuid: 'S_UUID_2',
            products: [{ uuid: 'P_UUID_1' }, { uuid: 'P_UUID_2' }, { uuid: 'P_UUID_3' }],
          },
          {
            uuid: 'S_UUID_3',
            products: [{ uuid: 'P_UUID_1' }, { uuid: 'P_UUID_2' }, { uuid: 'P_UUID_3' }],
          },
        ],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [
          {
            uuid: 'MP_UUID_1',
            products: [{ uuid: 'P_UUID_1' }, { uuid: 'P_UUID_2' }, { uuid: 'P_UUID_3' }],
          },
        ],
        Supplement: [
          {
            uuid: 'S_UUID_1',
            products: [{ uuid: 'P_UUID_1' }, { uuid: 'P_UUID_2' }, { uuid: 'P_UUID_3' }],
          },
          {
            uuid: 'S_UUID_2',
            products: [{ uuid: 'P_UUID_1' }, { uuid: 'P_UUID_3' }],
          },
          {
            uuid: 'S_UUID_3',
            products: [{ uuid: 'P_UUID_1' }, { uuid: 'P_UUID_2' }, { uuid: 'P_UUID_3' }],
          },
        ],
      },
    };

    const action = offerRemoveProductFromSubProductDiscountAction('Supplement', 'S_UUID_2', 'P_UUID_2');
    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('Updates a product discount discountPercentage', () => {
    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [
          {
            uuid: 'S_UUID_1',
            products: [],
          },
          {
            uuid: 'S_UUID_2',
            products: [],
          },
          {
            uuid: 'S_UUID_3',
            products: [],
          },
        ],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [
          {
            uuid: 'S_UUID_1',
            products: [],
          },
          {
            uuid: 'S_UUID_2',
            discountPercentage: 1,
            products: [],
          },
          {
            uuid: 'S_UUID_3',
            products: [],
          },
        ],
      },
    };

    const action = offerUpdateSubProductDiscountAction('Supplement', 'S_UUID_2', 'discountPercentage', '1', undefined);
    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('Updates a product discount maximumQuantity', () => {
    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [
          {
            uuid: 'S_UUID_1',
            products: [],
          },
          {
            uuid: 'S_UUID_2',
            products: [],
          },
          {
            uuid: 'S_UUID_3',
            products: [],
          },
        ],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [
          {
            uuid: 'S_UUID_1',
            products: [],
          },
          {
            uuid: 'S_UUID_2',
            maximumQuantity: 1,
            products: [],
          },
          {
            uuid: 'S_UUID_3',
            products: [],
          },
        ],
      },
    };

    const action = offerUpdateSubProductDiscountAction('Supplement', 'S_UUID_2', 'maximumQuantity', '1', undefined);
    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it.skip('Does not update a product discount maximumQuantity with an invalid value', () => {
    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [
          {
            uuid: 'S_UUID_1',
            products: [],
          },
          {
            uuid: 'S_UUID_2',
            maximumQuantity: 1,
            products: [],
          },
          {
            uuid: 'S_UUID_3',
            products: [],
          },
        ],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [
          {
            uuid: 'S_UUID_1',
            products: [],
          },
          {
            uuid: 'S_UUID_2',
            maximumQuantity: 1,
            products: [],
          },
          {
            uuid: 'S_UUID_3',
            products: [],
          },
        ],
      },
    };

    const action = offerUpdateSubProductDiscountAction('Supplement', 'S_UUID_2', 'maximumQuantity', 'INVALID_VALUE', 1);
    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('adds an age name to a product', () => {
    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [
          {
            uuid: 'S_UUID_1',
            products: [],
          },
          {
            uuid: 'S_UUID_2',
            products: [
              {
                uuid: 'P_UUID_1',
              },
              {
                uuid: 'P_UUID_2',
              },
              {
                uuid: 'P_UUID_3',
              },
            ],
          },
          {
            uuid: 'S_UUID_3',
            products: [],
          },
        ],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [
          {
            uuid: 'S_UUID_1',
            products: [],
          },
          {
            uuid: 'S_UUID_2',
            products: [
              {
                uuid: 'P_UUID_1',
              },
              {
                uuid: 'P_UUID_2',
                ageNames: ['Adult'],
              },
              {
                uuid: 'P_UUID_3',
              },
            ],
          },
          {
            uuid: 'S_UUID_3',
            products: [],
          },
        ],
      },
    };

    const action = offerToggleSubProductDiscountAgeNameAction('Supplement', 'S_UUID_2', 'P_UUID_2', 'Adult');
    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('removes an age name to a product', () => {
    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [
          {
            uuid: 'S_UUID_1',
            products: [],
          },
          {
            uuid: 'S_UUID_2',
            products: [
              {
                uuid: 'P_UUID_1',
              },
              {
                uuid: 'P_UUID_2',
                ageNames: ['Adult', 'Child', 'Infant'],
              },
              {
                uuid: 'P_UUID_3',
              },
            ],
          },
          {
            uuid: 'S_UUID_3',
            products: [],
          },
        ],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [
          {
            uuid: 'S_UUID_1',
            products: [],
          },
          {
            uuid: 'S_UUID_2',
            products: [
              {
                uuid: 'P_UUID_1',
              },
              {
                uuid: 'P_UUID_2',
                ageNames: ['Adult', 'Infant'],
              },
              {
                uuid: 'P_UUID_3',
              },
            ],
          },
          {
            uuid: 'S_UUID_3',
            products: [],
          },
        ],
      },
    };

    const action = offerToggleSubProductDiscountAgeNameAction('Supplement', 'S_UUID_2', 'P_UUID_2', 'Child');
    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });
});
