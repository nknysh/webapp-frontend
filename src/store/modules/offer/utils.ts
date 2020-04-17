import {
  IOfferProductDiscountInstance,
  IOfferUI,
  IOfferAPI,
  IOfferProductDiscounts,
  IOfferSubProductDiscounts,
  IUIOfferProductDiscountInstance,
  IDiscountProduct,
  IProduct,
} from 'services/BackendApi';

import uuid from 'uuid';
import produce from 'immer';
import { IOfferUiState, ECombinationMode, OrderedOffer } from './model';
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
  OfferToggleAgeNameOnProductAction,
  OfferToggleAgeNameOnSubProductAction,
} from './subdomains/offer/actions';
import { without } from 'ramda';
import { EProductCategory, IOfferOnHotelItem } from '../../../services/BackendApi/types/OfferResponse';
import * as R from 'ramda';

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
    if (draftOffer.productDiscounts === null) {
      draftOffer.productDiscounts = {};
    }

    if (draftOffer.subProductDiscounts === null) {
      draftOffer.subProductDiscounts = {};
    }

    if (draftOffer.subProductDiscounts?.Supplement) {
      draftOffer.subProductDiscounts.Supplement = draftOffer.subProductDiscounts.Supplement.map(discount => {
        discount.uuid = uuid.v4();
        return discount;
      });
    }

    if (draftOffer.subProductDiscounts?.['Meal Plan']) {
      draftOffer.subProductDiscounts['Meal Plan'] = draftOffer.subProductDiscounts['Meal Plan']?.map(discount => {
        discount.uuid = uuid.v4();
        return discount;
      });
    }

    if (draftOffer.productDiscounts?.Fine) {
      draftOffer.productDiscounts.Fine = draftOffer.productDiscounts.Fine.map(discount => {
        discount.uuid = uuid.v4();
        return discount;
      });
    }

    if (draftOffer.productDiscounts?.['Ground Service']) {
      draftOffer.productDiscounts['Ground Service'] = draftOffer.productDiscounts['Ground Service'].map(discount => {
        discount.uuid = uuid.v4();
        return discount;
      });
    }

    if (draftOffer.productDiscounts?.Transfer) {
      draftOffer.productDiscounts.Transfer = draftOffer.productDiscounts.Transfer.map(discount => {
        discount.uuid = uuid.v4();
        return discount;
      });
    }

    if (draftOffer.productDiscounts?.Supplement) {
      draftOffer.productDiscounts.Supplement = draftOffer.productDiscounts.Supplement.map(discount => {
        discount.uuid = uuid.v4();
        return discount;
      });
    }

    return draftOffer;
  });
};

export const sanitizeFloat = (value: string | undefined | number | null): number | null => {
  if (value === undefined || value === '' || value === null) {
    return null;
  }
  if (typeof value === 'number') {
    value as number;
  }
  return parseFloat(value as string);
};

export const sanitizeInt = (value: string | undefined | number | null) => {
  if (value === undefined || value === '' || value === null) {
    return null;
  }
  if (typeof value === 'number') {
    value;
  }
  return parseInt(value as string, 10);
};

