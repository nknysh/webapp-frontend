import { createSelector } from 'reselect';
import { FastSearchDomain } from './model';
import { HotelResult, BookingBuilder, BookingBuilderRequest } from 'services/BackendApi/types';
import { getHotelId } from 'store/modules/hotel';
import { ALL_COUNTRIES_AND_RESORTS } from './constants';
import { getNumberOfDays } from 'utils';
import { ProductTypes, Occassions } from 'config/enums';
import { flatten, clone, path } from 'ramda'
import { filterByObjectProperties } from 'utils'
import { IDateRange } from './types';
import { format, isSameMonth, isSameYear, differenceInCalendarDays } from 'date-fns';
import {DateHelper} from 'pureUi/DatePicker';

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

export const queryHasChangedSelector = createSelector(
  fastSearchDomain,
  (domain): FastSearchDomain['queryHasChanged'] => domain.queryHasChanged
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

export const dateRangeSelector = createSelector(
  offersQuerySelector,
  (query): IDateRange => ({ start: query.startDate, end: query.endDate})
);

export const totalStayNightsSelector = createSelector(
  dateRangeSelector,
  (dateRange): number => {
    if(!dateRange.end) { return 0; }
    return differenceInCalendarDays(new Date(dateRange.end), new Date(dateRange.start)) ;
  }
);

export const totalStayDaysSelector = createSelector(
  totalStayNightsSelector,
  (days): number => {
    return days + 1;
  }
);

export const datePickerCurrentDateSelector = createSelector(
  fastSearchDomain,
  (domain): FastSearchDomain['datePickerCurrentDate'] => domain.datePickerCurrentDate,
)

export const dateSelectionInProgressSelector = createSelector(
  fastSearchDomain,
  (domain): FastSearchDomain['dateSelectionInProgress'] => domain.dateSelectionInProgress,
);

export const showDatePickerSelector = createSelector(
  fastSearchDomain,
  (domain): FastSearchDomain['showDatePicker'] => domain.showDatePicker,
);

export const isRepeatGuestSelector = createSelector(
  lodgingSelector,
  (lodging): boolean => lodging[0].repeatCustomer,
);


export const selectedDatesSelector = createSelector(
  dateRangeSelector,
  totalStayDaysSelector,
  (dateRange, totalStayDays): string[] => {
    const firstTimestamp = new Date(dateRange.start).getTime();
    return DateHelper.generateDatesFrom(firstTimestamp, totalStayDays, 'en-US')
      .map(d => d.dateString);
  }
)

export const dateRangeDisplayStringSelector = createSelector(
  dateRangeSelector,
  (dateRange): string => {
    if (!dateRange.start || !dateRange.end) {
      return 'Select date range';
    }
  
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
  
    const startDay = format(startDate, 'd');
    const endDay = format(endDate, 'd');
    const startMonth = format(startDate, 'LLL');
    const endMonth = format(endDate, 'LLL');
    const startYear = format(startDate, 'yyyy');
    const endYear = format(endDate, 'yyyy');
    const inSameMonth = isSameMonth(startDate, endDate);
    const inSameYear = isSameYear(startDate, endDate);
  
    if (!inSameMonth && inSameYear) {
      return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${endYear}`;
    }
  
    if (!inSameMonth && !inSameYear) {
      return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
    }
  
    return `${startDay} - ${endDay} ${startMonth} ${endYear}`;
  }
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

export const bookingAvailableSupplementsSelector = createSelector(
  bookingAvailableProductsSelector, availableProducts => {
    if (!availableProducts) {
      return [];
    }
    return availableProducts[ProductTypes.SUPPLEMENT];
  }
)

export const bookingAvailableFinesSelector = createSelector(
  bookingAvailableProductsSelector, availableProducts => {
    if (!availableProducts) {
      return [];
    }
    return availableProducts[ProductTypes.FINE];
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
  bookingBuilderSelector, booking => {
    if (!booking || !booking.request) {
      return [];
    }

    return booking.request && booking.request[ProductTypes.GROUND_SERVICE] ? booking.request[ProductTypes.GROUND_SERVICE] : [];
  }
)

export const bookingRequestedSupplementsSelector = createSelector(
  bookingBuilderSelector, booking => {
    if (!booking || !booking.request) {
      return [];
    }
    return booking.request && booking.request[ProductTypes.SUPPLEMENT]? booking.request[ProductTypes.SUPPLEMENT] : [];
  }
)

export const bookingRequestedFinesSelector = createSelector(
  bookingBuilderSelector, booking => {
    if (!booking || !booking.request) {
      return [];
    }
    return booking.request && booking.request[ProductTypes.FINE] ? booking.request[ProductTypes.FINE] : [];
  }
)


// TODO
// look at getBookingReady in `src/store/modules/bookings/selectors.js`
// this selector should care about SR state and travel agent
export const bookingCanBookSelector = createSelector(
  bookingBuilderSelector, (booking) => {
    if (!booking) {
      return false;
    }

    return !booking.response.mustStop && booking.response.canBeBooked;
  }
);

export const bookingCanHoldSelector = createSelector(
  bookingBuilderSelector, (booking) => {
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

export const bookingResponseNonAccommodationErrors = createSelector(
  bookingBuilderSelector, (booking) => {
    if (!booking || !booking.response.errors) {
      return [];
    }
    // following the logic in `getBookingNonAccommodationErrors` in `src/store/modules/bookings/selectors.js`
    return booking.response.errors.filter(e => e.accommodationProductUuid == null);
  }
)