import { IDateRange } from 'interfaces';
import { Occupancy } from './OffersSearchResponse';

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

export interface IOffersOnHotelResponse {
  meta: any;
  data: IOfferOnHotelItem[];
}

export interface IOffersSortPayload {
  offers: string[];
  hotelUuid: string;
}

export interface IAgeName {
  name: string;
  ageFrom?: number;
  ageTo?: number;
}

export interface IOccupancyLimit {
  name: string;
  minimum: number;
  maximum: number;
}
export interface IOccupancy {
  standardOccupancy: number;
  maximumPeople: number;
  limits: IOccupancyLimit[];
}

export interface IAccommodationProductForHotelItem {
  uuid: string;
  name: string;
  type: string;
  options: {
    ages: IAgeName[];
    occupancy: IOccupancy;
  };
}

export interface IDiscountProduct {
  uuid: string;
  ageNames?: string[];
}

export interface IOfferProductDiscountInstance {
  discountPercentage?: number | string;
  maximumQuantity?: number;
  greenTaxDiscountApproach?: string;
  standardOccupancyOnly?: boolean;
  products: IDiscountProduct[];
}

export interface IUIOfferProductDiscountInstance extends IOfferProductDiscountInstance {
  uuid: string; // Need to provide this to react so it knows how to update the UI correctly
}

export interface IOfferPrerequisitesPayload {
  anniversary?: boolean | null;
  birthday?: boolean | null;
  honeymoon?: boolean | null;
  repeatCustomer?: boolean | null;
  wedding?: boolean | null;
}

export interface IOfferPrerequisites {
  dates: IDateRange[];
  maximumLodgingsInBooking?: number;
  advance?: {
    bookBy?: string;
    minimum?: number;
    maximum?: number;
  };
  stayLength?: {
    minimum?: number;
    maximum?: number;
    strictMinMaxStay?: boolean;
  };
  countryCodes?: string[]; // these are the TA country codes - an array of string country codes
  accommodationProducts?: string[];
  payload?: IOfferPrerequisitesPayload;
}

export interface IOfferSubProductDiscounts<T> {
  Supplement?: T[];
  'Meal Plan'?: T[];
}

export interface IOfferProductDiscounts<T> {
  Transfer?: T[];
  'Ground Service'?: T[];
  Fine?: T[];
  Supplement?: T[];
}

export interface IOfferStepping {
  everyXNights?: number;
  applyTo?: number;
  maximumNights?: number;
  discountCheapest?: boolean;
}

export interface IOffer<T> {
  uuid: string;
  name: string;
  order: number;
  hotelUuid: string;
  hotel: {
    name: string;
    countryCode: string;
  };
  combines: boolean;
  combinesWith: string[]; // uuids
  cannotCombineWith: string[]; // uuids
  termsAndConditions: string;
  furtherInformation: string | null;
  prerequisites: IOfferPrerequisites;
  preDiscount: boolean;
  stepping?: IOfferStepping;
  accommodationProductDiscount?: {
    discountPercentage?: number | string;
    greenTaxDiscountApproach?: string;
  };
  subProductDiscounts?: IOfferSubProductDiscounts<T>;
  productDiscounts?: IOfferProductDiscounts<T>;
  createdAt: string;
  updatedAt: string;
}

export interface IOfferUI extends IOffer<IUIOfferProductDiscountInstance> {}

export interface IOfferAPI extends IOffer<IOfferProductDiscountInstance> {}

export interface IOfferResponse {
  meta: any;
  data: IOfferAPI;
}
