import { createSelector } from 'reselect';
import { FastSearchDomain } from './model';
import { HotelResult, BookingBuilder } from 'services/BackendApi/types';
import { getHotelId } from 'store/modules/hotel';
import { ProductTypes, Occassions } from 'config/enums';
import { flatten } from 'ramda'

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

export const activeHotelIdSelector = createSelector(
  fastSearchDomain,
  (domain): FastSearchDomain['activeHotelId'] => domain.activeHotelId
);

export const bookingBuilderSelector = createSelector(
  getHotelId,
  offersSearchResultsSelector,
  (hotelId, results): BookingBuilder | undefined => {
    if (!results || !results.length) {
      return undefined;
    }

    const found = results.find(result => {
      return result.uuid === hotelId;
    });
    return found?.bookingBuilder;
  }
);

export const bookingRequestSelector = createSelector(bookingBuilderSelector, booking => booking?.request);

export const bookingResponseSelector = createSelector(bookingBuilderSelector, booking => booking?.response);

export const bookingAvailableProductsSelector = createSelector(
  bookingResponseSelector, (response) => response?.availableProductSets
);

export const bookingAvailableAccommodations = createSelector(
  bookingAvailableProductsSelector, availableProductSets => {
    return availableProductSets ? availableProductSets[ProductTypes.ACCOMMODATION] : [];
  }
);

export const bookingAvailableTransfers = createSelector(
  bookingAvailableProductsSelector, availableProductSets => {
    return availableProductSets ? availableProductSets[ProductTypes.TRANSFER] : [];
  }
);

export const bookingAvailableGroundServices = createSelector(
  bookingAvailableProductsSelector, availableProducts => {
    return availableProducts ? availableProducts[ProductTypes.GROUND_SERVICE] : [];
  }
)

export const bookingAvailableAddons = createSelector(
  bookingAvailableProductsSelector, availableProducts => {
    if (!availableProducts) {
      return [];
    }
    console.log('availableProducts', availableProducts);
    return flatten([availableProducts[ProductTypes.SUPPLEMENT], availableProducts[ProductTypes.FINE]]);
  }
)

export const bookingRequestedAccommodations = createSelector(
  bookingRequestSelector, request => {
    return request && request[ProductTypes.ACCOMMODATION] ? request[ProductTypes.ACCOMMODATION] : [];
  }
)

export const bookingRequestedTransfers = createSelector(
  bookingRequestSelector, request => {
    return request && request[ProductTypes.TRANSFER] ? request[ProductTypes.TRANSFER] : [];
  }
)

export const bookingRequestedGroundServices = createSelector(
  bookingRequestSelector, request => {
    return request && request[ProductTypes.GROUND_SERVICE] ? request[ProductTypes.GROUND_SERVICE] : [];
  }
)

export const bookingRequestedSupplements = createSelector(
  bookingRequestSelector, request => {
    return request && request[ProductTypes.SUPPLEMENT]? request[ProductTypes.SUPPLEMENT] : [];
  }
)

export const bookingRequestedFines = createSelector(
  bookingRequestSelector, request => {

    console.log('request', request);
    
    return request && request[ProductTypes.FINE] ? request[ProductTypes.FINE] : [];
  }
)