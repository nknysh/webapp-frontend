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

export const returnObjectWithUndefinedsAsEmptyStrings = obj => {
  if (obj === undefined) {
    return undefined;
  }
  const parsedObject = {};
  Object.keys(obj).forEach(steppingKey => {
    parsedObject[steppingKey] = !obj || obj[steppingKey] === undefined ? '' : obj[steppingKey];
  });
  return parsedObject;
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

    if (draftOffer.productDiscounts?.Fine) {
      draftOffer.productDiscounts.Fine = draftOffer.productDiscounts.Fine.map((discount, arrayIndex) => {
        discount.index = arrayIndex;
        return discount;
      });
    }

    return draftOffer;
  });
};

export const transformUiOfferToApiOffer = (offer: IOfferUI): IOfferAPI => {
  return produce(offer, (draftOffer: IOfferAPI) => {
    if (draftOffer.subProductDiscounts?.Supplement) {
      draftOffer.subProductDiscounts.Supplement = draftOffer.subProductDiscounts.Supplement.map(
        (discount, arrayIndex) => {
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
