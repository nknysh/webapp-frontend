import { createSelector } from 'reselect';
import { BookingBuilderDomain } from './model';
import { ProductTypes, Occassions } from 'config/enums';
import { HotelResult, BookingBuilder, BookingBuilderRequest } from 'services/BackendApi/types';
import { flatten, clone, uniqBy } from 'ramda';
import { filterByObjectProperties } from 'utils';

const bookingBuilderDomain = (state: any): BookingBuilderDomain => state.bookingBuilder;

export const bookingSelector = createSelector(
  bookingBuilderDomain,
  domain => domain
);

export const bookingBuilderSelector = createSelector(
  bookingBuilderDomain,
  domain => {
    return domain.currentBookingBuilder;
  }
);

export const bookingRequestSelector = createSelector(
  bookingBuilderSelector,
  (booking): BookingBuilderRequest | undefined => {
    return booking ? booking.request : undefined;
  }
);

export const bookingResponseSelector = createSelector(
  bookingBuilderSelector,
  booking => {
    return booking ? booking.response : undefined;
  }
);

export const bookingAvailableProductsSelector = createSelector(
  bookingResponseSelector,
  response => (response ? response.availableProductSets : undefined)
);

export const bookingAvailableAccommodationsSelector = createSelector(
  bookingAvailableProductsSelector,
  availableProductSets => {
    return availableProductSets ? availableProductSets[ProductTypes.ACCOMMODATION] : [];
  }
);

export const bookingAvailableTransfersSelector = createSelector(
  bookingAvailableProductsSelector,
  availableProductSets => {
    return availableProductSets ? availableProductSets[ProductTypes.TRANSFER] : [];
  }
);

export const bookingAvailableGroundServicesSelector = createSelector(
  bookingAvailableProductsSelector,
  availableProducts => {
    return availableProducts ? availableProducts[ProductTypes.GROUND_SERVICE] : [];
  }
);

export const bookingAvailableAddonsSelector = createSelector(
  bookingAvailableProductsSelector,
  availableProducts => {
    if (!availableProducts) {
      return [];
    }
    return flatten([availableProducts[ProductTypes.SUPPLEMENT], availableProducts[ProductTypes.FINE]]);
  }
);

export const bookingAvailableSupplementsSelector = createSelector(
  bookingAvailableProductsSelector,
  availableProducts => {
    if (!availableProducts) {
      return [];
    }
    return availableProducts[ProductTypes.SUPPLEMENT];
  }
);

export const bookingAvailableFinesSelector = createSelector(
  bookingAvailableProductsSelector,
  availableProducts => {
    if (!availableProducts) {
      return [];
    }
    return availableProducts[ProductTypes.FINE];
  }
);

export const bookingRequestedAccommodationsSelector = createSelector(
  bookingRequestSelector,
  request => {
    return request && request[ProductTypes.ACCOMMODATION] ? request[ProductTypes.ACCOMMODATION] : [];
  }
);

export const bookingRequestedTransfersSelector = createSelector(
  bookingRequestSelector,
  request => {
    return request && request[ProductTypes.TRANSFER] ? request[ProductTypes.TRANSFER] : [];
  }
);

export const bookingRequestedGroundServicesSelector = createSelector(
  bookingBuilderSelector,
  booking => {
    if (!booking || !booking.request) {
      return [];
    }

    return booking.request && booking.request[ProductTypes.GROUND_SERVICE]
      ? booking.request[ProductTypes.GROUND_SERVICE]
      : [];
  }
);

export const bookingRequestedSupplementsSelector = createSelector(
  bookingBuilderSelector,
  booking => {
    if (!booking || !booking.request) {
      return [];
    }
    return booking.request && booking.request[ProductTypes.SUPPLEMENT] ? booking.request[ProductTypes.SUPPLEMENT] : [];
  }
);

export const bookingRequestedFinesSelector = createSelector(
  bookingBuilderSelector,
  booking => {
    if (!booking || !booking.request) {
      return [];
    }
    return booking.request && booking.request[ProductTypes.FINE] ? booking.request[ProductTypes.FINE] : [];
  }
);

// TODO
// look at getBookingReady in `src/store/modules/bookings/selectors.js`
// this selector should care about SR state and travel agent
export const bookingCanBookSelector = createSelector(
  bookingBuilderSelector,
  booking => {
    if (!booking) {
      return false;
    }

    return !booking.response.mustStop && booking.response.canBeBooked;
  }
);

export const bookingCanHoldSelector = createSelector(
  bookingBuilderSelector,
  booking => {
    if (!booking) {
      return false;
    }

    return booking.response.availableToHold;
  }
);

/**
 * HACKS AHEAD
 * this selector SHOULD be able to rely on
 * bookingAvailableTransfersSelector
 * bookingRequestedTransfersSelector
 *
 * instead of the main booking selector
 *
 * however, when we did that, bookingRequestedTransfersSelector was returning STALE data
 * we don't know why
 * that should be investigated
 */
export const bookingRequestedTransfersBreakdownSelector = createSelector(
  bookingBuilderSelector,
  booking => {
    if (!booking) {
      return [];
    }

    const selectedTransfers =
      booking && booking.request && booking.request[ProductTypes.TRANSFER]
        ? clone(booking.request[ProductTypes.TRANSFER])
        : [];
    const availableTransfers = clone(booking.response.availableProductSets.Transfer);

    const tempAvailableProducts = flatten(
      availableTransfers.map(transfer => {
        return (transfer.products = transfer.products.map(product => {
          return {
            ...product,
            direction: transfer.meta && transfer.meta.direction ? transfer.meta.direction : undefined,
            nameWithDirection: `${product.name} (${
              transfer.meta && transfer.meta.direction ? transfer.meta.direction : 'Return'
            })`,
          };
        }));
      })
    );

    const selectedTransferProducts = filterByObjectProperties(tempAvailableProducts, selectedTransfers, [
      'uuid',
      'direction',
    ]);

    if (selectedTransferProducts.length >= 1) {
      return selectedTransferProducts.map(stp => stp.nameWithDirection).join(' & ');
    }

    return 'None selected';
  }
);

