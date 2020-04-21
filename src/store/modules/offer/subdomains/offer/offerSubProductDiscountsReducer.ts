import * as Actions from '../../actions';
import { IUIOfferProductDiscountInstance, IOfferSubProductDiscounts } from 'services/BackendApi';
import { GET_OFFER_SUCCESS, RESET_OFFER_CHANGES } from '../../actions';
import {
  addDiscountHandler,
  removeDiscountHandler,
  updateDiscountHandler,
  addProductToDiscountHandler,
  removeProductFromDiscountHandler,
  toggleDiscountAgeName,
  toggleProductOnDiscount,
  toggleAgeNameOnProductDiscountProduct,
} from '../../utils';

export const subProductDiscountsReducer = (
  state: IOfferSubProductDiscounts<IUIOfferProductDiscountInstance>,
  action: Actions.OfferDomainAction
): IOfferSubProductDiscounts<IUIOfferProductDiscountInstance> => {
  switch (action.type) {
    case GET_OFFER_SUCCESS:
    case RESET_OFFER_CHANGES:
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

    case Actions.OFFER_TOGGLE_PRODUCT_ON_SUB_PRODUCT_DISCOUNT:
      return toggleProductOnDiscount(state, action) || {};

    case Actions.OFFER_TOGGLE_SUB_PRODUCT_DISCOUNT_AGENAME:
      return toggleDiscountAgeName(state, action);

    case Actions.OFFER_TOGGLE_AGE_NAME_ON_SUB_PRODUCT:
      return toggleAgeNameOnProductDiscountProduct(state, action) || {};

    default:
      return state;
  }
};
