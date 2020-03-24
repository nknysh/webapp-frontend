import { IDateRange } from 'interfaces';
import { IOfferUI } from 'services/BackendApi';
import { initialState, IOfferModel } from '../../../model';
import { offerReducer as reducer } from '../reducer';
import { getOfferSuccessAction } from '../../../actions';
import { IOfferPrerequisites } from '../../../../../../services/BackendApi/types/OfferResponse';
import {
  offerAddProductDiscountFineAction,
  offerPutProductDiscountFineAction,
  offerDeleteProductDiscountFineAction,
} from '../actions';

describe('offer reducer product fines', () => {
  it('adding a new one to the array (object is completely empty)', () => {
    const action = offerAddProductDiscountFineAction();

    const testState: IOfferUI = {
      ...initialState.offer,
    };

    const expected: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Fine: [
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

  it('adding a new one to the array (object already has empty array of fines)', () => {
    const action = offerAddProductDiscountFineAction();

    const testState: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [],
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
            index: 0,
            products: [],
          },
        ],
      },
    };

    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('putting a fine into the array', () => {
    const action = offerPutProductDiscountFineAction({
      index: 0,
      discountPercentage: 1,
      maximumQuantity: 2,
      products: [{ uuid: 'A' }],
    });

    const testState: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
          {
            index: 0,
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

  it('putting a fine into the array (if index doesnt already exist, change nothing)', () => {
    const action = offerPutProductDiscountFineAction({
      index: 0,
      discountPercentage: 1,
      maximumQuantity: 2,
      products: [{ uuid: 'A' }],
    });

    const testState: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [],
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

  it('putting a fine into the array (dont alter fines around it)', () => {
    const action = offerPutProductDiscountFineAction({
      index: 1,
      discountPercentage: 44,
      maximumQuantity: 55,
      products: [{ uuid: 'Z' }],
    });

    const testState: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
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
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
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

  it('putting a fine into the array (ensure index changes are based on value and not array index)', () => {
    const action = offerPutProductDiscountFineAction({
      index: 5,
      discountPercentage: 44,
      maximumQuantity: 55,
      products: [{ uuid: 'Z' }],
    });

    const testState: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
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
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
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

  it('putting a fine into the array (ensure index changes are based on value and not array index, and gaps between indexes)', () => {
    const action = offerPutProductDiscountFineAction({
      index: 7,
      discountPercentage: 44,
      maximumQuantity: 55,
      products: [{ uuid: 'Z' }],
    });

    const testState: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
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
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
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

  it('deleteing a fine', () => {
    const action = offerDeleteProductDiscountFineAction(1);

    const testState: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
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
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
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

  it('deleting a fine (deleting the last one leaves an empty array)', () => {
    const action = offerDeleteProductDiscountFineAction(0);

    const testState: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
          {
            index: 0,
            products: [{ uuid: 'A' }],
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

  it('deleting a supplement (with an index value different to its actual index)', () => {
    const action = offerDeleteProductDiscountFineAction(4);

    const testState: IOfferUI = {
      ...initialState.offer,
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
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
      productDiscounts: {
        Transfer: [],
        'Ground Service': [],
        Supplement: [],
        Fine: [
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