export const bookingResponseAllErrors = createSelector(
  bookingBuilderSelector,
  booking => {
    if (!booking || !booking.response.errors) {
      return [];
    }
    return booking.response.errors;
  }
);

export const bookingResponseNonAccommodationErrors = createSelector(
  bookingBuilderSelector,
  booking => {
    if (!booking || !booking.response.errors) {
      return [];
    }
    // following the logic in `getBookingNonAccommodationErrors` in `src/store/modules/bookings/selectors.js`
    return booking.response.errors.filter(e => e.accommodationProductUuid == null);
  }
);

export const bookingResponseLodgingCountsPerAccommodation = createSelector(
  bookingBuilderSelector,
  booking => {
    if (!booking || !booking.response.errors) {
      return [];
    }

    const lodgingCountsPerAccommodation = {};

    booking.request.Accommodation.forEach(reqAccom => {
      // if the dictionary doesn't contain an entry for this UUID, add one
      if (!lodgingCountsPerAccommodation[reqAccom.uuid]) {
        lodgingCountsPerAccommodation[reqAccom.uuid] = 0;
      }

      // now increment its count by 1
      lodgingCountsPerAccommodation[reqAccom.uuid] += 1;
    });

    return lodgingCountsPerAccommodation;
  }
);

export const bookingPotentialBookingSelector = createSelector(
  bookingResponseSelector,
  response => (response ? response.potentialBooking : undefined)
);

export const bookingTextOffersSelector = createSelector(
  bookingResponseSelector,
  response => (response ? response.textOnlyOffersPerLodging : undefined)
);

export const bookingCancellationPoliciesSelector = createSelector(
  bookingPotentialBookingSelector,
  potentialBooking => {
    if (!potentialBooking) {
      return [];
    }

    // long hand, but gives us TS help
    let allCancellationPolicies: string[] = [];
    allCancellationPolicies = allCancellationPolicies.concat(
      potentialBooking.Accommodation.map(product => product.cancellationPolicy)
    );
    allCancellationPolicies = allCancellationPolicies.concat(
      potentialBooking.Fine.map(product => product.cancellationPolicy)
    );
    allCancellationPolicies = allCancellationPolicies.concat(
      potentialBooking['Ground Service'].map(product => product.cancellationPolicy)
    );
    allCancellationPolicies = allCancellationPolicies.concat(
      potentialBooking.Supplement.map(product => product.cancellationPolicy)
    );
    allCancellationPolicies = allCancellationPolicies.concat(
      potentialBooking.Transfer.map(product => product.cancellationPolicy)
    );

    return uniqBy(a => a, flatten(allCancellationPolicies).filter(Boolean));
  }
);

export const bookingPaymentTermsSelector = createSelector(
  bookingPotentialBookingSelector,
  potentialBooking => {
    if (!potentialBooking) {
      return [];
    }

    // long hand, but gives us TS help
    let allPaymentTerms: string[] = [];
    allPaymentTerms = allPaymentTerms.concat(potentialBooking.Accommodation.map(product => product.paymentTerms));
    allPaymentTerms = allPaymentTerms.concat(potentialBooking.Fine.map(product => product.paymentTerms));
    allPaymentTerms = allPaymentTerms.concat(potentialBooking['Ground Service'].map(product => product.paymentTerms));
    allPaymentTerms = allPaymentTerms.concat(potentialBooking.Supplement.map(product => product.paymentTerms));
    allPaymentTerms = allPaymentTerms.concat(potentialBooking.Transfer.map(product => product.paymentTerms));

    return uniqBy(a => a, flatten(allPaymentTerms).filter(Boolean));
  }
);

export const bookingOffersTermsSelector = createSelector(
  bookingPotentialBookingSelector,
  potentialBooking => {
    if (!potentialBooking) {
      return [];
    }

    let allOfferTerms: object[] = [];

    // we lose typehinting, but things were getting ridiculous
    Object.keys(potentialBooking).forEach(productSetKey => {
      potentialBooking[productSetKey].forEach(productSet => {
        productSet.offers.forEach(productSetOffer => {
          allOfferTerms.push({
            name: productSetOffer.offer.name,
            termsAndConditions: productSetOffer.offer.termsAndConditions,
          });
        });
      });
    });

    return uniqBy(a => a, allOfferTerms);
  }
);

export const bookingBuilderHotelUuidSelector = createSelector(
  bookingBuilderDomain,
  bookingBuilderDomain => bookingBuilderDomain.hotelUuid
);

export const isTAMarginAppliedSelector = createSelector(
  bookingBuilderDomain,
  bookingBuilderDomain => bookingBuilderDomain.isTAMarginApplied
);

export const taMarginTypeSelector = createSelector(
  bookingBuilderDomain,
  bookingBuilderDomain => bookingBuilderDomain.taMarginType
);

export const taMarginAmountSelector = createSelector(
  bookingBuilderDomain,
  bookingBuilderDomain => bookingBuilderDomain.taMarginAmount
);
