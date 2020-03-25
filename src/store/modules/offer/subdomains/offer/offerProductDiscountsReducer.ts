import * as Actions from '../../actions';
import produce from 'immer';
import { IOfferProductDiscounts, IUIOfferProductDiscountInstance } from 'services/BackendApi';
import { GET_OFFER_SUCCESS } from '../../actions';
import { sortObjectsByIndex } from '../../utils';

export const productDiscountsReducer = (
  state: IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferDomainAction
): IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined => {
  switch (action.type) {
    case GET_OFFER_SUCCESS:
      return state;
    case Actions.OFFER_ADD_PRODUCT_DISCOUNT_FINE:
      return offerAddProductDiscountFineReducer(state, action);
    case Actions.OFFER_PUT_PRODUCT_DISCOUNT_FINE:
      return offerPutProductDiscountFineReducer(state, action);
    case Actions.OFFER_DELETE_PRODUCT_DISCOUNT_FINE:
      return offerDeleteProductDiscountFineReducer(state, action);
    case Actions.OFFER_ADD_PRODUCT_DISCOUNT_GROUND_SERVICE:
      return offerAddProductDiscountGroundServiceReducer(state, action);
    case Actions.OFFER_PUT_PRODUCT_DISCOUNT_GROUND_SERVICE:
      return offerPutProductDiscountGroundServiceReducer(state, action);
    case Actions.OFFER_DELETE_PRODUCT_DISCOUNT_GROUND_SERVICE:
      return offerDeleteProductDiscountGroundServiceReducer(state, action);

    case Actions.OFFER_ADD_PRODUCT_DISCOUNT_TRANSFER:
      return offerAddProductDiscountTransferReducer(state, action);
    case Actions.OFFER_PUT_PRODUCT_DISCOUNT_TRANSFER:
      return offerPutProductDiscountTransferReducer(state, action);
    case Actions.OFFER_DELETE_PRODUCT_DISCOUNT_TRANSFER:
      return offerDeleteProductDiscountTransferReducer(state, action);

    case Actions.OFFER_ADD_PRODUCT_DISCOUNT_SUPPLEMENT:
      return offerAddProductDiscountSupplementReducer(state, action);
    case Actions.OFFER_PUT_PRODUCT_DISCOUNT_SUPPLEMENT:
      return offerPutProductDiscountSupplementReducer(state, action);
    case Actions.OFFER_DELETE_PRODUCT_DISCOUNT_SUPPLEMENT:
      return offerDeleteProductDiscountSupplementReducer(state, action);

    default:
      return state;
  }
};

//
// Fine
//
export const offerAddProductDiscountFineReducer = (
  state: IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferAddProductDiscountFineAction
) => {
  return produce(state, draftState => {
    return addDiscountHandler(draftState, 'Fine');
  });
};

export const offerPutProductDiscountFineReducer = (
  state: IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferPutProductDiscountFineAction
) => {
  return produce(state, draftState => {
    return putDiscountHandler(draftState, 'Fine', action.fineDiscount);
  });
};

export const offerDeleteProductDiscountFineReducer = (
  state: IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferDeleteProductDiscountFineAction
) => {
  return produce(state, draftState => {
    return deleteDiscountHandler(draftState, 'Fine', action.index);
  });
};

//
// Ground Service
//
export const offerAddProductDiscountGroundServiceReducer = (
  state: IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferAddProductDiscountGroundServiceAction
) => {
  return produce(state, draftState => {
    return addDiscountHandler(draftState, 'Ground Service');
  });
};

export const offerPutProductDiscountGroundServiceReducer = (
  state: IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferPutProductDiscountGroundServiceAction
) => {
  return produce(state, draftState => {
    return putDiscountHandler(draftState, 'Ground Service', action.groundServiceDiscount);
  });
};

export const offerDeleteProductDiscountGroundServiceReducer = (
  state: IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferDeleteProductDiscountGroundServiceAction
) => {
  return produce(state, draftState => {
    return deleteDiscountHandler(draftState, 'Ground Service', action.index);
  });
};

//
// Transfer
//
export const offerAddProductDiscountTransferReducer = (
  state: IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferAddProductDiscountTransferAction
) => {
  return produce(state, draftState => {
    return addDiscountHandler(draftState, 'Transfer');
  });
};

export const offerPutProductDiscountTransferReducer = (
  state: IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferPutProductDiscountTransferAction
) => {
  return produce(state, draftState => {
    return putDiscountHandler(draftState, 'Transfer', action.transferDiscount);
  });
};

export const offerDeleteProductDiscountTransferReducer = (
  state: IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferDeleteProductDiscountTransferAction
) => {
  return produce(state, draftState => {
    return deleteDiscountHandler(draftState, 'Transfer', action.index);
  });
};

//
// Supplement
//
export const offerAddProductDiscountSupplementReducer = (
  state: IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferAddProductDiscountSupplementAction
) => {
  return produce(state, draftState => {
    return addDiscountHandler(draftState, 'Supplement');
  });
};

export const offerPutProductDiscountSupplementReducer = (
  state: IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferPutProductDiscountSupplementAction
) => {
  return produce(state, draftState => {
    return putDiscountHandler(draftState, 'Supplement', action.supplementDiscount);
  });
};

export const offerDeleteProductDiscountSupplementReducer = (
  state: IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferDeleteProductDiscountSupplementAction
) => {
  return produce(state, draftState => {
    return deleteDiscountHandler(draftState, 'Supplement', action.index);
  });
};

const addDiscountHandler = (
  draftState,
  discountType: keyof IOfferProductDiscounts<IUIOfferProductDiscountInstance>
) => {
  if (draftState === undefined) {
    draftState = {} as IOfferProductDiscounts<IUIOfferProductDiscountInstance>;
  }

  if (draftState[discountType] === undefined) {
    draftState[discountType] = [];
  }

  draftState[discountType].push({
    index: draftState[discountType].length,
    products: [],
  });

  return draftState;
};

const putDiscountHandler = (
  draftState,
  discountType: keyof IOfferProductDiscounts<IUIOfferProductDiscountInstance>,
  discountInstance
) => {
  if (draftState === undefined || draftState[discountType] === undefined) {
    return draftState;
  }

  // if we're trying to put a discount for an index that doens't exist, just return the state
  const fineArrayIndex = draftState[discountType].findIndex(s => s.index === discountInstance.index);
  if (fineArrayIndex === -1) {
    return draftState;
  }

  draftState[discountType].splice(fineArrayIndex, 1);
  draftState[discountType] = [...draftState[discountType], discountInstance];
  draftState[discountType] = sortObjectsByIndex(draftState[discountType]);

  return draftState;
};

const deleteDiscountHandler = (
  draftState,
  discountType: keyof IOfferProductDiscounts<IUIOfferProductDiscountInstance>,
  index: number
) => {
  if (draftState === undefined || draftState[discountType] === undefined) {
    return draftState;
  }

  const indexToDelete = draftState[discountType].findIndex(sup => sup.index === index);

  if (indexToDelete === -1) {
    return draftState;
  }

  draftState[discountType].splice(indexToDelete, 1);
  return draftState;
};
