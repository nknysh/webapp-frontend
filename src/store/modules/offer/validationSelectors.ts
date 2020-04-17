import { createSelector } from 'reselect';
import {
  Validator,
  ValidatorFieldResult,
  OfferValidatorResultSet,
  ValidatorFieldError,
  isPercentageCompliant,
} from './validation';
import { uiStateSelector } from './subdomains/uiState/selectors';
import {
  offerSelector,
  offerAccommodationProductPrerequisitesRawSelector,
  offerStayBetweenPrerequisitesRawSelector,
  offerStayLengthPrerequisiteSelector,
  offerSteppingApplicationSelector,
  offerProductDiscountsSelector,
  offerSubProductDiscountsSelector,
  offerExtraPersonSupplementsSelector,
  offerRequiresGreenTaxApproachSelector,
  offerAccommodationDiscountSelector,
} from './subdomains/offer/selectors';

import { combinationModeSelector, combinationOfferUuidsSelector } from './subdomains/uiState/selectors';
import { ECombinationMode } from './model';

export const offerHotelValidationSelector = createSelector(offerSelector, offer =>
  new Validator<OfferValidatorResultSet>(offer)
    .required('hotelUuid', 'Hotel is required')
    .string('hotelUuid', 'Hotel must be a string')
    .results()
);

export const offerNameValidationSelector = createSelector(offerSelector, offer =>
  new Validator<OfferValidatorResultSet>(offer)
    .required('name', 'Name is a required field')
    .string('name', 'Name must be a string')
    .results()
);

export const offerTsAndCsValidationSelector = createSelector(offerSelector, offer =>
  new Validator<OfferValidatorResultSet>(offer)
    .required('termsAndConditions', 'Terms and Conditions are required')
    .string('termsAndConditions', 'Terms and Conditions must be a string')
    .results()
);

export const offerAccommodationProductsPrerequisitesValidationSelector = createSelector(
  offerAccommodationProductPrerequisitesRawSelector,
  offerSelector,
  (accommodationPrerequisites, offer) => {
    // For now, this selector never returns any errors.
    // Leaving in, as we may adjust this in the future, and all the wiring is already in place
    return {
      errors: [],
    } as ValidatorFieldResult<OfferValidatorResultSet>;
  }
);

export const offerStayBetweenPrerequisiteValidationSelector = createSelector(
  offerStayBetweenPrerequisitesRawSelector,
  stayBetweens => {
    const errors: ValidatorFieldError<OfferValidatorResultSet>[] = [];

    // stay between needs to exist
    if (stayBetweens.length <= 0) {
      errors.push({
        field: 'stayBetweenPrerequisite',
        message: 'At least 1 stay between prerequisite must be set',
      });
    }

    // stay between end needs to be after start
    stayBetweens.forEach((sb, index) => {
      if (sb.startDate !== undefined && sb.endDate !== undefined) {
        if (new Date(sb.startDate) > new Date(sb.endDate)) {
          errors.push({
            field: 'stayBetweenPrerequisite',
            index,
            message: 'Accommodation prerequisites requires at least 1 item',
          });
        }
      }
    });

    return {
      errors,
    } as ValidatorFieldResult<OfferValidatorResultSet>;
  }
);

export const offerStayLengthPrerequisiteValidationSelector = createSelector(
  offerStayLengthPrerequisiteSelector,
  stayLength => {
    const errors: ValidatorFieldError<OfferValidatorResultSet>[] = [];

    if (stayLength) {
      if (stayLength.strictMinMaxStay != null && (stayLength.maximum == null || stayLength.minimum == null)) {
        errors.push({
          field: 'stayLengthPrerequisite',
          message: 'Stay Length strict min/max cannot be set without a minimum or a maximum',
        });
      }
    }
    return {
      errors,
    } as ValidatorFieldResult<OfferValidatorResultSet>;
  }
);

