import {
  IOfferProductDiscountInstance,
  IOfferUI,
  IOfferAPI,
  IOfferProductDiscounts,
  IOfferSubProductDiscounts,
  IUIOfferProductDiscountInstance,
  IDiscountProduct,
} from 'services/BackendApi';

import uuid from 'uuid';
import produce from 'immer';
import * as R from 'ramda';
import { IOfferUiState, ECombinationMode, OrderedOffer } from './model';
import { sanitizeInteger } from 'utils/number';
import {
  OfferAddProductToProductDiscountAction,
  OfferRemoveProductDiscountAction,
  OfferAddProductDiscountAction,
  OfferRemoveProductFromProductDiscountAction,
  OfferUpdateProductDiscountAction,
  OfferToggleProductDiscountAgeNameAction,
  OfferToggleSubProductDiscountAgeNameAction,
  OfferRemoveProductFromSubProductDiscountAction,
  OfferAddProductToSubProductDiscountAction,
  OfferUpdateSubProductDiscountAction,
  OfferAddSubProductDiscountAction,
  OfferRemoveSubProductDiscountAction,
  OfferToggleProductOnProductDiscountAction,
  OfferToggleProductOnSubProductDiscountAction,
} from './subdomains/offer/actions';
import { without } from 'ramda';
import product from 'ramda/es/product';

export const getAllAssociatedProductUuidsFromOffer = (offer: IOfferUI) => {
  const productUuids = offer.prerequisites.accommodationProducts ? offer.prerequisites.accommodationProducts : [];

  if (offer.productDiscounts != undefined) {
    Object.values(offer.productDiscounts).map((productBlocks: IOfferProductDiscountInstance[]) => {
      productBlocks.forEach(productBlock => {
        productBlock.products.map(p => {
          productUuids.push(p.uuid);
        });
      });
    });
  }

  if (offer.subProductDiscounts != undefined) {
    Object.values(offer.subProductDiscounts).map((productBlocks: IOfferProductDiscountInstance[]) => {
      productBlocks.forEach(productBlock => {
        productBlock.products.map(p => {
          productUuids.push(p.uuid);
        });
      });
    });
  }
  return productUuids;
};

export const hasOfferGotApplications = (offer: IOfferUI) => {
  if (!offer.stepping && !offer.accommodationProductDiscount && !offer.productDiscounts && !offer.subProductDiscounts) {
    return false;
  }
  return true;
};

export const returnObjectWithUndefinedsAsEmptyStrings = <T>(obj): T | undefined => {
  if (!obj) {
    return undefined;
  }
  const parsedObject = {};
  Object.keys(obj).forEach(steppingKey => {
    parsedObject[steppingKey] = !obj || obj[steppingKey] === undefined ? '' : obj[steppingKey];
  });
  return parsedObject as T;
};

export const transformApiOfferToUiOffer = (offer: IOfferAPI): IOfferUI => {
  return produce(offer, (draftOffer: IOfferUI) => {
    if (draftOffer.subProductDiscounts?.Supplement) {
      draftOffer.subProductDiscounts.Supplement = draftOffer.subProductDiscounts.Supplement.map(discount => {
        discount.uuid = uuid.v4();
        return discount;
      });
    }

    if (draftOffer.subProductDiscounts['Meal Plan']) {
      draftOffer.subProductDiscounts['Meal Plan'] = draftOffer.subProductDiscounts['Meal Plan']?.map(
        (discount, arrayIndex) => {
          discount.uuid = uuid.v4();
          return discount;
        }
      );
    }

    if (draftOffer.productDiscounts?.Fine) {
      draftOffer.productDiscounts.Fine = draftOffer.productDiscounts.Fine.map((discount, arrayIndex) => {
        discount.uuid = uuid.v4();
        return discount;
      });
    }

    if (draftOffer.productDiscounts?.['Ground Service']) {
      draftOffer.productDiscounts['Ground Service'] = draftOffer.productDiscounts['Ground Service'].map(
        (discount, arrayIndex) => {
          discount.uuid = uuid.v4();
          return discount;
        }
      );
    }

    if (draftOffer.productDiscounts?.Transfer) {
      draftOffer.productDiscounts.Transfer = draftOffer.productDiscounts.Transfer.map((discount, arrayIndex) => {
        discount.uuid = uuid.v4();
        return discount;
      });
    }

    if (draftOffer.productDiscounts?.Supplement) {
      draftOffer.productDiscounts.Supplement = draftOffer.productDiscounts.Supplement.map((discount, arrayIndex) => {
        discount.uuid = uuid.v4();
        return discount;
      });
    }

    return draftOffer;
  });
};

