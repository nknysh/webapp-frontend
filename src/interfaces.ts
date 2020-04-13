import { BookingBuilderRequest } from 'services/BackendApi';

// TODO many of these can be decommissioned and use cases instead
// use the interfaces from src/services/BackendApi/types/OffersSearchResponse.ts
export interface BookingBuilderProduct {
  uuid: string;
  name: string;
  type: string;
  category: string;
}

export interface BookingBuilderAvailableSubProductSet {
  products: BookingBuilderProduct[];
  isOnRequestOrPartiallyOnRequest: boolean;
  total: string;
  totalBeforeDiscount: string;
  mandatory: boolean;
  breakdown: any[];
  selected: boolean;
}

export interface BookingBuilderAvailableProductSetsAccommodation {
  products: BookingBuilderProduct[];
  total: string;
  totalBeforeDiscount: string;
  mandatory: boolean;
  selected: boolean;
  isOnRequestOrPartiallyOnRequest: boolean;
  breakdown: any[];
  availableSubProductSets: {
    'Meal Plan': BookingBuilderAvailableSubProductSet[];
    Supplement: BookingBuilderAvailableSubProductSet[];
  };
}

export interface BookingBuilderAvailableProductSets {
  Accommodation: BookingBuilderAvailableProductSetsAccommodation[];
}

export interface RequestedBuildAccommodationSubProduct {
  uuid: string;
}

export interface RequestedBuildAccommodation {
  uuid: string;
  wedding: boolean;
  anniversary: boolean;
  birthday: boolean;
  honeymoon: boolean;
  repeatCustomer: boolean;
  subProducts: {
    'Meal Plan': RequestedBuildAccommodationSubProduct[];
  };
  startDate: string;
  endDate: string;
  guestAges: {
    numberOfAdults: number;
    agesOfAllChildren: number[];
  };
}

export interface LodgingSummary extends RequestedBuildAccommodation {
  index: number;
  title: string;
  hotelUuid: string;
  nightsBreakdown: string;
  mealPlanBreakdown: string;
  occupancyBreakdown: string;
  occasionsBreakdown: string;
}

export interface IValueLabelPair {
  value: string;
  label: string;
  disabled?: boolean;
}

export type IReduxDomainStatus = 'SUCCESS' | 'LOADING' | 'IDLE';

export interface IPureUiModalView {
  onClose: Function;
  className?: string;
  children: string | JSX.Element | JSX.Element[];
}

export interface IBookingInformation {
  guestTitle?: string;
  guestFirstName?: string;
  guestLastName?: string;
  isRepeatGuest?: boolean;
  flightArrivalNumber?: string;
  flightDepartureNumber?: string;
  flightArrivalDate?: string;
  flightDepartureDate?: string;
  taMarginType?: string;
  taMarginAmount?: string;
  specialRequests?: string[];
  comments?: string;
  proposalUuid?: string;
  travelAgentUserUuid?: string;
}

export interface IBookingAttributes {
  bookingHash: string;
  bookingBuild: BookingBuilderRequest;
  bookingInformation: IBookingInformation;
  status: string;
  placeHolds: boolean;
  proposalUuid: string;
}

export interface IBookingGuestInformationForm {
  bookingGuestFormValues: IBookingInformation;
  onValueChange: Function;
  sections?: {
    guestInfo?: boolean;
    flightInfo?: boolean;
    specialRequests?: boolean;
    comments?: boolean;
  }
}

export interface IReviewBookingSchema {
  overrideTotal?: string;
  bookingComments?: string;
  internalComments?: string;
  status: string;
}

export interface IDateRange {
  startDate: string | undefined;
  endDate: string | undefined;
}