export const offerSteppingValidationSelector = createSelector(offerSteppingApplicationSelector, stepping => {
  const errors: ValidatorFieldError<OfferValidatorResultSet>[] = [];

  if (stepping) {
    if (stepping.everyXNights === undefined) {
      errors.push({
        field: 'stepping',
        message: 'If Stepping is set, Stepping > Every X Nights is required',
      });
    }

    if (parseInt(stepping.everyXNights as string, 10) < 2) {
      errors.push({
        field: 'stepping',
        message: 'everyXNights must be greater than 1',
      });
    }

    if (stepping.applyTo === undefined) {
      errors.push({
        field: 'stepping',
        message: 'If Stepping is set, Stepping > Apply To is required',
      });
    }

    if (stepping.everyXNights == null && stepping.applyTo == null) {
      if (stepping.maximumNights != null) {
        errors.push({
          field: 'stepping',
          message:
            'If Stepping > Every X Nights or Stepping > Apply To is not set, then Stepping > Maximum nights is not settable',
        });
      }

      if (stepping.discountCheapest != null) {
        errors.push({
          field: 'stepping',
          message:
            'If Stepping > Every X Nights or Stepping > Apply To is not set, then Stepping > discount cheapest is not settable',
        });
      }
    }
  }

  return {
    errors,
  } as ValidatorFieldResult<OfferValidatorResultSet>;
});

export const offerProductDiscountsValidationSelector = createSelector(
  offerProductDiscountsSelector,
  productDiscounts => {
    const errors: ValidatorFieldError<OfferValidatorResultSet>[] = [];

    if (productDiscounts) {
      if (productDiscounts.Fine) {
        productDiscounts.Fine.forEach((discount, index) => {
          if (discount.discountPercentage === undefined || discount.discountPercentage === '') {
            errors.push({
              field: 'fineDiscounts',
              index,
              message: `Fine discount #${index + 1} - discount percentage is required`,
            });
          } else if (!isPercentageCompliant(discount.discountPercentage)) {
            errors.push({
              field: 'fineDiscounts',
              index,
              message: `Fine discount #${index +
                1} - discount percentage must be percentage compliant (number 1 - 100, optional 2 decimal places)`,
            });
          }
          if (discount.maximumQuantity && discount.maximumQuantity?.toString().includes('.')) {
            errors.push({
              field: 'fineDiscounts',
              index,
              message: `Fine discount #${index + 1} - Maximum quantity must be an integer`,
            });
          }
        });
      }
      if (productDiscounts['Ground Service']) {
        productDiscounts['Ground Service'].forEach((discount, index) => {
          if (discount.discountPercentage === undefined || discount.discountPercentage === '') {
            errors.push({
              field: 'groundServiceDiscounts',
              index,
              message: `Ground Service discount #${index + 1} - discount percentage is required`,
            });
          } else if (!isPercentageCompliant(discount.discountPercentage)) {
            errors.push({
              field: 'groundServiceDiscounts',
              index,
              message: `Ground Service discount #${index +
                1} - discount percentage must be percentage compliant (number 1 - 100, optional 2 decimal places)`,
            });
          }

          if (discount.maximumQuantity && discount.maximumQuantity?.toString().includes('.')) {
            errors.push({
              field: 'groundServiceDiscounts',
              index,
              message: `Ground Service #${index + 1} - Maximum quantity must be an integer`,
            });
          }
        });
      }
      if (productDiscounts.Supplement) {
        productDiscounts.Supplement.forEach((discount, index) => {
          if (discount.discountPercentage === undefined || discount.discountPercentage === '') {
            errors.push({
              field: 'supplementDiscounts',
              index,
              message: `Supplement discount #${index + 1} - discount percentage is required`,
            });
          } else if (!isPercentageCompliant(discount.discountPercentage)) {
            errors.push({
              field: 'supplementDiscounts',
              index,
              message: `Supplement discount #${index +
                1} - discount percentage must be percentage compliant (number 1 - 100, optional 2 decimal places)`,
            });
          }

          if (discount.maximumQuantity && discount.maximumQuantity?.toString().includes('.')) {
            errors.push({
              field: 'supplementDiscounts',
              index,
              message: `Supplement discount #${index + 1} - Maximum quantity must be an integer`,
            });
          }
        });
      }
      if (productDiscounts.Transfer) {
        productDiscounts.Transfer.forEach((discount, index) => {
          if (discount.discountPercentage === undefined || discount.discountPercentage === '') {
            errors.push({
              field: 'transferDiscounts',
              index,
              message: `Transfer discount #${index + 1} - discount percentage is required`,
            });
          } else if (!isPercentageCompliant(discount.discountPercentage)) {
            errors.push({
              field: 'transferDiscounts',
              index,
              message: `Transfer discount #${index +
                1} - discount percentage must be percentage compliant (number 1 - 100, optional 2 decimal places)`,
            });
          }

          if (discount.maximumQuantity && discount.maximumQuantity?.toString().includes('.')) {
            errors.push({
              field: 'transferDiscounts',
              index,
              message: `Transfer discount #${index + 1} - Maximum quantity must be an integer`,
            });
          }
        });
      }
    }

    return {
      errors,
    } as ValidatorFieldResult<OfferValidatorResultSet>;
  }
);

