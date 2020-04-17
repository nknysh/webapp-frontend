export interface ValidatorFieldResult<T> {
  errors: ValidatorFieldError<T>[];
}

export interface OfferValidatorResultSet {
  hotelUuid: ValidatorFieldError<OfferValidatorResultSet>[];
  name: ValidatorFieldError<OfferValidatorResultSet>[];
  termsAndConditions: ValidatorFieldError<OfferValidatorResultSet>[];
  furtherInformation: ValidatorFieldError<OfferValidatorResultSet>[];
  accommodationProductsPrerequisite: ValidatorFieldError<OfferValidatorResultSet>[];

  // prerequisites
  stayBetweenPrerequisite: ValidatorFieldError<OfferValidatorResultSet>[];
  stayLengthPrerequisite: ValidatorFieldError<OfferValidatorResultSet>[];

  //single one
  accommodationProductDiscount: ValidatorFieldError<OfferValidatorResultSet>[];
  stepping: ValidatorFieldError<OfferValidatorResultSet>[];

  // product discounts, broken up
  fineDiscounts: ValidatorFieldError<OfferValidatorResultSet>[];
  groundServiceDiscounts: ValidatorFieldError<OfferValidatorResultSet>[];
  transferDiscounts: ValidatorFieldError<OfferValidatorResultSet>[];
  supplementDiscounts: ValidatorFieldError<OfferValidatorResultSet>[];

  // sub product discounts, broken up
  mealPlanDiscounts: ValidatorFieldError<OfferValidatorResultSet>[];
  extraPersonSupplementDiscounts: ValidatorFieldError<OfferValidatorResultSet>[];

  combinations: ValidatorFieldError<OfferValidatorResultSet>[];

  // for general application validation errors
  applications: ValidatorFieldError<OfferValidatorResultSet>[];
}

export interface ValidatorFieldError<T> {
  field: keyof T;
  message: string;
  index?: number;
}

export const isPercentageCompliant = val => {
  if (isNaN(val)) {
    return false;
  }

  const numberVal = parseFloat(val);

  if (numberVal === NaN) {
    return false;
  }

  if (String(numberVal).includes('.')) {
    const numOfDecimalPlaces = String(numberVal).split('.')[1].length;
    if (numOfDecimalPlaces >= 3) {
      return false;
    }
  }

  if (numberVal >= 1 && numberVal <= 100) {
    return true;
  }

  return false;
};

export class Validator<T> {
  modelInstance: any;
  errors: ValidatorFieldError<T>[];

  constructor(modelInstance) {
    this.modelInstance = modelInstance;
    this.errors = [];
  }

  required(propertyName: keyof T, message?: string) {
    if (this.modelInstance[propertyName] == null || this.modelInstance[propertyName] === '') {
      this.errors.push({
        field: propertyName,
        message: message || `property '${propertyName}' failed 'required()'`,
      });
    }
    return this;
  }

  min(propertyName: keyof T, minLengthValue: number, message?: string) {
    if (this.modelInstance[propertyName].length < minLengthValue) {
      this.errors.push({
        field: propertyName,
        message: message || `property '${propertyName}' failed 'min()' [minLengthValue: ${minLengthValue}]`,
      });
    }
    return this;
  }

  number(propertyName: keyof T, message?: string) {
    if (typeof this.modelInstance[propertyName] !== 'number') {
      this.errors.push({
        field: propertyName,
        message: message || `property '${propertyName}' failed 'number()'`,
      });
    }
    return this;
  }

  string(propertyName: keyof T, message?: string) {
    if (typeof this.modelInstance[propertyName] !== 'string') {
      this.errors.push({
        field: propertyName,
        message: message || `property '${propertyName}' failed 'string()'`,
      });
    }
    return this;
  }

  results() {
    const results: ValidatorFieldResult<T> = {
      errors: this.errors,
    };

    return results;
  }
}
