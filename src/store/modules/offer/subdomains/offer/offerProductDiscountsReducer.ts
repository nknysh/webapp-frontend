import * as Actions from '../../actions';
import produce from 'immer';
import { IOfferProductDiscounts, IUIOfferProductDiscountInstance } from 'services/BackendApi';
import { GET_OFFER_SUCCESS } from '../../actions';
import { sortObjectsByIndex, getProductDiscountsOrInitial } from '../../utils';

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
    if (draftState === undefined) {
      draftState = {} as IOfferProductDiscounts<IUIOfferProductDiscountInstance>;
    }

    if (draftState.Fine === undefined) {
      draftState.Fine = [];
    }

    draftState.Fine.push({
      index: draftState?.Fine.length,
      products: [],
    });

    return draftState;
  });
};

export const offerPutProductDiscountFineReducer = (
  state: IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferPutProductDiscountFineAction
) => {
  return produce(state, draftState => {
    if (draftState === undefined || draftState.Fine === undefined) {
      return draftState;
    }

    // if we're trying to put a discount for an index that doens't exist, just return the state
    const fineArrayIndex = draftState.Fine.findIndex(s => s.index === action.fineDiscount.index);
    if (fineArrayIndex === -1) {
      return draftState;
    }

    draftState.Fine.splice(fineArrayIndex, 1);
    draftState.Fine = [...draftState.Fine, action.fineDiscount];
    draftState.Fine = sortObjectsByIndex(draftState.Fine);

    return draftState;
  });
};

export const offerDeleteProductDiscountFineReducer = (
  state: IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferDeleteProductDiscountFineAction
) => {
  return produce(state, draftState => {
    if (draftState === undefined || draftState.Fine === undefined) {
      return draftState;
    }

    const indexToDelete = draftState.Fine.findIndex(sup => sup.index === action.index);

    if (indexToDelete === -1) {
      return draftState;
    }

    draftState?.Fine.splice(indexToDelete, 1);
    return draftState;
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
    if (draftState === undefined) {
      draftState = {} as IOfferProductDiscounts<IUIOfferProductDiscountInstance>;
    }

    if (draftState['Ground Service'] === undefined || draftState['Ground Service'].length <= 0) {
      draftState['Ground Service'] = [];
    }

    draftState['Ground Service'].push({
      index: draftState['Ground Service'].length,
      products: [],
    });

    return draftState;
  });
};

export const offerPutProductDiscountGroundServiceReducer = (
  state: IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferPutProductDiscountGroundServiceAction
) => {
  return produce(state, draftState => {
    if (draftState === undefined || draftState['Ground Service'] === undefined) {
      return draftState;
    }

    // if we're trying to put a discount for an index that doens't exist, just return the state
    const fineArrayIndex = draftState['Ground Service'].findIndex(s => s.index === action.groundServiceDiscount.index);
    if (fineArrayIndex === -1) {
      return draftState;
    }

    draftState['Ground Service'].splice(fineArrayIndex, 1);
    draftState['Ground Service'] = [...draftState['Ground Service'], action.groundServiceDiscount];
    draftState['Ground Service'] = sortObjectsByIndex(draftState['Ground Service']);

    return draftState;
  });
};

export const offerDeleteProductDiscountGroundServiceReducer = (
  state: IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferDeleteProductDiscountGroundServiceAction
) => {
  return produce(state, draftState => {
    if (draftState === undefined || draftState['Ground Service'] === undefined) {
      return draftState;
    }

    const indexToDelete = draftState['Ground Service'].findIndex(sup => sup.index === action.index);

    if (indexToDelete === -1) {
      return draftState;
    }

    draftState['Ground Service'].splice(indexToDelete, 1);
    return draftState;
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
    if (draftState === undefined) {
      draftState = {} as IOfferProductDiscounts<IUIOfferProductDiscountInstance>;
    }

    if (draftState.Transfer === undefined) {
      draftState.Transfer = [];
    }

    draftState.Transfer.push({
      index: draftState.Transfer.length,
      products: [],
    });

    return draftState;
  });
};

export const offerPutProductDiscountTransferReducer = (
  state: IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferPutProductDiscountTransferAction
) => {
  return produce(state, draftState => {
    if (draftState === undefined || draftState.Transfer === undefined) {
      return draftState;
    }

    // if we're trying to put a discount for an index that doens't exist, just return the state
    const fineArrayIndex = draftState.Transfer.findIndex(s => s.index === action.transferDiscount.index);
    if (fineArrayIndex === -1) {
      return draftState;
    }

    draftState.Transfer.splice(fineArrayIndex, 1);
    draftState.Transfer = [...draftState.Transfer, action.transferDiscount];
    draftState.Transfer = sortObjectsByIndex(draftState.Transfer);

    return draftState;
  });
};

export const offerDeleteProductDiscountTransferReducer = (
  state: IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferDeleteProductDiscountTransferAction
) => {
  return produce(state, draftState => {
    if (draftState === undefined || draftState.Transfer === undefined) {
      return draftState;
    }

    const indexToDelete = draftState.Transfer.findIndex(sup => sup.index === action.index);

    if (indexToDelete === -1) {
      return draftState;
    }

    draftState?.Transfer.splice(indexToDelete, 1);
    return draftState;
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
    if (draftState === undefined) {
      draftState = {} as IOfferProductDiscounts<IUIOfferProductDiscountInstance>;
    }

    if (draftState.Supplement === undefined) {
      draftState.Supplement = [];
    }

    draftState.Supplement.push({
      index: draftState.Supplement.length,
      products: [],
    });

    return draftState;
  });
};

export const offerPutProductDiscountSupplementReducer = (
  state: IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferPutProductDiscountSupplementAction
) => {
  return produce(state, draftState => {
    if (draftState === undefined || draftState.Supplement === undefined) {
      return draftState;
    }

    // if we're trying to put a discount for an index that doens't exist, just return the state
    const fineArrayIndex = draftState.Supplement.findIndex(s => s.index === action.supplementDiscount.index);
    if (fineArrayIndex === -1) {
      return draftState;
    }

    draftState.Supplement.splice(fineArrayIndex, 1);
    draftState.Supplement = [...draftState.Supplement, action.supplementDiscount];
    draftState.Supplement = sortObjectsByIndex(draftState.Supplement);

    return draftState;
  });
};

export const offerDeleteProductDiscountSupplementReducer = (
  state: IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined,
  action: Actions.OfferDeleteProductDiscountSupplementAction
) => {
  return produce(state, draftState => {
    if (draftState === undefined || draftState.Supplement === undefined) {
      return draftState;
    }

    const indexToDelete = draftState.Supplement.findIndex(sup => sup.index === action.index);

    if (indexToDelete === -1) {
      return draftState;
    }

    draftState?.Supplement.splice(indexToDelete, 1);
    return draftState;
  });
};
