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

export const getSelectedSupplementsForLodging = (
  lodging: LodgingSummary,
  availableProductSets: BookingBuilderAvailableProductSets
) => {
  try {
    const supplements = availableProductSets.Accommodation.filter((a, i) => i === lodging.index)[0]
      .availableSubProductSets.Supplement;

    const formattedSupplements = supplements.map(supplement => {
      return supplement.products.map(p => p.name).join(' & ');
    });

    return formattedSupplements;
  } catch (e) {
    return [];
  }
};

export const getLodgingTotals = (lodging: LodgingSummary, availableProductSets: BookingBuilderAvailableProductSets) => {
  const selectedLodging = availableProductSets.Accommodation.filter((a, i) => i === lodging.index)[0];

  return {
    total: selectedLodging.total,
    totalBeforeDiscount: selectedLodging.totalBeforeDiscount,
  };
};
