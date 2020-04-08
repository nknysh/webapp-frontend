import * as Actions from '../../actions';
import { IOfferProductDiscounts, IUIOfferProductDiscountInstance } from 'services/BackendApi';
import { GET_OFFER_SUCCESS } from '../../actions';
import {
  addDiscountHandler,
  addProductToDiscountHandler,
  removeDiscountHandler,
  removeProductFromDiscountHandler,
  updateDiscountHandler,
  toggleDiscountAgeName,
  toggleProductOnDiscount,
  toggleAgeNameOnProductDiscountProduct,
} from '../../utils';
import { IOfferModel } from '../../model';

export const productDiscountsReducer = (
  state: IOfferModel['offer']['productDiscounts'],
  action: Actions.OfferDomainAction
): IOfferProductDiscounts<IUIOfferProductDiscountInstance> => {
  switch (action.type) {
    case GET_OFFER_SUCCESS:
      return state;
    case Actions.OFFER_ADD_PRODUCT_DISCOUNT:
      return addDiscountHandler(state, action);

    case Actions.OFFER_REMOVE_PRODUCT_DISCOUNT:
      return removeDiscountHandler(state, action);

    case Actions.OFFER_UPDATE_PRODUCT_DISCOUNT:
      return updateDiscountHandler(state, action);

    case Actions.OFFER_ADD_PRODUCT_TO_PRODUCT_DISCOUNT:
      return addProductToDiscountHandler(state, action);

    case Actions.OFFER_REMOVE_PRODUCT_FROM_PRODUCT_DISCOUNT:
      return removeProductFromDiscountHandler(state, action);

    case Actions.OFFER_TOGGLE_PRODUCT_ON_PRODUCT_DISCOUNT:
      return toggleProductOnDiscount(state, action);

    case Actions.OFFER_TOGGLE_PRODUCT_DISCOUNT_AGENAME:
      return toggleDiscountAgeName(state, action);

    case Actions.OFFER_TOGGLE_AGE_NAME_ON_PRODUCT:
      return toggleAgeNameOnProductDiscountProduct(state, action);

    default:
      return state;
  }
};
