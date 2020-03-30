export enum EGreenTaxApproach {
  DISCOUNT_BEFORE_GREEN_TAX = 'DISCOUNT_BEFORE_GREEN_TAX',
  DISCOUNT_WITH_GREEN_TAX_AS_MINIMUM = 'DISCOUNT_WITH_GREEN_TAX_AS_MINIMUM',
  DISCOUNT_WITH_GREEN_TAX = 'DISCOUNT_WITH_GREEN_TAX',
}

export const GreenTaxApproachOptions: { [key in EGreenTaxApproach]: string } = {
  DISCOUNT_BEFORE_GREEN_TAX: 'Discount before green tax',
  DISCOUNT_WITH_GREEN_TAX_AS_MINIMUM: 'Discount with green tax as minimum',
  DISCOUNT_WITH_GREEN_TAX: 'Discount with green tax',
};

export const GreenTaxApproachInfo: { [key in EGreenTaxApproach]: string } = {
  DISCOUNT_BEFORE_GREEN_TAX: 'Subtract green tax from marked up rate, discount that, add green tax',
  DISCOUNT_WITH_GREEN_TAX_AS_MINIMUM:
    "Discount the marked up rate, but don't let it be cheaper than the green tax minimum",
  DISCOUNT_WITH_GREEN_TAX: 'Discount the marked up rate, and allow it to hit zero, the hotel will swallow the tax',
};

export const greenTaxToHumanReadable = (greenTaxConstant: EGreenTaxApproach): string => {
  switch (greenTaxConstant) {
    case 'DISCOUNT_BEFORE_GREEN_TAX':
    case 'DISCOUNT_WITH_GREEN_TAX_AS_MINIMUM':
    case 'DISCOUNT_WITH_GREEN_TAX':
      return `${GreenTaxApproachOptions[greenTaxConstant]} - ${GreenTaxApproachInfo[greenTaxConstant]}`;
    default:
      return 'Unknown green tax discount approach';
  }
};
