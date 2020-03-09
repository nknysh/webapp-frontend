import { IDateRange } from 'interfaces';

export interface IOffersViewResponse {
  meta: {};
  data: any;
}

export interface IUuidAndName {
  uuid: string;
  name: string;
}

export interface IOfferOnHotelItem {
  uuid: string;
  name: string;
  order: number;
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

export interface IOffer {
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
    dates: IDateRange[];
    maximumLodgingsInBooking: number;
    advance: {
      bookBy: string;
    };
    stayLength: {
      minimum: number;
      strictMinMaxStay: boolean;
    };
    countryCodes: string[];
    accommodationProducts: string[];
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

export interface IOfferResponse {
  meta: any;
  data: IOffer;
}
