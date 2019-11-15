import { createSelector } from 'reselect';
import { FastSearchDomain } from './model';
import { SearchQuery, SearchOptions, HotelResult } from 'services/BackendApi/types';
import { ErrorResponse } from '../../../services/BackendApi/types/ErrorResponse';

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

export const offersSearchPending = createSelector(
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
      const totalA = a.bookingBuilder.response.aggregateTotals.Booking.totalForPricedItemsCents;
      const totalB = b.bookingBuilder.response.aggregateTotals.Booking.totalForPricedItemsCents;
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
