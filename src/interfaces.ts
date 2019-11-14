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