export const transformUiOfferToApiOffer = (offer: IOfferUI, uiState: IOfferUiState): IOfferAPI => {
  return produce(offer, (draftOffer: IOfferAPI) => {
    if (draftOffer.subProductDiscounts?.Supplement) {
      draftOffer.subProductDiscounts.Supplement = draftOffer.subProductDiscounts.Supplement.map(discount => {
        const newSupplement: IOfferProductDiscountInstance = {
          products: discount.products,
          discountPercentage: discount.discountPercentage,
          greenTaxDiscountApproach: discount.greenTaxDiscountApproach,
          maximumQuantity: discount.maximumQuantity,
        };
        return newSupplement;
      });
    }

    if (draftOffer.subProductDiscounts?.['Meal Plan']) {
      draftOffer.subProductDiscounts['Meal Plan'] = draftOffer.subProductDiscounts['Meal Plan'].map(discount => {
        const newSupplement: IOfferProductDiscountInstance = {
          products: discount.products,
          discountPercentage: discount.discountPercentage,
          greenTaxDiscountApproach: discount.greenTaxDiscountApproach,
          maximumQuantity: discount.maximumQuantity,
        };
        return newSupplement;
      });
    }

    if (draftOffer.productDiscounts?.Fine) {
      draftOffer.productDiscounts.Fine = draftOffer.productDiscounts.Fine.map((discount, arrayIndex) => {
        const newSupplement: IOfferProductDiscountInstance = {
          products: discount.products,
          discountPercentage: discount.discountPercentage,
          greenTaxDiscountApproach: discount.greenTaxDiscountApproach,
          maximumQuantity: discount.maximumQuantity,
        };
        return newSupplement;
      });
    }

    if (draftOffer.furtherInformation === '') {
      draftOffer.furtherInformation = null;
    }

    if (draftOffer.productDiscounts?.['Ground Service']) {
      draftOffer.productDiscounts['Ground Service'] = draftOffer.productDiscounts['Ground Service'].map(discount => {
        const newSupplement: IOfferProductDiscountInstance = {
          products: discount.products,
          discountPercentage: discount.discountPercentage,
          greenTaxDiscountApproach: discount.greenTaxDiscountApproach,
          maximumQuantity: discount.maximumQuantity,
        };
        return newSupplement;
      });
    }

    if (draftOffer.productDiscounts?.Supplement) {
      draftOffer.productDiscounts.Supplement = draftOffer.productDiscounts.Supplement.map((discount, arrayIndex) => {
        const newSupplement: IOfferProductDiscountInstance = {
          products: discount.products,
          discountPercentage: discount.discountPercentage,
          greenTaxDiscountApproach: discount.greenTaxDiscountApproach,
          maximumQuantity: discount.maximumQuantity,
        };
        return newSupplement;
      });
    }

    if (draftOffer.productDiscounts?.Transfer) {
      draftOffer.productDiscounts.Transfer = draftOffer.productDiscounts.Transfer.map((discount, arrayIndex) => {
        const newSupplement: IOfferProductDiscountInstance = {
          products: discount.products,
          discountPercentage: discount.discountPercentage,
          greenTaxDiscountApproach: discount.greenTaxDiscountApproach,
          maximumQuantity: discount.maximumQuantity,
        };
        return newSupplement;
      });
    }

    // handle offer `combines`, `combinesWith` and `cannotCombineWith`
    // basd on UI state
    switch (uiState.combinationMode) {
      case ECombinationMode.COMBINES_WITH_ANY:
        draftOffer.combines = true;
        break;
      case ECombinationMode.COMBINES_WITH_NONE:
        draftOffer.combines = false;
        break;
      case ECombinationMode.COMBINES_WITH_LIST:
        draftOffer.combines = true;
        draftOffer.combinesWith = uiState.combinationOfferUuids;
      case ECombinationMode.CANNOT_COMBINE_WITH_LIST:
        draftOffer.combines = true;
        draftOffer.cannotCombineWith = uiState.combinationOfferUuids;
        break;
    }

    if(uiState.isTextOnly) {
      draftOffer.productDiscounts = {};
      draftOffer.subProductDiscounts = {};
      draftOffer.stepping = undefined;
      draftOffer.accommodationProductDiscount = undefined;
    }

    return draftOffer;
  });
};

export const getSubProductDiscountsOrInitial = (
  subProductDiscounts: IOfferSubProductDiscounts<IUIOfferProductDiscountInstance> | undefined
) => {
  if (subProductDiscounts !== undefined) {
    return subProductDiscounts;
  } else {
    return {
      'Meal Plan': [],
      Supplement: [],
    };
  }
};

