import { IOfferUI } from 'services/BackendApi';
import { initialState } from '../../../model';
import { offerReducer as reducer } from '../reducer';
import { IDiscountProduct } from '../../../../../../services/BackendApi/types/OfferResponse';
import { offerToggleProductOnProductDiscountAction } from '../actions';
import {
  offerRemoveProductDiscountAction,
  offerUpdateProductDiscountAction,
  offerToggleProductDiscountAgeNameAction,
} from '../actions';
import {
  offerAddProductDiscountAction,
  offerAddProductToProductDiscountAction,
  offerRemoveProductFromProductDiscountAction,
} from '../actions';

const mockProduct: IDiscountProduct = { uuid: 'XXX', ageNames: [] };

// TODO: Reorganise these by aciton and test each discoun type, just to be safe
describe('offer reducer product fines', () => {
  it('adds a new product discount to the array (object is completely empty)', () => {
    const action = offerAddProductDiscountAction('Fine');
    const testState: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {},
    };

    // Expect
    // {
    //   ...initialState.offer,
    //   productDiscounts: {
    //     Fine: [
    //       {
    //         uuid: 'TEST_UUID',
    //         products: [],
    //       },
    //     ],
    //   },
    // };

    const newState = reducer(testState, action);
    expect(newState.productDiscounts.Fine![0]).toHaveProperty('uuid');
    expect(newState.productDiscounts.Fine![0]).toHaveProperty('products');
    expect(typeof newState.productDiscounts.Fine![0].uuid).toBe('string');
    expect(newState.productDiscounts.Fine![0].products).toBeInstanceOf(Array);
  });

  it('adds a new product discount to the array (object already has empty array of fines)', () => {
    const action = offerAddProductDiscountAction('Fine');

    const testState: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [],
      },
    };

    // Expect
    //{
    //   ...initialState.offer,
    //   productDiscounts: {
    //     Transfer: [],
    //     'Ground Service': [],
    //     Supplement: [],
    //     Fine: [
    //       {
    //         uuid: 'TEST_UUID',
    //         products: [],
    //       },
    //     ],
    //   },
    // };

    const newState = reducer(testState, action);
    expect(newState.productDiscounts.Fine).not.toBe(undefined);
    expect(newState.productDiscounts.Fine![0]).toHaveProperty('uuid');
    expect(newState.productDiscounts.Fine![0]).toHaveProperty('products');
    expect(typeof newState.productDiscounts.Fine![0].uuid).toBe('string');
    expect(newState.productDiscounts.Fine![0].products).toBeInstanceOf(Array);
    expect(newState.productDiscounts.Transfer!.length).toEqual(0);
    expect(newState.productDiscounts['Ground Service']!.length).toEqual(0);
    expect(newState.productDiscounts.Supplement!.length).toEqual(0);
  });

  it('adds a product into the discount product array', () => {
    const action = offerAddProductToProductDiscountAction('Fine', 'TEST_UUID', mockProduct);

    const testState: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
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
    expect(newState.productDiscounts.Fine![0].products[0]).toMatchObject(mockProduct);
  });

  it('adds a product to discount product array', () => {
    const action = offerAddProductToProductDiscountAction('Fine', 'TEST_UUID_2', mockProduct);

    const testState: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
          {
            uuid: 'TEST_UUID_1',
            discountPercentage: 1,
            maximumQuantity: 2,
            products: [{ uuid: 'A', ageNames: [] }],
          },
          {
            uuid: 'TEST_UUID_2',
            discountPercentage: 10,
            maximumQuantity: 20,
            products: [{ uuid: 'B', ageNames: [] }],
          },
          {
            uuid: 'TEST_UUID_3',
            discountPercentage: 11,
            maximumQuantity: 22,
            products: [{ uuid: 'C', ageNames: [] }],
          },
        ],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
          {
            uuid: 'TEST_UUID_1',
            discountPercentage: 1,
            maximumQuantity: 2,
            products: [{ uuid: 'A', ageNames: [] }],
          },
          {
            uuid: 'TEST_UUID_2',
            discountPercentage: 10,
            maximumQuantity: 20,
            products: [{ uuid: 'B', ageNames: [] }, mockProduct],
          },
          {
            uuid: 'TEST_UUID_3',
            discountPercentage: 11,
            maximumQuantity: 22,
            products: [{ uuid: 'C', ageNames: [] }],
          },
        ],
      },
    };

    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('removes a product discount', () => {
    const action = offerRemoveProductDiscountAction('Fine', 'TEST_UUID_2');

    const testState: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
          {
            uuid: 'TEST_UUID_1',
            products: [{ uuid: 'A', ageNames: [] }],
          },
          {
            uuid: 'TEST_UUID_2',
            products: [{ uuid: 'A', ageNames: [] }],
          },
          {
            uuid: 'TEST_UUID_3',
            products: [{ uuid: 'A', ageNames: [] }],
          },
        ],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
          {
            uuid: 'TEST_UUID_1',
            products: [{ uuid: 'A', ageNames: [] }],
          },
          {
            uuid: 'TEST_UUID_3',
            products: [{ uuid: 'A', ageNames: [] }],
          },
        ],
      },
    };

    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('leaves an empty array when deleting the only discount', () => {
    const action = offerRemoveProductDiscountAction('Fine', 'TEST_UUID_1');

    const testState: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
          {
            uuid: 'TEST_UUID_1',
            products: [{ uuid: 'A', ageNames: [] }],
          },
        ],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [],
      },
    };

    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('removes a product from a discount', () => {
    const testState: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [
          {
            uuid: 'T_UUID_1',
            products: [
              { uuid: 'P_UUID_1', ageNames: [] },
              { uuid: 'P_UUID_2', ageNames: [] },
              { uuid: 'P_UUID_3', ageNames: [] },
            ],
          },
        ],
        'Ground Service': [
          {
            uuid: 'GS_UUID_1',
            products: [
              { uuid: 'P_UUID_1', ageNames: [] },
              { uuid: 'P_UUID_2', ageNames: [] },
              { uuid: 'P_UUID_3', ageNames: [] },
            ],
          },
        ],
        Supplement: [
          {
            uuid: 'S_UUID_1',
            products: [
              { uuid: 'P_UUID_1', ageNames: [] },
              { uuid: 'P_UUID_2', ageNames: [] },
              { uuid: 'P_UUID_3', ageNames: [] },
            ],
          },
        ],
        Fine: [
          {
            uuid: 'F_UUID_1',
            products: [
              { uuid: 'P_UUID_1', ageNames: [] },
              { uuid: 'P_UUID_2', ageNames: [] },
              { uuid: 'P_UUID_3', ageNames: [] },
            ],
          },
          {
            uuid: 'F_UUID_2',
            products: [
              { uuid: 'P_UUID_1', ageNames: [] },
              { uuid: 'P_UUID_2', ageNames: [] },
              { uuid: 'P_UUID_3', ageNames: [] },
            ],
          },
          {
            uuid: 'F_UUID_3',
            products: [
              { uuid: 'P_UUID_1', ageNames: [] },
              { uuid: 'P_UUID_2', ageNames: [] },
              { uuid: 'P_UUID_3', ageNames: [] },
            ],
          },
        ],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [
          {
            uuid: 'T_UUID_1',
            products: [
              { uuid: 'P_UUID_1', ageNames: [] },
              { uuid: 'P_UUID_2', ageNames: [] },
              { uuid: 'P_UUID_3', ageNames: [] },
            ],
          },
        ],
        'Ground Service': [
          {
            uuid: 'GS_UUID_1',
            products: [
              { uuid: 'P_UUID_1', ageNames: [] },
              { uuid: 'P_UUID_2', ageNames: [] },
              { uuid: 'P_UUID_3', ageNames: [] },
            ],
          },
        ],
        Supplement: [
          {
            uuid: 'S_UUID_1',
            products: [
              { uuid: 'P_UUID_1', ageNames: [] },
              { uuid: 'P_UUID_2', ageNames: [] },
              { uuid: 'P_UUID_3', ageNames: [] },
            ],
          },
        ],
        Fine: [
          {
            uuid: 'F_UUID_1',
            products: [
              { uuid: 'P_UUID_1', ageNames: [] },
              { uuid: 'P_UUID_2', ageNames: [] },
              { uuid: 'P_UUID_3', ageNames: [] },
            ],
          },
          {
            uuid: 'F_UUID_2',
            products: [
              { uuid: 'P_UUID_1', ageNames: [] },
              { uuid: 'P_UUID_3', ageNames: [] },
            ],
          },
          {
            uuid: 'F_UUID_3',
            products: [
              { uuid: 'P_UUID_1', ageNames: [] },
              { uuid: 'P_UUID_2', ageNames: [] },
              { uuid: 'P_UUID_3', ageNames: [] },
            ],
          },
        ],
      },
    };

    const action = offerRemoveProductFromProductDiscountAction('Fine', 'F_UUID_2', 'P_UUID_2');
    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('Updates a product discount discountPercentage', () => {
    const testState: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
          {
            uuid: 'F_UUID_1',
            products: [],
          },
          {
            uuid: 'F_UUID_2',
            products: [],
          },
          {
            uuid: 'F_UUID_3',
            products: [],
          },
        ],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
          {
            uuid: 'F_UUID_1',
            products: [],
          },
          {
            uuid: 'F_UUID_2',
            discountPercentage: 1,
            products: [],
          },
          {
            uuid: 'F_UUID_3',
            products: [],
          },
        ],
      },
    };

    const action = offerUpdateProductDiscountAction('Fine', 'F_UUID_2', 'discountPercentage', '1');
    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('Updates a product discount maximumQuantity', () => {
    const testState: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
          {
            uuid: 'F_UUID_1',
            products: [],
          },
          {
            uuid: 'F_UUID_2',
            products: [],
          },
          {
            uuid: 'F_UUID_3',
            products: [],
          },
        ],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
          {
            uuid: 'F_UUID_1',
            products: [],
          },
          {
            uuid: 'F_UUID_2',
            maximumQuantity: 1,
            products: [],
          },
          {
            uuid: 'F_UUID_3',
            products: [],
          },
        ],
      },
    };

    const action = offerUpdateProductDiscountAction('Fine', 'F_UUID_2', 'maximumQuantity', '1');
    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('adds an age name to a product', () => {
    const testState: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [
          {
            uuid: 'T_UUID_1',
            products: [],
          },
          {
            uuid: 'T_UUID_2',
            products: [
              {
                uuid: 'P_UUID_1',
                ageNames: [],
              },
              {
                uuid: 'P_UUID_2',
                ageNames: ['Child'],
              },
              {
                uuid: 'P_UUID_3',
                ageNames: [],
              },
            ],
          },
          {
            uuid: 'T_UUID_3',
            products: [],
          },
        ],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [
          {
            uuid: 'T_UUID_1',
            products: [],
          },
          {
            uuid: 'T_UUID_2',
            products: [
              {
                uuid: 'P_UUID_1',
                ageNames: [],
              },
              {
                uuid: 'P_UUID_2',
                ageNames: ['Child', 'Adult'],
              },
              {
                uuid: 'P_UUID_3',
                ageNames: [],
              },
            ],
          },
          {
            uuid: 'T_UUID_3',
            products: [],
          },
        ],
      },
    };

    const action = offerToggleProductDiscountAgeNameAction('Transfer', 'T_UUID_2', 'P_UUID_2', 'Adult');
    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('adds an age name to a product', () => {
    const testState: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [
          {
            uuid: 'T_UUID_1',
            products: [],
          },
          {
            uuid: 'T_UUID_2',
            products: [
              {
                uuid: 'P_UUID_1',
                ageNames: [],
              },
              {
                uuid: 'P_UUID_2',
                ageNames: ['Adult', 'Child'],
              },
              {
                uuid: 'P_UUID_3',
                ageNames: [],
              },
            ],
          },
          {
            uuid: 'T_UUID_3',
            products: [],
          },
        ],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [
          {
            uuid: 'T_UUID_1',
            products: [],
          },
          {
            uuid: 'T_UUID_2',
            products: [
              {
                uuid: 'P_UUID_1',
                ageNames: [],
              },
              {
                uuid: 'P_UUID_2',
                ageNames: ['Child'],
              },
              {
                uuid: 'P_UUID_3',
                ageNames: [],
              },
            ],
          },
          {
            uuid: 'T_UUID_3',
            products: [],
          },
        ],
      },
    };

    const action = offerToggleProductDiscountAgeNameAction('Transfer', 'T_UUID_2', 'P_UUID_2', 'Adult');
    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('toggles a product discount product on', () => {
    const testState: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [
          {
            uuid: 'T_UUID_1',
            products: [],
          },
          {
            uuid: 'T_UUID_2',
            products: [],
          },
          {
            uuid: 'T_UUID_3',
            products: [],
          },
        ],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [
          {
            uuid: 'T_UUID_1',
            products: [],
          },
          {
            uuid: 'T_UUID_2',
            products: [{ uuid: 'TEST_UUID', ageNames: [] }],
          },
          {
            uuid: 'T_UUID_3',
            products: [],
          },
        ],
      },
    };

    const action = offerToggleProductOnProductDiscountAction('Transfer', 'T_UUID_2', 'TEST_UUID');
    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('toggles a product discount product OFF', () => {
    const testState: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [
          {
            uuid: 'T_UUID_1',
            products: [],
          },
          {
            uuid: 'T_UUID_2',
            products: [{ uuid: 'TEST_UUID', ageNames: [] }],
          },
          {
            uuid: 'T_UUID_3',
            products: [],
          },
        ],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [
          {
            uuid: 'T_UUID_1',
            products: [],
          },
          {
            uuid: 'T_UUID_2',
            products: [],
          },
          {
            uuid: 'T_UUID_3',
            products: [],
          },
        ],
      },
    };

    const action = offerToggleProductOnProductDiscountAction('Transfer', 'T_UUID_2', 'TEST_UUID');
    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });
});
