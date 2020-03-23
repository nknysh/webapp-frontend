import {
  IOfferProductDiscountInstance,
  IOfferUI,
  IOfferAPI,
  IUIOfferProductDiscountInstance,
} from 'services/BackendApi';
import produce from 'immer';

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
      draftOffer.subProductDiscounts.Supplement = draftOffer.subProductDiscounts.Supplement.map((sup, arrayIndex) => {
        sup.index = arrayIndex;
        return sup;
      });
    }

    return draftOffer;
  });
};

export const transformUiOfferToApiOffer = (offer: IOfferUI): IOfferAPI => {
  return produce(offer, (draftOffer: IOfferAPI) => {
    if (draftOffer.subProductDiscounts?.Supplement) {
      draftOffer.subProductDiscounts.Supplement = draftOffer.subProductDiscounts.Supplement.map((sup, arrayIndex) => {
        const newSupplement: IOfferProductDiscountInstance = {
          products: sup.products,
          discountPercentage: sup.discountPercentage,
          greenTaxDiscountApproach: sup.greenTaxDiscountApproach,
          maximumQuantity: sup.maximumQuantity,
        };
        return newSupplement;
      });
    }

    return draftOffer;
  });
};