export const getProductDiscountsOrInitial = (
  productDiscounts: IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined
) => {
  if (productDiscounts !== undefined) {
    return productDiscounts;
  } else {
    return {
      Transfer: [],
      'Ground Service': [],
      Fine: [],
      Supplement: [],
    };
  }
};

export const addDiscountHandler = (
  state: IOfferUI['productDiscounts'] | IOfferUI['subProductDiscounts'],
  action: OfferAddProductDiscountAction | OfferAddSubProductDiscountAction
): IOfferProductDiscounts<IUIOfferProductDiscountInstance> => {
  const { discountType } = action;
  const newState: IOfferProductDiscounts<IUIOfferProductDiscountInstance> = state === undefined ? {} : { ...state };
  newState[discountType] = !newState[discountType] ? [] : [...newState[discountType]];
  const newProductDiscount: IUIOfferProductDiscountInstance = {
    uuid: uuid.v4(),
    products: [],
  };

  if((action as OfferAddSubProductDiscountAction).productUuid) {
    newProductDiscount.products.push({uuid: (action as OfferAddSubProductDiscountAction).productUuid!, ageNames: []});
  }

  return {
    ...newState,
    [discountType]: [...newState[discountType]!, newProductDiscount],
  };
};

export const removeDiscountHandler = (
  state: IOfferUI['productDiscounts'] | IOfferUI['subProductDiscounts'],
  action: OfferRemoveProductDiscountAction | OfferRemoveSubProductDiscountAction
): IOfferProductDiscounts<IUIOfferProductDiscountInstance> => {
  const { discountType, uuid } = action;

  return {
    ...state,
    [discountType]: state![discountType]!.filter(d => d.uuid !== uuid),
  };
};

export const updateDiscountHandler = (
  state: IOfferUI['productDiscounts'] | IOfferUI['subProductDiscounts'],
  action: OfferUpdateProductDiscountAction | OfferUpdateSubProductDiscountAction
): IOfferProductDiscounts<IUIOfferProductDiscountInstance> | undefined => {
  const { discountType, uuid, key, newValue, currentValue } = action;

  // const sanitizedValue =
  //   key === 'discountPercentage' || key === 'maximumQuantity'
  //     ? sanitizeInteger(newValue as string, currentValue)
  //     : newValue;
  const sanitizedValue = parseFloat(newValue as string);

  const newDiscountType = state![discountType]!.map(discount => {
    if (discount.uuid !== uuid) {
      return discount;
    }

    return {
      ...discount,
      [key]: sanitizedValue,
    };
  });
  return {
    ...state,
    [discountType]: newDiscountType,
  };
};

export const addProductToDiscountHandler = (
  state: IOfferUI['productDiscounts'] | IOfferUI['subProductDiscounts'],
  action: OfferAddProductToProductDiscountAction | OfferAddProductToSubProductDiscountAction
): IOfferProductDiscounts<IUIOfferProductDiscountInstance> => {
  const { discountType, discountUuid, product, } = action;

  const discountIndex = state![discountType]?.findIndex(d => d.uuid === discountUuid);
  const discountToUpdate = state![discountType]![discountIndex!];
  
  const newProduct: IDiscountProduct = {
    uuid: product.uuid,
    ageNames: [],
  }
  const updatedDiscount: IUIOfferProductDiscountInstance = {
    ...discountToUpdate,
    products: [
      ...discountToUpdate.products,
      newProduct,
    ]
  }

  const updatedDiscountType = [...state![discountType]];
  updatedDiscountType[discountIndex!] = updatedDiscount;

  return {
    ...state,
    [discountType]: updatedDiscountType,
  };
};

export const removeProductFromDiscountHandler = (
  state: IOfferUI['productDiscounts'] | IOfferUI['subProductDiscounts'],
  action: OfferRemoveProductFromProductDiscountAction | OfferRemoveProductFromSubProductDiscountAction
) => {
  const { discountType, discountUuid, productUuid } = action;

  const newDiscountType = state![discountType]!.map(discount => {
    if (discount.uuid !== discountUuid) {
      return discount;
    }

    return {
      ...discount,
      products: discount.products.filter(product => product.uuid !== productUuid),
    };
  });
  return {
    ...state,
    [discountType]: newDiscountType,
  };
};

