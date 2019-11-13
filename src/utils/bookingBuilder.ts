// @ts-ignore
import { differenceInCalendarDays, format } from 'date-fns';
import {
  BookingBuilderAvailableProductSets,
  RequestedBuildAccommodation,
  LodgingSummary,
  BookingBuilderAvailableProductSetsAccommodation,
} from 'interfaces';

export const getAvailableProductSetAccommodationForUuid = (
  uuid: string,
  availableProductSets: BookingBuilderAvailableProductSets
): BookingBuilderAvailableProductSetsAccommodation | undefined => {
  const selectedAccommodation = availableProductSets.Accommodation.filter(a => {
    const productIds = a.products.map(p => p.uuid);
    return productIds.includes(uuid);
  });

  if (selectedAccommodation.length) {
    return selectedAccommodation[0];
  }
};

export const getNightsBreakdownForDates = (startDate: any, endDate: any) => {
  const nights = differenceInCalendarDays(new Date(endDate), new Date(startDate));
  const dateRangeText = format(new Date(startDate), 'do LLL yyyy') + ' - ' + format(new Date(endDate), 'do LLL yyyy');
  return `${nights} ${nights > 1 ? 'nights' : 'night'} | ${dateRangeText}`;
};

export const getTitleForAccommodationUuid = (
  uuid: string,
  availableProductSets: BookingBuilderAvailableProductSets
): string => {
  const accommodation = getAvailableProductSetAccommodationForUuid(uuid, availableProductSets);

  if (!accommodation) {
    return '';
  }

  // return accommodation.products;
  let productTitles: string[] = [];

  accommodation.products.forEach(product => {
    if (product.uuid === uuid) {
      productTitles.push(product.name);
    }
  });

  return productTitles.join('&');
};

export const getOccupancyBreakdownForAccommodation = (accommodation: RequestedBuildAccommodation) => {
  const { numberOfAdults, agesOfAllChildren = [] } = accommodation.guestAges;
  const totalGuests = numberOfAdults + agesOfAllChildren.length;

  const adultsBreakdownString = `${numberOfAdults} ${numberOfAdults > 1 ? 'Adults' : 'Adult'}`;
  const childrenBreakdownString = `${agesOfAllChildren.length} ${agesOfAllChildren.length > 1 ? 'Children' : 'Child'}`;

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

export const getAvailableMealPlansForAccommodation = (
  lodging: LodgingSummary,
  availableProductSets: BookingBuilderAvailableProductSets
) => {
  const availableMealPlans: any[] = [];
  const accommodation = getAvailableProductSetAccommodationForUuid(lodging.uuid, availableProductSets);

  if (!accommodation) {
    return {};
  }

  accommodation.availableSubProductSets['Meal Plan'].forEach(mealPlan => {
    availableMealPlans.push({
      value: mealPlan.products.map(p => p.uuid).join('/'),
      label: mealPlan.products.map(p => p.name).join('/'),
    });
  });

  return availableMealPlans;
};