export const offerSubProductDiscountsValidationSelector = createSelector(
  offerSubProductDiscountsSelector,
  subProductDiscounts => {
    const errors: ValidatorFieldError<OfferValidatorResultSet>[] = [];

    if (subProductDiscounts) {
      if (subProductDiscounts['Meal Plan']) {
        subProductDiscounts['Meal Plan'].forEach((discount, index) => {
          if (discount.discountPercentage === undefined || discount.discountPercentage === '') {
            errors.push({
              field: 'mealPlanDiscounts',
              index,
              message: `Meal Plan discount #${index + 1} - discount percentage is required`,
            });
          } else if (!isPercentageCompliant(discount.discountPercentage)) {
            errors.push({
              field: 'mealPlanDiscounts',
              index,
              message: `Meal Plan discount #${index +
                1} - discount percentage must be percentage compliant (number 1 - 100, optional 2 decimal places)`,
            });
          }

          if (discount.maximumQuantity && discount.maximumQuantity?.toString().includes('.')) {
            errors.push({
              field: 'mealPlanDiscounts',
              index,
              message: `Meal Plan #${index + 1} - Maximum quantity must be an integer`,
            });
          }
        });
      }
    }

    return {
      errors,
    } as ValidatorFieldResult<OfferValidatorResultSet>;
  }
);

export const offerExtraPersonSupplementValidationSelector = createSelector(
  offerExtraPersonSupplementsSelector,
  offerRequiresGreenTaxApproachSelector,
  (extraPersonSupplementsDiscounts, requiresGreenTax) => {
    const errors: ValidatorFieldError<OfferValidatorResultSet>[] = [];

    extraPersonSupplementsDiscounts.forEach((discount, index) => {
      if (!discount.discountPercentage || discount.discountPercentage === '') {
        errors.push({
          field: 'extraPersonSupplementDiscounts',
          index,
          message: `Extra Person Supplement discount #${index + 1} - discount percentage is required`,
        });
      } else if (!isPercentageCompliant(discount.discountPercentage)) {
        errors.push({
          field: 'extraPersonSupplementDiscounts',
          index,
          message: `Extra Person Supplement discount #${index +
            1} - discount percentage must be percentage compliant (number 1 - 100, optional 2 decimal places)`,
        });
      } else if (requiresGreenTax && !discount.greenTaxDiscountApproach) {
        errors.push({
          field: 'extraPersonSupplementDiscounts',
          index,
          message: `Extra Person Supplement discount #${index + 1} - green tax approach is required`,
        });
      }

      if (discount.maximumQuantity?.toString().includes('.')) {
        errors.push({
          field: 'extraPersonSupplementDiscounts',
          index,
          message: `Extra Person #${index + 1} - Maximum quantity must be an integer`,
        });
      }
    });

    return {
      errors,
    } as ValidatorFieldResult<OfferValidatorResultSet>;
  }
);

