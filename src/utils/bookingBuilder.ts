// @ts-ignore for some reason, typescript can't see the modules? but CAN import them
import { differenceInCalendarDays, format } from 'date-fns';

interface BookingBuilderProduct {
  uuid: string;
  name: string;
  type: string;
  category: string;
}

interface BookingBuilderAvailableSubProductSetsMealPlan {
  products: BookingBuilderProduct[];
  isOnRequestOrPartiallyOnRequest: boolean;
  total: string;
  totalBeforeDiscount: string;
  mandatory: boolean;
  breakdown: object;
  selected: boolean;
}

interface BookingBuilderAvailableProductSetsAccommodation {
  products: BookingBuilderProduct[];
  total: string;
  mandatory: boolean;
  selected: boolean;
  isOnRequestOrPartiallyOnRequest: boolean;
  availableSubProductSets: {
    'Meal Plan': BookingBuilderAvailableSubProductSetsMealPlan[];
  };
}

interface BookingBuilderAvailableProductSets {
  Accommodation: BookingBuilderAvailableProductSetsAccommodation[];
}

interface RequestedBuildAccommodationSubProduct {
  uuid: string;
}

interface RequestedBuildAccommodation {
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

export const getNightsBreakdownForDates = (startDate: any, endDate: any) => {
  const nights = differenceInCalendarDays(new Date(endDate), new Date(startDate));
  const dateRangeText =
    format(new Date(startDate), 'do LLL yyyy') + ' - ' + format(new Date(endDate), 'do LLL yyyy');
  return `${nights} ${nights > 1 ? 'nights' : 'night'} | ${dateRangeText}`;
};

export const getTitleForAccommodationUuid = (
  uuid: string,
  availableProductSets: BookingBuilderAvailableProductSets
): string => {
  let productTitles: string[] = [];

  availableProductSets.Accommodation.forEach(accommodation => {
    if (productTitles.length) {
      return;
    }

    accommodation.products.forEach(product => {
      if (product.uuid === uuid) {
        productTitles.push(product.name);
      }
    });
  });

  return productTitles.join('&');
};

export const getOccupancyBreakdownForAccommodation = (
  accommodation: RequestedBuildAccommodation
) => {
  const { numberOfAdults, agesOfAllChildren = [] } = accommodation.guestAges;
  const totalGuests = numberOfAdults + agesOfAllChildren.length;

  const adultsBreakdownString = `${numberOfAdults} ${numberOfAdults > 1 ? 'Adults' : 'Adult'}`;
  const childrenBreakdownString = `${agesOfAllChildren.length} ${
    agesOfAllChildren.length > 1 ? 'Children' : 'Child'
  }`;

  if (agesOfAllChildren.length) {
    return `${totalGuests} ${
      totalGuests > 1 ? 'Guests' : 'Guest'
    } (${adultsBreakdownString}, ${childrenBreakdownString})`;
  }

  return `${totalGuests} ${totalGuests > 1 ? 'Guests' : 'Guest'} (${adultsBreakdownString})`;
};

export const getMealPlanBreakdownForAccommodation = (
  accommodation: RequestedBuildAccommodation,
  availableProductSets: BookingBuilderAvailableProductSets
) => {
  if (!accommodation || !accommodation.subProducts['Meal Plan']) {
    return null;
  }

  const selectedMealPlanIds = accommodation.subProducts['Meal Plan'].map(mealPlanSubProduct => {
    return mealPlanSubProduct.uuid;
  });

  let mealPlanTitles: string[] = [];

  availableProductSets.Accommodation.forEach(accommodation => {
    if (mealPlanTitles.length) {
      return;
    }

    accommodation.availableSubProductSets['Meal Plan'].forEach(mealPlanSubProduct => {
      mealPlanSubProduct.products.forEach(mealPlanProduct => {
        if (selectedMealPlanIds.includes(mealPlanProduct.uuid)) {
          mealPlanTitles.push(mealPlanProduct.name);
        }
      });
    });
  });

  return mealPlanTitles.join('&');
};
