import { createSelector } from 'reselect';
import { FastSearchDomain } from './model';
import { HotelResult, BookingBuilder, BookingBuilderRequest } from 'services/BackendApi/types';
import { getHotelId } from 'store/modules/hotel';
import { ALL_COUNTRIES_AND_RESORTS } from './constants';
import { ProductTypes, Occassions } from 'config/enums';
import { flatten, clone } from 'ramda'
import { filterByObjectProperties } from 'utils'

const fastSearchDomain = (state: any): FastSearchDomain => state.fastSearch;

export const searchOptionsPendingSelector = createSelector(
  fastSearchDomain,
  (domain: FastSearchDomain): FastSearchDomain['optionsRequestPending'] => domain.optionsRequestPending
);

export const searchOptionsErrorSelector = createSelector(
  fastSearchDomain,
  (domain: FastSearchDomain): FastSearchDomain['optionsRequestError'] => domain.optionsRequestError
);

export const searchOptionsSelector = createSelector(
  fastSearchDomain,
  (domain: FastSearchDomain): FastSearchDomain['options'] => domain.options
);

export const offersSearchPendingSelector = createSelector(
  fastSearchDomain,
  (domain: FastSearchDomain): FastSearchDomain['offersRequestPending'] => domain.offersRequestPending
);

export const offersSearchResultsSelector = createSelector(
  fastSearchDomain,
  (domain: FastSearchDomain): FastSearchDomain['results'] => domain.results
);

export const orderedSearchResults = createSelector(
  offersSearchResultsSelector,
  (results): FastSearchDomain['results'] => {
    if (!results) {
      return null;
    }

    return results.sort((a: HotelResult, b: HotelResult) => {
      const totalA = a.bookingBuilder.response.totals.totalForPricedItemsCents;
      const totalB = b.bookingBuilder.response.totals.totalForPricedItemsCents;
      return totalA - totalB;
    });
  }
);

// Query Stuff
export const offersQuerySelector = createSelector(
  fastSearchDomain,
  (domain): FastSearchDomain['query'] => domain.query
);

export const activeFiltersSelector = createSelector(
  offersQuerySelector,
  (query): FastSearchDomain['query']['filters'] => query.filters
);

export const priceRangeSelector = createSelector(
  offersQuerySelector,
  (query): FastSearchDomain['query']['priceRange'] => query.priceRange
);

export const showRegionsSelector = createSelector(
  fastSearchDomain,
  (domain): FastSearchDomain['showRegions'] => domain.showRegions
);

export const activeLodingIndexSelector = createSelector(
  fastSearchDomain,
  (domain): FastSearchDomain['activeLodgingIndex'] => domain.activeLodgingIndex
);

export const expandedHighlightsSelector = createSelector(
  fastSearchDomain,
  (domain): FastSearchDomain['expandedHighlights'] => domain.expandedHighlights
);

export const lodgingSelector = createSelector(
  offersQuerySelector,
  (query): FastSearchDomain['query']['lodgings'] => query.lodgings
);

export const totalGuestCountSelector = createSelector(
  lodgingSelector,
  (lodgings): number => lodgings.reduce((acc, next) => acc + next.numberOfAdults + next.agesOfAllChildren!.length, 0)
);

export const showLodgingControlsSelector = createSelector(
  fastSearchDomain,
  (domain): FastSearchDomain['showLodgingControls'] => domain.showLodgingControls
);

export const showNameSearchResultsSelector = createSelector(
  fastSearchDomain,
  (domain): FastSearchDomain['showNameSearchResults'] => domain.showNameSearchResults
)

export const activeHotelIdSelector = createSelector(
  fastSearchDomain,
  (domain): FastSearchDomain['activeHotelId'] => domain.activeHotelId
);

export const bookingBuilderSelector = createSelector(
  getHotelId,
  offersSearchResultsSelector,
  (hotelId, results): BookingBuilder | undefined => {
    console.log('hotelId', hotelId);
    if (!results || !results.length) {
      return undefined;
    }

    const found = results.find(result => {
      return result.uuid === hotelId;
    });
    return found?.bookingBuilder;
  }
);

export const nameSearchResultsSelector = createSelector(
  fastSearchDomain,
  (domain): string[][] => {
    if(!domain.nameSearchResults) {
      return [];
    }
    const countries = domain.nameSearchResults.countries.map(v => v.name);
    const hotels = domain.nameSearchResults.hotels.map(v => v.name);
    return [[ALL_COUNTRIES_AND_RESORTS],countries, hotels];
  }
)

export const bookingRequestSelector = createSelector(bookingBuilderSelector, (booking) : BookingBuilderRequest | undefined => {
  return booking?.request
});

export const bookingResponseSelector = createSelector(bookingBuilderSelector, booking => booking?.response);

export const bookingAvailableProductsSelector = createSelector(
  bookingResponseSelector, (response) => response?.availableProductSets
);

export const bookingAvailableAccommodationsSelector = createSelector(
  bookingAvailableProductsSelector, availableProductSets => {
    return availableProductSets ? availableProductSets[ProductTypes.ACCOMMODATION] : [];
  }
);

export const bookingAvailableTransfersSelector = createSelector(
  bookingAvailableProductsSelector, availableProductSets => {
    return availableProductSets ? availableProductSets[ProductTypes.TRANSFER] : [];
  }
);

export const bookingAvailableGroundServicesSelector = createSelector(
  bookingAvailableProductsSelector, availableProducts => {
    return availableProducts ? availableProducts[ProductTypes.GROUND_SERVICE] : [];
  }
)

export const bookingAvailableAddonsSelector = createSelector(
  bookingAvailableProductsSelector, availableProducts => {
    if (!availableProducts) {
      return [];
    }
    return flatten([availableProducts[ProductTypes.SUPPLEMENT], availableProducts[ProductTypes.FINE]]);
  }
)

export const bookingRequestedAccommodationsSelector = createSelector(
  bookingRequestSelector, request => {
    return request && request[ProductTypes.ACCOMMODATION] ? request[ProductTypes.ACCOMMODATION] : [];
  }
)

export const bookingRequestedTransfersSelector = createSelector(
  bookingRequestSelector, request => {
    return request && request[ProductTypes.TRANSFER] ? request[ProductTypes.TRANSFER] : [];
  }
)

export const bookingRequestedGroundServicesSelector = createSelector(
  bookingRequestSelector, request => {
    return request && request[ProductTypes.GROUND_SERVICE] ? request[ProductTypes.GROUND_SERVICE] : [];
  }
)

export const bookingRequestedSupplementsSelector = createSelector(
  bookingRequestSelector, request => {
    return request && request[ProductTypes.SUPPLEMENT]? request[ProductTypes.SUPPLEMENT] : [];
  }
)

export const bookingRequestedFinesSelector = createSelector(
  bookingRequestSelector, request => {
    return request && request[ProductTypes.FINE] ? request[ProductTypes.FINE] : [];
  }
)

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
  bookingBuilderSelector, (booking) => {
    if (!booking) {
      return [];
    }

    const selectedTransfers = booking && booking.request && booking.request[ProductTypes.TRANSFER] ? clone(booking.request[ProductTypes.TRANSFER]) : [];
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
)