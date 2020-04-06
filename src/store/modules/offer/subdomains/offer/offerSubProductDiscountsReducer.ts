import uuid from 'uuid';
import * as Actions from '../../actions';
import produce from 'immer';
import { IUIOfferProductDiscountInstance, IOfferSubProductDiscounts } from 'services/BackendApi';
import { GET_OFFER_SUCCESS } from '../../actions';
import { sanitizeInteger } from 'utils/number';
import { without } from 'ramda';
import {
  addDiscountHandler,
  removeDiscountHandler,
  updateDiscountHandler,
  addProductToDiscountHandler,
  removeProductFromDiscountHandler,
  toggleDiscountAgeName,
} from '../../utils';

export const subProductDiscountsReducer = (
  state: IOfferSubProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferDomainAction
): IOfferSubProductDiscounts<IUIOfferProductDiscountInstance> | undefined => {
  switch (action.type) {
    case GET_OFFER_SUCCESS:
      return state;
    case Actions.OFFER_ADD_SUB_PRODUCT_DISCOUNT:
      return addDiscountHandler(state, action);

    case Actions.OFFER_REMOVE_SUB_PRODUCT_DISCOUNT:
      return removeDiscountHandler(state, action);

    case Actions.OFFER_UPDATE_SUB_PRODUCT_DISCOUNT:
      return updateDiscountHandler(state, action);

    case Actions.OFFER_ADD_PRODUCT_TO_SUB_PRODUCT_DISCOUNT:
      return addProductToDiscountHandler(state, action);

    case Actions.OFFER_REMOVE_PRODUCT_FROM_SUB_PRODUCT_DISCOUNT:
      return removeProductFromDiscountHandler(state, action);

    case Actions.OFFER_TOGGLE_SUB_PRODUCT_DISCOUNT_AGENAME:
      return toggleDiscountAgeName(state, action);
    // case Actions.OFFER_ADD_SUB_PRODUCT_DISCOUNT_SUPPLEMENT:
    //   return offerAddSubProductDiscountSupplementReducer(state, action);
    // case Actions.OFFER_UPDATE_SUB_PRODUCT_DISCOUNT_SUPPLEMENT:
    //   return offerUpdateSubProductDiscountSupplementReducer(state, action);
    // case Actions.OFFER_DELETE_SUB_PRODUCT_DISCOUNT_SUPPLEMENT:
    //   return offerDeleteSubProductDiscountSupplementReducer(state, action);
    // case Actions.OFFER_TOGGLE_SUB_PRODUCT_DISCOUNT_AGENAME:
    //   return offerToggleSubProductDiscountSupplementAgeNameReducer(state, action);
    // case Actions.OFFER_ADD_SUB_PRODUCT_DISCOUNT_MEAL_PLAN:
    //   return offerAddSubProductDiscountMealPlanReducer(state, action);
    // case Actions.OFFER_UPDATE_SUB_PRODUCT_DISCOUNT_MEAL_PLAN:
    //   return offerUpdateSubProductDiscountMealPlanReducer(state, action);
    // case Actions.OFFER_DELETE_SUB_PRODUCT_DISCOUNT_MEAL_PLAN:
    //   return offerDeleteSubProductDiscountMealPlanReducer(state, action);
  }
};
