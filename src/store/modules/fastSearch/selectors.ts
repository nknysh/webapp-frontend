import { createSelector } from 'reselect';
import { FastSearchDomain } from './model';
import { HotelResult, BookingBuilder } from 'services/BackendApi/types';
import { getHotelId } from 'store/modules/hotel';

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
    console.log('hotelId', hotelId);
    console.log('found', found?.bookingBuilder);
    return found?.bookingBuilder;
  }
);
