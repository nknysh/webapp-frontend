import { IDateRange } from 'interfaces';
import { IOfferUI } from 'services/BackendApi';
import { initialState, IOfferModel } from '../../../model';
import { offerReducer as reducer } from '../reducer';
import { getOfferSuccessAction } from '../../../actions';
import { IOfferPrerequisites } from '../../../../../../services/BackendApi/types/OfferResponse';
import {
  offerAddSubProductDiscountSupplementAction,
  offerPutSubProductDiscountSupplementAction,
  offerDeleteSubProductDiscountSupplementAction,
  offerAddSubProductDiscountMealPlanAction,
  offerPutSubProductDiscountMealPlanAction,
  offerDeleteSubProductDiscountMealPlanAction,
} from '../actions';

describe('offer reducer sub product supplements', () => {
  it('adding a new one to the array (object is completely empty)', () => {
    const action = offerAddSubProductDiscountSupplementAction();

    const testState: IOfferUI = {
      ...initialState.offer,
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        Supplement: [
          {
            index: 0,
            products: [],
          },
        ],
      },
    };

    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('adding a new one to the array (object already has empty array of supplements)', () => {
    const action = offerAddSubProductDiscountSupplementAction();

    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [
          {
            index: 0,
            products: [],
          },
        ],
      },
    };

    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('putting a supplement into the array', () => {
    const action = offerPutSubProductDiscountSupplementAction({
      index: 0,
      discountPercentage: 1,
      maximumQuantity: 2,
      products: [{ uuid: 'A' }],
    });

    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [
          {
            index: 0,
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
            index: 0,
            discountPercentage: 1,
            maximumQuantity: 2,
            products: [{ uuid: 'A' }],
          },
        ],
      },
    };

    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('putting a supplement into the array (if index doesnt already exist, change nothing)', () => {
    const action = offerPutSubProductDiscountSupplementAction({
      index: 0,
      discountPercentage: 1,
      maximumQuantity: 2,
      products: [{ uuid: 'A' }],
    });

    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [],
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

  it('putting a supplement into the array (dont alter supplements around it)', () => {
    const action = offerPutSubProductDiscountSupplementAction({
      index: 1,
      discountPercentage: 44,
      maximumQuantity: 55,
      products: [{ uuid: 'Z' }],
    });

    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [
          {
            index: 0,
            discountPercentage: 1,
            maximumQuantity: 2,
            products: [{ uuid: 'A' }],
          },
          {
            index: 1,
            discountPercentage: 10,
            maximumQuantity: 20,
            products: [{ uuid: 'B' }],
          },
          {
            index: 2,
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
            index: 0,
            discountPercentage: 1,
            maximumQuantity: 2,
            products: [{ uuid: 'A' }],
          },
          {
            index: 1,
            discountPercentage: 44,
            maximumQuantity: 55,
            products: [{ uuid: 'Z' }],
          },
          {
            index: 2,
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

  it('putting a supplement into the array (ensure index changes are based on value and not array index)', () => {
    const action = offerPutSubProductDiscountSupplementAction({
      index: 5,
      discountPercentage: 44,
      maximumQuantity: 55,
      products: [{ uuid: 'Z' }],
    });

    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [
          {
            index: 4,
            discountPercentage: 1,
            maximumQuantity: 2,
            products: [{ uuid: 'A' }],
          },
          {
            index: 5,
            discountPercentage: 10,
            maximumQuantity: 20,
            products: [{ uuid: 'B' }],
          },
          {
            index: 6,
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
            index: 4,
            discountPercentage: 1,
            maximumQuantity: 2,
            products: [{ uuid: 'A' }],
          },
          {
            index: 5,
            discountPercentage: 44,
            maximumQuantity: 55,
            products: [{ uuid: 'Z' }],
          },
          {
            index: 6,
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

  it('putting a supplement into the array (ensure index changes are based on value and not array index, and gaps between indexes)', () => {
    const action = offerPutSubProductDiscountSupplementAction({
      index: 7,
      discountPercentage: 44,
      maximumQuantity: 55,
      products: [{ uuid: 'Z' }],
    });

    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [
          {
            index: 4,
            discountPercentage: 1,
            maximumQuantity: 2,
            products: [{ uuid: 'A' }],
          },
          {
            index: 7,
            discountPercentage: 10,
            maximumQuantity: 20,
            products: [{ uuid: 'B' }],
          },
          {
            index: 10,
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
            index: 4,
            discountPercentage: 1,
            maximumQuantity: 2,
            products: [{ uuid: 'A' }],
          },
          {
            index: 7,
            discountPercentage: 44,
            maximumQuantity: 55,
            products: [{ uuid: 'Z' }],
          },
          {
            index: 10,
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

  it('deleteing a supplement', () => {
    const action = offerDeleteSubProductDiscountSupplementAction(1);

    const testState: IOfferUI = {
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

    const expected: IOfferUI = {
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
    };

    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('deleting a supplement (deleting the last one leaves an empty array)', () => {
    const action = offerDeleteSubProductDiscountSupplementAction(0);

    const testState: IOfferUI = {
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

  it('deleting a supplement (with an index value different to its actual index)', () => {
    const action = offerDeleteSubProductDiscountSupplementAction(4);

    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [
          {
            index: 3,
            products: [{ uuid: 'A' }],
          },
          {
            index: 4,
            products: [{ uuid: 'B' }],
          },
          {
            index: 5,
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
            index: 3,
            products: [{ uuid: 'A' }],
          },
          {
            index: 5,
            products: [{ uuid: 'C' }],
          },
        ],
      },
    };

    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });
});

describe('offer reducer sub product meal plan', () => {
  it('adding a new one to the array (object is completely empty)', () => {
    const action = offerAddSubProductDiscountMealPlanAction();

    const testState: IOfferUI = {
      ...initialState.offer,
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [
          {
            index: 0,
            products: [],
          },
        ],
      },
    };

    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('adding a new one to the array (object already has empty array of meal plans)', () => {
    const action = offerAddSubProductDiscountMealPlanAction();

    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
        Supplement: [],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [
          {
            index: 0,
            products: [],
          },
        ],
        Supplement: [],
      },
    };

    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('putting a meal plan into the array', () => {
    const action = offerPutSubProductDiscountMealPlanAction({
      index: 0,
      discountPercentage: 1,
      maximumQuantity: 2,
      products: [{ uuid: 'A' }],
    });

    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [
          {
            index: 0,
            products: [],
          },
        ],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [
          {
            index: 0,
            discountPercentage: 1,
            maximumQuantity: 2,
            products: [{ uuid: 'A' }],
          },
        ],
      },
    };

    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('putting a meal plan into the array (if index doesnt already exist, change nothing)', () => {
    const action = offerPutSubProductDiscountMealPlanAction({
      index: 0,
      discountPercentage: 1,
      maximumQuantity: 2,
      products: [{ uuid: 'A' }],
    });

    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
      },
    };

    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('putting a meal plan into the array (dont alter meal plans around it)', () => {
    const action = offerPutSubProductDiscountMealPlanAction({
      index: 1,
      discountPercentage: 44,
      maximumQuantity: 55,
      products: [{ uuid: 'Z' }],
    });

    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [
          {
            index: 0,
            discountPercentage: 1,
            maximumQuantity: 2,
            products: [{ uuid: 'A' }],
          },
          {
            index: 1,
            discountPercentage: 10,
            maximumQuantity: 20,
            products: [{ uuid: 'B' }],
          },
          {
            index: 2,
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
        'Meal Plan': [
          {
            index: 0,
            discountPercentage: 1,
            maximumQuantity: 2,
            products: [{ uuid: 'A' }],
          },
          {
            index: 1,
            discountPercentage: 44,
            maximumQuantity: 55,
            products: [{ uuid: 'Z' }],
          },
          {
            index: 2,
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

  it('putting a meal plan into the array (ensure index changes are based on value and not array index)', () => {
    const action = offerPutSubProductDiscountMealPlanAction({
      index: 5,
      discountPercentage: 44,
      maximumQuantity: 55,
      products: [{ uuid: 'Z' }],
    });

    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [
          {
            index: 4,
            discountPercentage: 1,
            maximumQuantity: 2,
            products: [{ uuid: 'A' }],
          },
          {
            index: 5,
            discountPercentage: 10,
            maximumQuantity: 20,
            products: [{ uuid: 'B' }],
          },
          {
            index: 6,
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
        'Meal Plan': [
          {
            index: 4,
            discountPercentage: 1,
            maximumQuantity: 2,
            products: [{ uuid: 'A' }],
          },
          {
            index: 5,
            discountPercentage: 44,
            maximumQuantity: 55,
            products: [{ uuid: 'Z' }],
          },
          {
            index: 6,
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

  it('putting a meal plan into the array (ensure index changes are based on value and not array index, and gaps between indexes)', () => {
    const action = offerPutSubProductDiscountMealPlanAction({
      index: 7,
      discountPercentage: 44,
      maximumQuantity: 55,
      products: [{ uuid: 'Z' }],
    });

    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [
          {
            index: 4,
            discountPercentage: 1,
            maximumQuantity: 2,
            products: [{ uuid: 'A' }],
          },
          {
            index: 7,
            discountPercentage: 10,
            maximumQuantity: 20,
            products: [{ uuid: 'B' }],
          },
          {
            index: 10,
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
        'Meal Plan': [
          {
            index: 4,
            discountPercentage: 1,
            maximumQuantity: 2,
            products: [{ uuid: 'A' }],
          },
          {
            index: 7,
            discountPercentage: 44,
            maximumQuantity: 55,
            products: [{ uuid: 'Z' }],
          },
          {
            index: 10,
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

  it('deleteing a meal plan', () => {
    const action = offerDeleteSubProductDiscountMealPlanAction(1);

    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [
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

    const expected: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [
          {
            index: 0,
            products: [{ uuid: 'A' }],
          },
        ],
      },
    };

    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('deleting a meal plan (deleting the last one leaves an empty array)', () => {
    const action = offerDeleteSubProductDiscountMealPlanAction(0);

    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [
          {
            index: 0,
            products: [{ uuid: 'A' }],
          },
        ],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [],
      },
    };

    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('deleting a meal plan (with an index value different to its actual index)', () => {
    const action = offerDeleteSubProductDiscountMealPlanAction(4);

    const testState: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [
          {
            index: 3,
            products: [{ uuid: 'A' }],
          },
          {
            index: 4,
            products: [{ uuid: 'B' }],
          },
          {
            index: 5,
            products: [{ uuid: 'C' }],
          },
        ],
      },
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      subProductDiscounts: {
        'Meal Plan': [
          {
            index: 3,
            products: [{ uuid: 'A' }],
          },
          {
            index: 5,
            products: [{ uuid: 'C' }],
          },
        ],
      },
    };

    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });
});