export const offerFurtherInformationValidationSelector = createSelector(
  offerSelector,
  uiStateSelector,
  (offer, uiState) => {
    const errors: ValidatorFieldError<OfferValidatorResultSet>[] = [];

    if (uiState.isTextOnly && (!offer.furtherInformation || offer.furtherInformation === '')) {
      errors.push({
        field: 'furtherInformation',
        message: 'If offer is Text Only, Further Information is required',
      });
    }

    return {
      errors,
    } as ValidatorFieldResult<OfferValidatorResultSet>;
  }
);

export const accommodationDiscountValidationSelector = createSelector(
  offerSelector,
  offerRequiresGreenTaxApproachSelector,
  (offer, requiresGreenTax) => {
    const errors: ValidatorFieldError<OfferValidatorResultSet>[] = [];

    if (offer.accommodationProductDiscount && !offer.accommodationProductDiscount.discountPercentage) {
      errors.push({
        field: 'accommodationProductDiscount',
        message: `Accommodation Product discount - discount percentage must be set`,
      });
    }

    if (offer.accommodationProductDiscount && offer.accommodationProductDiscount.discountPercentage) {
      if (!isPercentageCompliant(offer.accommodationProductDiscount.discountPercentage)) {
        errors.push({
          field: 'accommodationProductDiscount',
          message: `Accommodation Product discount - discount percentage must be percentage compliant (number 1 - 100, optional 2 decimal places)`,
        });
      }
    }

    if (
      offer.accommodationProductDiscount &&
      !offer.accommodationProductDiscount.greenTaxDiscountApproach &&
      requiresGreenTax
    ) {
      errors.push({
        field: 'accommodationProductDiscount',
        message: `Green tax approach required`,
      });
    }

    return {
      errors,
    } as ValidatorFieldResult<OfferValidatorResultSet>;
  }
);

export const offerCombinationValidationSelector = createSelector(
  combinationModeSelector,
  combinationOfferUuidsSelector,
  (combinationMode, combinationUuids) => {
    const errors: ValidatorFieldError<OfferValidatorResultSet>[] = [];

    if (
      combinationMode === ECombinationMode.COMBINES_WITH_LIST ||
      combinationMode === ECombinationMode.CANNOT_COMBINE_WITH_LIST
    ) {
      if (combinationUuids.length <= 0) {
        errors.push({
          field: 'combinations',
          message: 'Combination UUIDs are required',
        });
      }
    }
    return {
      errors,
    } as ValidatorFieldResult<OfferValidatorResultSet>;
  }
);

export const offerDetailsValidationSelector = createSelector(
  offerHotelValidationSelector,
  offerNameValidationSelector,
  offerTsAndCsValidationSelector,
  offerFurtherInformationValidationSelector,
  (
    hotelValidatorFieldResult,
    nameValidatorFieldResult,
    tsAndCsValidatorFieldResult,
    furtherInformationValidatorFieldResult
  ) => {
    return {
      errors: [
        ...hotelValidatorFieldResult.errors,
        ...nameValidatorFieldResult.errors,
        ...tsAndCsValidatorFieldResult.errors,
        ...furtherInformationValidatorFieldResult.errors,
      ],
    } as ValidatorFieldResult<OfferValidatorResultSet>;
  }
);

export const offerHasAnyProductDiscounts = createSelector(offerProductDiscountsSelector, productDiscounts => {
  return (
    (productDiscounts.Fine && productDiscounts.Fine?.length >= 1) ||
    (productDiscounts.Transfer && productDiscounts.Transfer?.length >= 1) ||
    (productDiscounts['Ground Service'] && productDiscounts['Ground Service']?.length >= 1) ||
    (productDiscounts.Supplement && productDiscounts.Supplement?.length >= 1)
  );
});

