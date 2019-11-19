import React from 'react';

import { MealPlanRatePrice } from '../containers/SummaryRoomEdit/SummaryRoomEdit.styles';

// @ts-ignore
import { differenceInCalendarDays, format } from 'date-fns';

import { uniq, flatten, pipe } from 'ramda';

// @ts-ignore
import { formatPrice } from 'utils';

import {
  BookingBuilderAvailableProductSets,
  RequestedBuildAccommodation,
  LodgingSummary,
  BookingBuilderAvailableProductSetsAccommodation,
  // @ts-ignore
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
  return (
    <span>
      <strong>
        {nights} {nights > 1 ? 'nights' : 'night'}
      </strong>{' '}
      | {dateRangeText}
    </span>
  );
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

export const getMealPlanBreakdownForLodging = (
  requestedBuildLodging: RequestedBuildAccommodation,
  index: number,
  availableProductSets: BookingBuilderAvailableProductSets
) => {
  if (!requestedBuildLodging || !requestedBuildLodging.subProducts['Meal Plan']) {
    return null;
  }

  const availableProductAccommodation = availableProductSets.Accommodation[index];

  if (!availableProductAccommodation) {
    return null;
  }

  const selectedMealPlanSet = availableProductAccommodation.availableSubProductSets['Meal Plan'].filter(mealPlanSet => {
    return mealPlanSet.selected;
  })[0];

  // we have the selected meal plan set
  if (!selectedMealPlanSet) {
    return null;
  }

  const labelNames: any[] = selectedMealPlanSet.products.map(p => p.name);
  const labelOffers: any[] = flatten(
    uniq(
      selectedMealPlanSet.breakdown.map(b => {
        return b.offers.map(o => o.offer.name);
      })
    )
  );

  return (
    <span>
      {labelNames}{' '}
      {labelOffers && <MealPlanRatePrice data-discount="true">{labelOffers.join(' & ')}</MealPlanRatePrice>}
    </span>
  );
};

export const getAvailableMealPlansForAccommodation = (
  lodging: LodgingSummary,
  availableProductSets: BookingBuilderAvailableProductSets,
  currencyCode: string
) => {
  const availableMealPlans: any[] = [];
  const accommodation = getAvailableProductSetAccommodationForUuid(lodging.uuid, availableProductSets);

  if (!accommodation) {
    return {};
  }

  accommodation.availableSubProductSets['Meal Plan'].forEach((mealPlan: any) => {
    // the radio button value is the UUIDs joined with a slash
    const value = mealPlan.products.map(p => p.uuid).join('/');

    // build the name from all the breakdown names
    const labelNames = mealPlan.products.map(p => p.name).join(' & ');

    // build the total price from adding up all the breakdown totals
    const labelPrice = mealPlan.breakdown.reduce((totalPrice, breakdown) => {
      totalPrice += parseFloat(breakdown.total);
      return totalPrice;
    }, 0);

    const labelOffers = flatten(
      uniq(
        mealPlan.breakdown.map(b => {
          return b.offers.map(o => o.offer.name);
        })
      )
    );

    const label = (
      <div>
        <div>
          {labelNames}{' '}
          {labelOffers && <MealPlanRatePrice data-discount="true">{labelOffers.join(' & ')}</MealPlanRatePrice>}
        </div>
        <div>
          {currencyCode}
          {formatPrice(labelPrice)}
        </div>
      </div>
    );

    availableMealPlans.push({
      value,
      label,
    });
  });

  return availableMealPlans;
};

export const getLodgingTotals = (lodging: LodgingSummary, potentialBooking: any) => {
  const selectedLodging = potentialBooking.Accommodation[lodging.index];

  if (!selectedLodging) {
    return {
      total: 0,
      totalBeforeDiscount: 0,
    };
  }

  let total = 0;
  let totalBeforeDiscount = 0;

  // get base lodging prices
  total += parseFloat(selectedLodging.total);
  totalBeforeDiscount += parseFloat(selectedLodging.totalBeforeDiscount);

  // add meal plan prices
  selectedLodging.subProducts['Meal Plan'].forEach(mealPlan => {
    total += parseFloat(mealPlan.total);
    totalBeforeDiscount += parseFloat(mealPlan.totalBeforeDiscount);
  });

  // add supplement prices
  selectedLodging.subProducts['Supplement'].forEach(supplement => {
    total += parseFloat(supplement.total);
    totalBeforeDiscount += parseFloat(supplement.totalBeforeDiscount);
  });

  return {
    total: formatPrice(total),
    totalBeforeDiscount: formatPrice(totalBeforeDiscount),
  };
};

export const getAppliedSupplementsForLodging = (
  lodging: LodgingSummary,
  availableProductSets: BookingBuilderAvailableProductSets,
  currencyCode: string
) => {
  try {
    const supplements = availableProductSets.Accommodation[lodging.index].availableSubProductSets.Supplement;

    if (!supplements) {
      return [];
    }

    const formattedSupplements = supplements.map(supplement => {
      return (
        <span>
          {supplement.products.map(p => p.name).join(' & ')}{' '}
          <label>
            ({currencyCode}
            {formatPrice(supplement.total)})
          </label>
        </span>
      );
    });

    return formattedSupplements;
  } catch (e) {
    return [];
  }
};

export const getAppliedOffersForLodging = (lodging: LodgingSummary, potentialBooking: any) => {
  try {
    // get all the offers for the lodging itself
    const lodgingOffers = potentialBooking.Accommodation[lodging.index].offers.map(o => {
      return o.offer.name;
    });

    // get the meal plan offers
    const lodgingSubProductOffers = potentialBooking.Accommodation[lodging.index].subProducts['Meal Plan'].map(m => {
      return m.offers.map(o => {
        return o.offer.name;
      });
    });

    return flatten([lodgingOffers, lodgingSubProductOffers]);
  } catch (e) {
    return [];
  }
};

export const getOccassionsBreakdownForLodging = (accommodation: RequestedBuildAccommodation) => {
  const { honeymoon, birthday, anniversary, wedding } = accommodation;
  const occasions = { honeymoon, birthday, anniversary, wedding };

  const appliedOccasions = Object.keys(occasions)
    .map(o => (occasions[o] ? o : null))
    .filter(Boolean);

  if (appliedOccasions.length <= 0) {
    return null;
  }

  if (appliedOccasions.length === 1) {
    return appliedOccasions[0];
  }

  return appliedOccasions.slice(0, -1).join(', ') + ' & ' + appliedOccasions.slice(-1);
};
