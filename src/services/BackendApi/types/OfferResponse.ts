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

export interface IOfferPrerequisitesPayload {
  anniversary?: boolean | null;
  birthday?: boolean | null;
  honeymoon?: boolean | null;
  repeatCustomer?: boolean | null;
  wedding?: boolean | null;
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
    countryCodes: string[]; // these are the TA country codes - an array of string country codes
    accommodationProducts: string[];
    payload?: IOfferPrerequisitesPayload;
  };
  preDiscount: boolean;
  stepping?: {
    everyXNights: any;
    applyTo: any;
    maximumNights: any;
    discountCheapest: boolean | null;
  };
  accommodationProductDiscount?: {
    discountPercentage: number;
    greenTaxDiscountApproach: string;
  };
  subProductDiscounts?: {
    Supplement?: IProductDiscount[];
    'Meal Plan'?: IProductDiscount[];
  };
  productDiscounts?: {
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