export const offerHasAnySubProductDiscounts = createSelector(offerSubProductDiscountsSelector, subProductDiscounts => {
  return (
    (subProductDiscounts['Meal Plan'] && subProductDiscounts['Meal Plan']?.length >= 1) ||
    (subProductDiscounts.Supplement && subProductDiscounts.Supplement?.length >= 1)
  );
});

export const offerApplicationsIfNotTextOnlyValidationSelector = createSelector(
  uiStateSelector,
  offerAccommodationDiscountSelector,
  offerHasAnyProductDiscounts,
  offerHasAnySubProductDiscounts,
  offerExtraPersonSupplementsSelector,
  (uiState, accommodationDiscount, hasProductDiscounts, hasSubProductDiscounts, epsDiscounts) => {
    const errors: ValidatorFieldError<OfferValidatorResultSet>[] = [];

    // const hasAnyProductDiscounts = productDiscounts.Fine && productDiscounts.Fine?.length >= 1;
    // if we're NOT text only...
    if (!uiState.isTextOnly) {
      // ...and we dont have ANY other kinds of applications...
      if (
        accommodationDiscount == null &&
        !hasProductDiscounts &&
        !hasSubProductDiscounts &&
        epsDiscounts.length <= 0
      ) {
        //... then thats an error, and they need to add some applications or make it text only
        errors.push({
          field: 'applications',
          message: 'Non Text Only offers require at least 1 application to be set',
        });
      }
    }

    return {
      errors,
    } as ValidatorFieldResult<OfferValidatorResultSet>;
  }
);

// gets the giant, grouped by object of all validations against the offer
export const offerValidationSelector = createSelector(
  offerDetailsValidationSelector,
  offerAccommodationProductsPrerequisitesValidationSelector,
  offerStayBetweenPrerequisiteValidationSelector,
  offerSteppingValidationSelector,
  offerProductDiscountsValidationSelector,
  offerSubProductDiscountsValidationSelector,
  offerExtraPersonSupplementValidationSelector,
  accommodationDiscountValidationSelector,
  offerStayLengthPrerequisiteValidationSelector,
  offerCombinationValidationSelector,
  offerApplicationsIfNotTextOnlyValidationSelector,
  (
    detailsValidatorFieldResult,
    accommodationProductValidatorFieldResult,
    stayBetweenValidatorFieldResult,
    steppingValidatorFieldResult,
    productDiscountsValidatorFieldResult,
    subProductDiscountsValidatorFieldResult,
    epsDiscountsValidatorFieldResult,
    accommodationProductDiscountValidatorFieldResult,
    stayLengthValidatorFieldResult,
    combinationValidatorFieldResult,
    applicationsValidatorFieldResult
  ) => {
    const groupedBy: OfferValidatorResultSet = {
      hotelUuid: detailsValidatorFieldResult.errors.filter(e => e.field === 'hotelUuid'),
      name: detailsValidatorFieldResult.errors.filter(e => e.field === 'name'),
      termsAndConditions: detailsValidatorFieldResult.errors.filter(e => e.field === 'termsAndConditions'),
      furtherInformation: detailsValidatorFieldResult.errors.filter(e => e.field === 'furtherInformation'),
      accommodationProductsPrerequisite: accommodationProductValidatorFieldResult.errors,
      stayBetweenPrerequisite: stayBetweenValidatorFieldResult.errors,
      stepping: steppingValidatorFieldResult.errors,

      stayLengthPrerequisite: stayLengthValidatorFieldResult.errors,

      accommodationProductDiscount: accommodationProductDiscountValidatorFieldResult.errors,

      // the product discounts, broken up
      fineDiscounts: productDiscountsValidatorFieldResult.errors.filter(e => e.field === 'fineDiscounts'),
      groundServiceDiscounts: productDiscountsValidatorFieldResult.errors.filter(
        e => e.field === 'groundServiceDiscounts'
      ),
      supplementDiscounts: productDiscountsValidatorFieldResult.errors.filter(e => e.field === 'supplementDiscounts'),
      transferDiscounts: productDiscountsValidatorFieldResult.errors.filter(e => e.field === 'transferDiscounts'),

      // sub product discounts, broken up
      extraPersonSupplementDiscounts: epsDiscountsValidatorFieldResult.errors,
      mealPlanDiscounts: subProductDiscountsValidatorFieldResult.errors.filter(e => e.field === 'mealPlanDiscounts'),

      combinations: combinationValidatorFieldResult.errors,

      applications: applicationsValidatorFieldResult.errors,
    };
    return groupedBy;
  }
);