export const transformUiOfferToApiOffer = (offer: IOfferUI, uiState: IOfferUiState): IOfferAPI => {
  // Removes non-API data from each discount
  // also removes ageNames against each product if ageNames is set but has a length of 0, fixing several https://github.com/pure-escapes/webapp-frontend/issues/483 issues
  const productDiscountInstanceTransform = (discount: IOfferProductDiscountInstance) => {
    const products = discount.products.map(product => {
      if (product.ageNames && product.ageNames.length <= 0) {
        delete product.ageNames;
      }
      return product;
    });

    return {
      products,
      discountPercentage: sanitizeFloat(discount.discountPercentage),
      greenTaxDiscountApproach: discount.greenTaxDiscountApproach,
      maximumQuantity: sanitizeInt(discount.maximumQuantity),
    };
  };
  return produce(offer, (draftOffer: IOfferAPI) => {
    if (draftOffer.subProductDiscounts?.Supplement) {
      draftOffer.subProductDiscounts.Supplement = draftOffer.subProductDiscounts.Supplement.map(discount => {
        const newSupplement: IOfferProductDiscountInstance = productDiscountInstanceTransform(discount);
        return newSupplement;
      });
    }

    if (draftOffer.subProductDiscounts?.['Meal Plan']) {
      draftOffer.subProductDiscounts['Meal Plan'] = draftOffer.subProductDiscounts['Meal Plan'].map(discount => {
        const newSupplement: IOfferProductDiscountInstance = productDiscountInstanceTransform(discount);
        return newSupplement;
      });
    }

    if (draftOffer.productDiscounts?.Fine) {
      draftOffer.productDiscounts.Fine = draftOffer.productDiscounts.Fine.map((discount, arrayIndex) => {
        const newSupplement: IOfferProductDiscountInstance = productDiscountInstanceTransform(discount);
        return newSupplement;
      });
    }

    if (draftOffer.furtherInformation === '') {
      delete draftOffer.furtherInformation;
    }

    if (draftOffer.productDiscounts?.['Ground Service']) {
      draftOffer.productDiscounts['Ground Service'] = draftOffer.productDiscounts['Ground Service'].map(discount => {
        const newSupplement: IOfferProductDiscountInstance = productDiscountInstanceTransform(discount);
        return newSupplement;
      });
    }

    if (draftOffer.productDiscounts?.Supplement) {
      draftOffer.productDiscounts.Supplement = draftOffer.productDiscounts.Supplement.map((discount, arrayIndex) => {
        const newSupplement: IOfferProductDiscountInstance = productDiscountInstanceTransform(discount);
        return newSupplement;
      });
    }

    if (draftOffer.accommodationProductDiscount) {
      draftOffer.accommodationProductDiscount = {
        discountPercentage: sanitizeFloat(draftOffer.accommodationProductDiscount.discountPercentage),
        greenTaxDiscountApproach: draftOffer.accommodationProductDiscount.greenTaxDiscountApproach,
      };
    }

    if (draftOffer.stepping) {
      draftOffer.stepping = {
        applyTo: sanitizeInt(draftOffer.stepping.applyTo),
        maximumNights: sanitizeInt(draftOffer.stepping.maximumNights),
        everyXNights: sanitizeInt(draftOffer.stepping.everyXNights),
        discountCheapest: draftOffer.stepping.discountCheapest,
      };
    }

    if (draftOffer.productDiscounts?.Transfer) {
      draftOffer.productDiscounts.Transfer = draftOffer.productDiscounts.Transfer.map((discount, arrayIndex) => {
        const newSupplement: IOfferProductDiscountInstance = productDiscountInstanceTransform(discount);
        return newSupplement;
      });
    }

    // handle offer `combines`, `combinesWith` and `cannotCombineWith`
    // based on UI state
    // setting values to undefined handles issues found in // fixes https://github.com/pure-escapes/webapp-frontend/issues/483 > Prerequisites > Data
    switch (uiState.combinationMode) {
      case ECombinationMode.COMBINES_WITH_ANY:
        draftOffer.combines = true;
        delete draftOffer.combinesWith;
        delete draftOffer.cannotCombineWith;
        break;
      case ECombinationMode.COMBINES_WITH_NONE:
        draftOffer.combines = false;
        delete draftOffer.combinesWith;
        delete draftOffer.cannotCombineWith;
        break;
      case ECombinationMode.COMBINES_WITH_LIST:
        draftOffer.combines = true;
        draftOffer.combinesWith = uiState.combinationOfferUuids;
        delete draftOffer.cannotCombineWith;
        break;
      case ECombinationMode.CANNOT_COMBINE_WITH_LIST:
        draftOffer.combines = true;
        delete draftOffer.combinesWith;
        draftOffer.cannotCombineWith = uiState.combinationOfferUuids;
        break;
    }

    if (uiState.isTextOnly) {
      delete draftOffer.productDiscounts;
      delete draftOffer.subProductDiscounts;
      delete draftOffer.stepping;
      delete draftOffer.accommodationProductDiscount;
    }

    // fixes https://github.com/pure-escapes/webapp-frontend/issues/483 > Prerequisites > Data > 1
    if (draftOffer.prerequisites.countryCodes && draftOffer.prerequisites.countryCodes.length <= 0) {
      delete draftOffer.prerequisites.countryCodes;
    }

    // fixes https://github.com/pure-escapes/webapp-frontend/issues/483 > Prerequisites > Data > 2
    if (draftOffer.prerequisites.accommodationProducts && draftOffer.prerequisites.accommodationProducts.length <= 0) {
      delete draftOffer.prerequisites.accommodationProducts;
    }

    // fixes https://github.com/pure-escapes/webapp-frontend/issues/483 > Prerequisites > Data > 7
    if (
      draftOffer.prerequisites.stayLength &&
      draftOffer.prerequisites.stayLength.minimum == null &&
      draftOffer.prerequisites.stayLength.maximum == null
    ) {
      delete draftOffer.prerequisites.stayLength;
    }

    // fixes https://github.com/pure-escapes/webapp-frontend/issues/483 > Prerequisites > Data > 9
    if (
      draftOffer.prerequisites.advance &&
      draftOffer.prerequisites.advance.minimum == null &&
      draftOffer.prerequisites.advance.maximum == null
    ) {
      delete draftOffer.prerequisites.advance;
    }

    // fixes https://github.com/pure-escapes/webapp-frontend/issues/483 > Applications > Data
    const productDiscountTypes: (keyof IOfferProductDiscounts<IUIOfferProductDiscountInstance>)[] = [
      'Fine',
      'Transfer',
      'Supplement',
      'Ground Service',
    ];
    const subProductDiscountTypes: (keyof IOfferSubProductDiscounts<IUIOfferProductDiscountInstance>)[] = [
      'Meal Plan',
      'Supplement',
    ];
    productDiscountTypes.forEach(discountType => {
      if (
        draftOffer.productDiscounts &&
        draftOffer.productDiscounts[discountType] &&
        // @ts-ignore TODO whats up with needing this?
        draftOffer.productDiscounts[discountType].length <= 0
      ) {
        delete draftOffer.productDiscounts[discountType];
      }
    });

    subProductDiscountTypes.forEach(discountType => {
      if (
        draftOffer.subProductDiscounts &&
        draftOffer.subProductDiscounts[discountType] &&
        // @ts-ignore TODO whats up with needing this?
        draftOffer.subProductDiscounts[discountType].length <= 0
      ) {
        delete draftOffer.subProductDiscounts[discountType];
      }
    });

    // do the below AFTER transforming the individual discount objects
    // fixes https://github.com/pure-escapes/webapp-frontend/issues/483 > Prerequisites > Data > 4
    if (Object.keys(draftOffer.productDiscounts || {}).length <= 0) {
      delete draftOffer.productDiscounts;
    }
    // fixes https://github.com/pure-escapes/webapp-frontend/issues/483 > Prerequisites > Data > 3
    if (Object.keys(draftOffer.subProductDiscounts || {}).length <= 0) {
      delete draftOffer.subProductDiscounts;
    }

    // fixes https://github.com/pure-escapes/webapp-frontend/issues/483 > Applications > Data > Stepping
    if (draftOffer.stepping && draftOffer.stepping.everyXNights == null && draftOffer.stepping.applyTo == null) {
      delete draftOffer.stepping;
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

  if ((action as OfferAddSubProductDiscountAction).productUuid) {
    newProductDiscount.products.push({ uuid: (action as OfferAddSubProductDiscountAction).productUuid!, ageNames: [] });
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
): IOfferProductDiscounts<IUIOfferProductDiscountInstance> => {
  const { discountType, uuid, key, newValue } = action;

  const sanitizedValue = newValue as string;

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
  const { discountType, discountUuid, product } = action;

  const discountIndex = state![discountType]?.findIndex(d => d.uuid === discountUuid);
  const discountToUpdate = state![discountType]![discountIndex!];

  const newProduct: IDiscountProduct = {
    uuid: product.uuid,
    ageNames: [],
  };
  const updatedDiscount: IUIOfferProductDiscountInstance = {
    ...discountToUpdate,
    products: [...discountToUpdate.products, newProduct],
  };

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
  const productDiscountToUpdate = updatedDiscounType.find(dt => dt.uuid === discountUuid)!;
  const updateIndex = updatedDiscounType.findIndex(dt => dt.uuid === discountUuid);

  const updatedProducts = productDiscountToUpdate.products.map(p => {
    if (p.uuid !== productUuid) {
      return p;
    }

    const arr = p.ageNames ? p.ageNames : [];
    return {
      ...p,
      ageNames: arr.includes(ageName) ? without([ageName], arr) : [...arr, ageName],
    };
  });

  const updatedProductDiscount: IUIOfferProductDiscountInstance = {
    ...productDiscountToUpdate,
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
  };

  const updatedDiscount: IUIOfferProductDiscountInstance = {
    ...discountToUpdate,
    products:
      discountToUpdate.products.findIndex(p => p.uuid === productUuid) > -1
        ? discountToUpdate.products.filter(p => p.uuid !== productUuid)
        : [...discountToUpdate.products, newProduct],
  };

  const updatedDiscountType = [...state![discountType]];
  updatedDiscountType[discountIndex!] = updatedDiscount;

  return {
    ...state,
    [discountType]: updatedDiscountType,
  };
};

export const toOrderedOffer = (offer: IOfferOnHotelItem | IOfferUI | OrderedOffer): OrderedOffer => ({
  uuid: offer.uuid,
  name: offer.name,
});

export const getOrderedOffers = (offers: IOfferOnHotelItem[] = []): OrderedOffer[] =>
  R.sortBy(item => item.order, offers).map(item => toOrderedOffer(item));

export const toggleAgeNameOnProductDiscountProduct = (
  state: IOfferUI['productDiscounts'] | IOfferUI['subProductDiscounts'],
  action: OfferToggleAgeNameOnProductAction | OfferToggleAgeNameOnSubProductAction
): IOfferUI['productDiscounts'] | IOfferUI['subProductDiscounts'] => {
  const { discountType, discountUuid, productUuid, ageName } = action;
  const discountIndex = state![discountType]?.findIndex(d => d.uuid === discountUuid);
  const newDiscount: IUIOfferProductDiscountInstance = { ...state![discountType]![discountIndex!] };
  const productIndex = newDiscount.products.findIndex(p => p.uuid === productUuid);
  const productToUpdate: IDiscountProduct = newDiscount.products[productIndex];

  const newProduct = {
    ...productToUpdate,
    ageNames: productToUpdate.ageNames.includes(ageName)
      ? productToUpdate.ageNames.filter(an => an !== ageName)
      : [...productToUpdate.ageNames, ageName],
  };

  // Safe to mutate
  newDiscount.products[productIndex] = newProduct;

  const updatedDiscountType = [...state![discountType]];
  updatedDiscountType[discountIndex] = newDiscount;

  return {
    ...state,
    [discountType]: updatedDiscountType,
  };
};

export const clearAllProductsFromDiscounts = (
  discounts: IOfferProductDiscounts<any> | IOfferSubProductDiscounts<any>
) => {
  const out = Object.keys(discounts).reduce((acc, nextKey) => {
    acc[nextKey] = discounts[nextKey].map(d => ({ uuid: d.uuid, products: [] }));
    return acc;
  }, {});
  return out;
};

export const discountsWithCategory = (
  discounts: IUIOfferProductDiscountInstance[],
  availableProducts: IProduct<any>[]
): IUIOfferProductDiscountInstance[] => {
  return discounts.map(discount => {
    const pid = discount.products.find(p => p)?.uuid;
    const productCategory = availableProducts.find(ap => ap.uuid === pid)?.category as EProductCategory;
    return {
      ...discount,
      productCategory,
    };
  });
};
