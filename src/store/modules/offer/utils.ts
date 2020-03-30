import {
  IOfferProductDiscountInstance,
  IOfferUI,
  IOfferAPI,
  IUIOfferProductDiscountInstance,
  IOfferProductDiscounts,
  IOfferSubProductDiscounts,
} from 'services/BackendApi';
import produce from 'immer';
import * as R from 'ramda';
import { IOfferUiState, ECombinationMode } from './model';

export const getAllAssociatedProductUuidsFromOffer = (offer: IOfferUI) => {
  const productUuids = [...(offer.prerequisites.accommodationProducts || [])];

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
  if (obj === undefined) {
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
      draftOffer.subProductDiscounts.Supplement = draftOffer.subProductDiscounts.Supplement.map(
        (discount, arrayIndex) => {
          discount.index = arrayIndex;
          return discount;
        }
      );
    }

    if (draftOffer.subProductDiscounts?.['Meal Plan']) {
      draftOffer.subProductDiscounts['Meal Plan'] = draftOffer.subProductDiscounts['Meal Plan'].map(
        (discount, arrayIndex) => {
          discount.index = arrayIndex;
          return discount;
        }
      );
    }

    if (draftOffer.productDiscounts?.Fine) {
      draftOffer.productDiscounts.Fine = draftOffer.productDiscounts.Fine.map((discount, arrayIndex) => {
        discount.index = arrayIndex;
        return discount;
      });
    }

    if (draftOffer.productDiscounts?.['Ground Service']) {
      draftOffer.productDiscounts['Ground Service'] = draftOffer.productDiscounts['Ground Service'].map(
        (discount, arrayIndex) => {
          discount.index = arrayIndex;
          return discount;
        }
      );
    }

    if (draftOffer.productDiscounts?.Transfer) {
      draftOffer.productDiscounts.Transfer = draftOffer.productDiscounts.Transfer.map((discount, arrayIndex) => {
        discount.index = arrayIndex;
        return discount;
      });
    }

    if (draftOffer.productDiscounts?.Supplement) {
      draftOffer.productDiscounts.Supplement = draftOffer.productDiscounts.Supplement.map((discount, arrayIndex) => {
        discount.index = arrayIndex;
        return discount;
      });
    }

    return draftOffer;
  });
};

export const transformUiOfferToApiOffer = (offer: IOfferUI, uiState: IOfferUiState): IOfferAPI => {
  return produce(offer, (draftOffer: IOfferAPI) => {
    if (draftOffer.subProductDiscounts?.Supplement) {
      draftOffer.subProductDiscounts.Supplement = draftOffer.subProductDiscounts.Supplement.map(
        (discount) => {
          const newSupplement: IOfferProductDiscountInstance = {
            products: discount.products,
            discountPercentage: discount.discountPercentage,
            greenTaxDiscountApproach: discount.greenTaxDiscountApproach,
            maximumQuantity: discount.maximumQuantity,
          };
          return newSupplement;
        }
      );
    }

    if (draftOffer.subProductDiscounts?.['Meal Plan']) {
      draftOffer.subProductDiscounts['Meal Plan'] = draftOffer.subProductDiscounts['Meal Plan'].map(
        (discount) => {
          const newSupplement: IOfferProductDiscountInstance = {
            products: discount.products,
            discountPercentage: discount.discountPercentage,
            greenTaxDiscountApproach: discount.greenTaxDiscountApproach,
            maximumQuantity: discount.maximumQuantity,
          };
          return newSupplement;
        }
      );
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

    if(draftOffer.furtherInformation === '') {
      draftOffer.furtherInformation = null;
    }

    if (draftOffer.productDiscounts?.['Ground Service']) {
      draftOffer.productDiscounts['Ground Service'] = draftOffer.productDiscounts['Ground Service'].map(
        (discount) => {
          const newSupplement: IOfferProductDiscountInstance = {
            products: discount.products,
            discountPercentage: discount.discountPercentage,
            greenTaxDiscountApproach: discount.greenTaxDiscountApproach,
            maximumQuantity: discount.maximumQuantity,
          };
          return newSupplement;
        }
      );
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
      draftOffer.productDiscounts = undefined;
      draftOffer.subProductDiscounts = undefined;
      draftOffer.stepping = undefined;
      draftOffer.accommodationProductDiscount = undefined;
    }

    return draftOffer;
  });
};

export const sortObjectsByIndex = R.sortWith<IUIOfferProductDiscountInstance>([R.ascend(R.prop('index'))]);

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
