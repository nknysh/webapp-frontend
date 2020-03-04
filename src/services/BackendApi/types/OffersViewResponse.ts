import { number, string } from 'prop-types';

interface IPrerequisiteDate {
  startDate: string;
  endDate: string;
}
export interface IOffersViewResponse {
  meta: {};
  data: any;
}

export interface IUuidAndName {
  uuid: string;
  name: string;
}

export interface IProductDiscount {
  discountPercentage: number;
  maximumQuantity: number;
  greenTaxDiscountApproach: string;
  products: {
    uuid: string;
    ageNames: string[];
  }[];
}

export interface IOffersViewResponseOffer {
  uuid: string;
  name: string;
  order: number;
  hotelUuid: string;
  hotel: {
    name: string;
  };
  combines: boolean;
  combinesWith: string[]; // uuids
  cannotCombineWith: string[]; // uuids
  termsAndConditions: string;
  furtherInformation: string;
  prerequisites: {
    dates: IPrerequisiteDate[];
    maximumLodgingsInBooking: number;
    advance: {
      bookBy: string;
      minimum: number;
      maximum: number;
    };
    stayLength: {
      minimum: number;
      maximum: number;
      strictMinMaxStay: boolean;
    };
    countryCodes: string[];
    accommodationProducts: string[];
    payload: {
      anniversary: boolean;
      birthday: boolean;
      honeymoon: boolean;
      repeatCustomer: boolean;
      wedding: boolean;
    };
  };
  preDiscount: boolean;
  stepping?: {
    everyXNights: any;
    applyTo: any;
    maximumNights: any;
  };
  accommodationProductDiscount?: {
    discountPercentage: number;
    greenTaxDiscountApproach: string;
  };
  subProductDiscounts?: {
    Supplement?: IProductDiscount[];
    'Meal Plan'?: IProductDiscount[];
  };
  productDiscounts: {
    Transfer?: IProductDiscount[];
    'Ground Service'?: IProductDiscount[];
    Fine?: IProductDiscount[];
  };
  createdAt: string;
  updatedAt: string;
}
