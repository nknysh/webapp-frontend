export interface BookingBuilderProduct {
  uuid: string;
  name: string;
  type: string;
  category: string;
}

export interface BookingBuilderAvailableSubProductSetsMealPlan {
  products: BookingBuilderProduct[];
  isOnRequestOrPartiallyOnRequest: boolean;
  total: string;
  totalBeforeDiscount: string;
  mandatory: boolean;
  breakdown: object;
  selected: boolean;
}

export interface BookingBuilderAvailableProductSetsAccommodation {
  products: BookingBuilderProduct[];
  total: string;
  mandatory: boolean;
  selected: boolean;
  isOnRequestOrPartiallyOnRequest: boolean;
  availableSubProductSets: {
    'Meal Plan': BookingBuilderAvailableSubProductSetsMealPlan[];
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
}