// returns a boolean, does the offer details section have validation errors
export const offerHasDetailsValidatorErrorsSelector = createSelector(
  offerHotelValidationSelector,
  offerNameValidationSelector,
  offerTsAndCsValidationSelector,
  offerFurtherInformationValidationSelector,
  (
    hotelValidatorFieldResult,
    nameValidatorFieldResult,
    tsAndCsValidatorFieldResult,
    furtherInformationValidatorFieldResult
  ) => {
    return (
      hotelValidatorFieldResult.errors.length >= 1 ||
      nameValidatorFieldResult.errors.length >= 1 ||
      tsAndCsValidatorFieldResult.errors.length >= 1 ||
      furtherInformationValidatorFieldResult.errors.length >= 1
    );
  }
);

// returns a boolean, does the offer prerequisites section have validation errors
export const offerHasPrerequisitesValidationErrorsSelector = createSelector(
  offerAccommodationProductsPrerequisitesValidationSelector,
  offerStayBetweenPrerequisiteValidationSelector,
  offerStayLengthPrerequisiteValidationSelector,
  (accommodationProductValidatorFieldResult, stayBetweenValidatorFieldResult, stayLengthValidatorFieldResult) => {
    return (
      accommodationProductValidatorFieldResult.errors.length >= 1 ||
      stayBetweenValidatorFieldResult.errors.length >= 1 ||
      stayLengthValidatorFieldResult.errors.length >= 1
    );
  }
);

// returns a boolean, does the offer applications section have validation errors
export const offerHasApplicationsValidationErrorsSelector = createSelector(
  offerSteppingValidationSelector,
  offerExtraPersonSupplementValidationSelector,
  offerProductDiscountsValidationSelector,
  offerSubProductDiscountsValidationSelector,
  accommodationDiscountValidationSelector,
  offerApplicationsIfNotTextOnlyValidationSelector,
  (
    steppingValidatorResult,
    extraPersonSupplementValidatorResult,
    productDiscountsValidatorResult,
    subProductDiscountsValidatorResult,
    accommodationProductDiscountValidatorResult,
    applicationIfNotTextOnlyValidatorResult
  ) => {
    return (
      steppingValidatorResult.errors.length >= 1 ||
      extraPersonSupplementValidatorResult.errors.length >= 1 ||
      productDiscountsValidatorResult.errors.length >= 1 ||
      subProductDiscountsValidatorResult.errors.length >= 1 ||
      accommodationProductDiscountValidatorResult.errors.length >= 1 ||
      applicationIfNotTextOnlyValidatorResult.errors.length >= 1
    );
  }
);

export const offerHasCombinationValidationErrorsSelector = createSelector(
  offerCombinationValidationSelector,
  combinationValidatorFieldResult => {
    return combinationValidatorFieldResult.errors.length >= 1;
  }
);

// returns a boolean, does the offer have any validation errors at all
export const offerHasValidationErrorsSelector = createSelector(
  offerHasDetailsValidatorErrorsSelector,
  offerHasPrerequisitesValidationErrorsSelector,
  offerHasApplicationsValidationErrorsSelector,
  offerHasCombinationValidationErrorsSelector,
  (offerHasDetailsErrors, offerHasPrerequisitesErrors, offerHasApplicationsErrors, hasCombinationErrors) => {
    return offerHasDetailsErrors || offerHasPrerequisitesErrors || offerHasApplicationsErrors || hasCombinationErrors;
  }
);