export const toggleDiscountAgeName = (
  state: IOfferUI['productDiscounts'] | IOfferUI['subProductDiscounts'],
  action: OfferToggleProductDiscountAgeNameAction | OfferToggleSubProductDiscountAgeNameAction
) => {
  const { discountType, discountUuid, productUuid, ageName } = action;
  const updatedDiscounType = [...state![discountType]!];
  const subProductDiscountToUpdate = updatedDiscounType.find(dt => dt.uuid === discountUuid)!;
  const updateIndex = updatedDiscounType.findIndex(dt => dt.uuid === discountUuid);

  const updatedProducts = subProductDiscountToUpdate.products.map(p => {
    const arr = p.ageNames ? p.ageNames : [];
    return {
      ...p,
      ageNames: arr.includes(action.ageName) ? without([action.ageName], arr) : [...arr, action.ageName],
    };
  });

  const updatedProductDiscount: IUIOfferProductDiscountInstance = {
    ...subProductDiscountToUpdate,
    products: updatedProducts,
  };

  updatedDiscounType[updateIndex] = updatedProductDiscount;

  return {
    ...state,
    [discountType]: updatedDiscounType,
  };
};

export const toggleProductOnDiscount = (
  state: IOfferUI['productDiscounts'] | IOfferUI['subProductDiscounts'],
  action: OfferToggleProductOnProductDiscountAction | OfferToggleProductOnSubProductDiscountAction
): IOfferUI['productDiscounts'] | IOfferUI['subProductDiscounts'] => {
  const { discountType, discountUuid, productUuid } = action;
  
  const discountIndex = state![discountType]?.findIndex(d => d.uuid === discountUuid);
  const discountToUpdate = state![discountType]![discountIndex!];
  
  const newProduct: IDiscountProduct = {
    uuid: productUuid,
    ageNames: [],
  }

  const updatedDiscount: IUIOfferProductDiscountInstance = {
    ...discountToUpdate,
    products: discountToUpdate.products.findIndex(p => p.uuid === productUuid) > -1
      ? discountToUpdate.products.filter(p => p.uuid !== productUuid)
      : [...discountToUpdate.products, newProduct]
  }

  const updatedDiscountType = [...state![discountType]];
  updatedDiscountType[discountIndex!] = updatedDiscount

  return {
    ...state,
    [discountType]: newDiscountType,
  };
};

export const toOrderedOffer = (offer: IOfferOnHotelItem | IOfferUI | OrderedOffer): OrderedOffer => ({
  uuid: offer.uuid,
  name: offer.name,
});

export const getOrderedOffers = (offers: IOfferOnHotelItem[] = []): OrderedOffer[] =>
  R
    .sortBy(item => item.order, offers)
    .map(item => toOrderedOffer(item));
    [discountType]: updatedDiscountType
  }
}

export const toggleAgeNameOnProductDiscountProduct = (
  state: IOfferUI['productDiscounts'] | IOfferUI['subProductDiscounts'],
  action: OfferToggleAgeNameOnProductAction | OfferToggleAgeNameOnSubProductAction
): IOfferUI['productDiscounts'] | IOfferUI['subProductDiscounts'] => {
  console.log('toggleAgeNameOnProductDiscountProduct');
  const { discountType, discountUuid, productUuid, ageName } = action;
  console.log({discountType, discountUuid, productUuid, ageName});
  const discountIndex = state![discountType]?.findIndex(d => d.uuid === discountUuid);
  const newDiscount: IUIOfferProductDiscountInstance  = {...state![discountType]![discountIndex!]};
  const productIndex = newDiscount.products.findIndex(p => p.uuid === productUuid);
  const productToUpdate: IDiscountProduct = newDiscount.products[productIndex];

  console.log('roductToUpdate.ageNames.includes(ageName)', productToUpdate.ageNames, productToUpdate.ageNames.includes(ageName))
  const newProduct = {
    ...productToUpdate,
    ageNames: productToUpdate.ageNames.includes(ageName)
      ? productToUpdate.ageNames.filter(an => an !== ageName)
      : [...productToUpdate.ageNames, ageName],
  }

  console.log('newProduct', newProduct);

  // Safe to mutate
  newDiscount.products[productIndex] = newProduct;
  console.log('newDiscount', newDiscount);

  const updatedDiscountType = [...state![discountType]];
  updatedDiscountType[discountIndex] = newDiscount
  console.log('updatedDiscountType', updatedDiscountType);

  const ret = {
    ...state,
    [discountType]: updatedDiscountType
  }

  console.log(ret);
  return ret;
}

export const clearAllProductsFromDiscounts = (discounts: IOfferProductDiscounts<any> | IOfferSubProductDiscounts<any>) => {
  const out = Object.keys(discounts).reduce((acc, nextKey) => {
    acc[nextKey] = discounts[nextKey].map(d => ({uuid: d.uuid, products: []}));
    return acc;
  }, {});
  return out;
}

