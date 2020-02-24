import React from 'react';

import { MealPlanRatePrice } from '../containers/SummaryRoomEdit/SummaryRoomEdit.styles';

// @ts-ignore
import { differenceInCalendarDays, format, addDays } from 'date-fns';

import { uniq, flatten, pipe, uniqBy } from 'ramda';

// @ts-ignore
import { formatPrice } from 'utils';

import {
  BookingBuilderAvailableProductSets,
  RequestedBuildAccommodation,
  LodgingSummary,
  BookingBuilderAvailableProductSetsAccommodation,
  IBookingInformation,
  // @ts-ignore
} from 'interfaces';

import { AvailableProductSets, IBooking } from 'services/BackendApi/types';
import { BookingBuilderDomain } from 'store/modules/bookingBuilder';
import { BookingStatusTypes } from '../config/enums';

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

export const getNightsBreakdownForDates = (startDate: any, endDate: any, translate: Function) => {
  // see @https://pureescapes.atlassian.net/browse/OWA-1031
  const amendedEndDate = addDays(new Date(endDate), 1);

  const nights = differenceInCalendarDays(amendedEndDate, new Date(startDate));
  const dateRangeText = format(new Date(startDate), 'do LLL yyyy') + ' - ' + format(amendedEndDate, 'do LLL yyyy');

  const nightSigular = translate ? translate('labels.nightSigular') : 'night';
  const nightPlural = translate ? translate('labels.nightPlural') : 'nights';

  return (
    <span>
      <strong>
        {nights} {nights > 1 ? nightPlural : nightSigular}
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

  return <span>{labelNames}</span>;
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
      <React.Fragment>
        <div>
          <span>
          {labelNames} {labelOffers && <MealPlanRatePrice data-discount="true">{labelOffers.join(' & ')}</MealPlanRatePrice>} - {currencyCode}{formatPrice(labelPrice)}</span>
        </div>
      </React.Fragment>
    );

    availableMealPlans.push({
      value,
      label,
    });
  });

  return availableMealPlans;
};

export const getLodgingTotals = (lodging: LodgingSummary, availableProductSets: AvailableProductSets) => {
  const selectedLodging = availableProductSets.Accommodation[lodging.index];

  if (!selectedLodging) {
    return {
      isOnRequest: false,
      total: '0',
      totalBeforeDiscount: '0',
    };
  }

  if (selectedLodging.isOnRequestOrPartiallyOnRequest) {
    return {
      isOnRequest: true,
      total: '0',
      totalBeforeDiscount: '0',
    };
  }

  let total = 0;
  let totalBeforeDiscount = 0;

  // get base lodging prices
  total += selectedLodging.total ? parseFloat(selectedLodging.total) : 0;
  totalBeforeDiscount += selectedLodging.totalBeforeDiscount ? parseFloat(selectedLodging.totalBeforeDiscount) : 0;

  // add meal plan prices
  selectedLodging.availableSubProductSets['Meal Plan']
    .filter(asp => asp.selected)
    .forEach(asp => {
      total += asp.total ? parseFloat(asp.total) : 0;
      totalBeforeDiscount += asp.totalBeforeDiscount ? parseFloat(asp.totalBeforeDiscount) : 0;
    });

  // add supplement prices
  selectedLodging.availableSubProductSets['Supplement']
    .filter(asp => asp.selected)
    .forEach(asp => {
      total += asp.total ? parseFloat(asp.total) : 0;
      totalBeforeDiscount += asp.totalBeforeDiscount ? parseFloat(asp.totalBeforeDiscount) : 0;
    });

  return {
    isOnRequest: false,
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
    const supplements = availableProductSets.Accommodation[lodging.index].availableSubProductSets.Supplement.filter(
      s => s.selected
    );

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

export const getAppliedOffersForLodging = (
  lodging: LodgingSummary,
  availableProductSets: AvailableProductSets,
  textOnlyOffersPerLodging: any
) => {
  try {
    const lodgingOffers = flatten(
      availableProductSets.Accommodation[lodging.index].breakdown.map(breakdown => {
        return breakdown.offers.map(offer => {
          return offer.offer.name;
        });
      })
    );

    const lodgingSubProductOffers = availableProductSets.Accommodation[lodging.index].availableSubProductSets[
      'Meal Plan'
    ]
      .filter(asp => asp.selected)
      .map(asp => {
        return asp.breakdown.map(breakdown => {
          return breakdown.offers.map(offer => {
            return offer.offer.name;
          });
        });
      });

    const textOffers = textOnlyOffersPerLodging[lodging.index].map(offer => {
      return offer.offer.name;
    });

    const flat = flatten([lodgingOffers, lodgingSubProductOffers, textOffers]);

    // needs to be unique, @see owa 1022
    return uniqBy(a => a, flat);
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

export const getBookingsEndpointAttributesForBookingDomain = props => {
  const {
    bookingDomain,
    bookingStatus = BookingStatusTypes.POTENTIAL,
    placeHolds = false,
    proposalUuid = undefined,
  }: {
    bookingDomain: BookingBuilderDomain;
    bookingStatus: string;
    placeHolds: boolean;
    proposalUuid: string | undefined;
  } = props;

  const bookingHash = bookingDomain.bookingHash || bookingDomain.currentBookingBuilder?.response.bookingHash;
  const bookingBuild = bookingDomain.currentBookingBuilder?.request;

  const bookingInformation = getBookingInformationForBooking(bookingDomain);

  return {
    bookingHash,
    bookingBuild,
    bookingInformation,
    status: bookingStatus,
    placeHolds,
    proposalUuid,
  };
};

export const getBookingInformationForBooking = (booking: IBooking | BookingBuilderDomain) => {
  const bookingInformation: IBookingInformation = {
    guestTitle: booking.guestTitle || undefined,
    guestFirstName: booking.guestFirstName || '',
    guestLastName: booking.guestLastName || '',
    isRepeatGuest: booking.isRepeatGuest || false,
    flightArrivalNumber: booking.flightArrivalNumber || undefined,
    flightDepartureNumber: booking.flightDepartureNumber || undefined,
    taMarginType: booking.taMarginType || undefined,
    taMarginAmount: booking.taMarginAmount || undefined,
    comments: booking.comments || undefined,
    flightArrivalDate: booking.flightArrivalDate || undefined,
    flightDepartureDate: booking.flightDepartureDate || undefined,
    specialRequests: booking.specialRequests || undefined,
    proposalUuid: booking.proposalUuid || undefined,
    travelAgentUserUuid: booking.travelAgentUserUuid || undefined,
  };

  return bookingInformation;
};
