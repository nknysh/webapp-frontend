import * as Actions from '../../actions';
import produce from 'immer';
import { IUIOfferProductDiscountInstance, IOfferSubProductDiscounts } from 'services/BackendApi';
import { GET_OFFER_SUCCESS } from '../../actions';
import { sortObjectsByIndex } from '../../utils';

export const subProductDiscountsReducer = (
  state: IOfferSubProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferDomainAction
): IOfferSubProductDiscounts<IUIOfferProductDiscountInstance> | undefined => {
  switch (action.type) {
    case GET_OFFER_SUCCESS:
      return state;
    case Actions.OFFER_ADD_SUB_PRODUCT_DISCOUNT_SUPPLEMENT:
      return offerAddSubProductDiscountSupplementReducer(state, action);
    case Actions.OFFER_PUT_SUB_PRODUCT_DISCOUNT_SUPPLEMENT:
      return offerPutSubProductDiscountSupplementReducer(state, action);
    case Actions.OFFER_DELETE_SUB_PRODUCT_DISCOUNT_SUPPLEMENT:
      return offerDeleteSubProductDiscountSupplementReducer(state, action);
  }
};

// Supplements
export const offerAddSubProductDiscountSupplementReducer = (
  state: IOfferSubProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferAddSubProductDiscountSupplementAction
) => {
  return produce(state, draftState => {
    if (draftState === undefined) {
      draftState = {} as IOfferSubProductDiscounts<IUIOfferProductDiscountInstance>;
    }

    if (draftState.Supplement === undefined) {
      draftState.Supplement = [];
    }

    draftState.Supplement.push({
      index: draftState?.Supplement.length,
      products: [],
    });

    return draftState;
  });
};

export const offerPutSubProductDiscountSupplementReducer = (
  state: IOfferSubProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferPutSubProductDiscountSupplementAction
) => {
  return produce(state, draftState => {
    if (draftState === undefined || draftState.Supplement === undefined) {
      return draftState;
    }

    // if we're trying to put a discount for an index that doens't exist, just return the state
    const supplementArrayIndex = draftState.Supplement.findIndex(
      s => s.index === action.subProductDiscountSupplement.index
    );
    if (supplementArrayIndex === -1) {
      return draftState;
    }

    // remove it from the original array, and re-add the new one in, and then sort them
    draftState.Supplement.splice(supplementArrayIndex, 1);
    draftState.Supplement = [...draftState.Supplement, action.subProductDiscountSupplement];
    draftState.Supplement = sortObjectsByIndex(draftState.Supplement);

    return draftState;
  });
};

export const offerDeleteSubProductDiscountSupplementReducer = (
  state: IOfferSubProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferDeleteSubProductDiscountSupplementAction
) => {
  return produce(state, draftState => {
    if (draftState === undefined || draftState.Supplement === undefined) {
      return draftState;
    }

    const indexToDelete = draftState.Supplement.findIndex(sup => sup.index === action.index);

    if (indexToDelete === -1) {
      return draftState;
    }

    draftState.Supplement.splice(indexToDelete, 1);
    return draftState;
  });
};

// Meal Plans
export const offerAddSubProductDiscountMealPlanReducer = (
  state: IOfferSubProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferAddSubProductDiscountSupplementAction
) => {
  return produce(state, draftState => {
    if (draftState === undefined) {
      draftState = {} as IOfferSubProductDiscounts<IUIOfferProductDiscountInstance>;
    }

    if (draftState['Meal Plan'] === undefined) {
      draftState['Meal Plan'] = [];
    }

    draftState['Meal Plan'].push({
      index: draftState['Meal Plan'].length,
      products: [],
    });

    return draftState;
  });
};

export const offerPutSubProductDiscountMealPlanReducer = (
  state: IOfferSubProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferPutSubProductDiscountSupplementAction
) => {
  return produce(state, draftState => {
    if (draftState === undefined || draftState['Meal Plan'] === undefined) {
      return draftState;
    }

    // if we're trying to put a discount for an index that doens't exist, just return the state
    const supplementArrayIndex = draftState['Meal Plan'].findIndex(
      s => s.index === action.subProductDiscountSupplement.index
    );
    if (supplementArrayIndex === -1) {
      return draftState;
    }

    // remove it from the original array, and re-add the new one in, and then sort them
    draftState['Meal Plan'].splice(supplementArrayIndex, 1);
    draftState['Meal Plan'] = [...draftState['Meal Plan'], action.subProductDiscountSupplement];
    draftState['Meal Plan'] = sortObjectsByIndex(draftState['Meal Plan']);

    return draftState;
  });
};

export const offerDeleteSubProductDiscountMealPlanReducer = (
  state: IOfferSubProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferDeleteSubProductDiscountSupplementAction
) => {
  return produce(state, draftState => {
    if (draftState === undefined || draftState['Meal Plan'] === undefined) {
      return draftState;
    }

    const indexToDelete = draftState['Meal Plan'].findIndex(sup => sup.index === action.index);

    if (indexToDelete === -1) {
      return draftState;
    }

    draftState['Meal Plan'].splice(indexToDelete, 1);
    return draftState;
  });
};
