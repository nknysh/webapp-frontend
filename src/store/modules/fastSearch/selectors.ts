import { createSelector } from 'reselect';
import { FastSearchDomain } from './model';
import { HotelResult, BookingBuilder } from 'services/BackendApi/types';
import { ALL_COUNTRIES_AND_RESORTS } from './constants';
import { IDateRange } from './types';
import { format, isSameMonth, isSameYear, differenceInCalendarDays, addDays } from 'date-fns';
import { DateHelper } from 'pureUi/DatePicker';

import { bookingBuilderHotelUuidSelector } from 'store/modules/bookingBuilder';
import { formatDate } from 'utils';

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
      const totalsA = a.bookingBuilder.response.totals;
      const totalsB = b.bookingBuilder.response.totals;

      if (totalsA.oneOrMoreItemsOnRequest || totalsB.oneOrMoreItemsOnRequest) {
        return totalsA.oneOrMoreItemsOnRequest === totalsB.oneOrMoreItemsOnRequest
          ? 0
          : totalsA.oneOrMoreItemsOnRequest
          ? 1
          : -1;
      }

      const totalA = totalsA.totalForPricedItemsCents;
      const totalB = totalsB.totalForPricedItemsCents;
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

export const totalGuestCountSelector = createSelector(lodgingSelector, (lodgings): number =>
  lodgings.reduce((acc, next) => acc + next.numberOfAdults + next.agesOfAllChildren!.length, 0)
);

export const showLodgingControlsSelector = createSelector(
  fastSearchDomain,
  (domain): FastSearchDomain['showLodgingControls'] => domain.showLodgingControls
);

export const showNameSearchResultsSelector = createSelector(
  fastSearchDomain,
  (domain): FastSearchDomain['showNameSearchResults'] => domain.showNameSearchResults
);

export const activeHotelIdSelector = createSelector(
  fastSearchDomain,
  (domain): FastSearchDomain['activeHotelId'] => domain.activeHotelId
);

export const lastExecutedQuerySelector = createSelector(
  fastSearchDomain,
  (domain): FastSearchDomain['lastExecutedQuery'] => domain.lastExecutedQuery
);

export const dateRangeSelector = createSelector(
  offersQuerySelector,
  (query): IDateRange => {
    // @see https://pureescapes.atlassian.net/browse/OWA-1031
    const end = addDays(new Date(query.endDate), 1);
    return { start: query.startDate, end: formatDate(end) };
  }
);

export const totalStayNightsSelector = createSelector(dateRangeSelector, (dateRange): number => {
  if (!dateRange.end) {
    return 0;
  }
  return differenceInCalendarDays(new Date(dateRange.end), new Date(dateRange.start));
});

export const totalStayDaysSelector = createSelector(totalStayNightsSelector, (days): number => {
  return days + 1;
});

export const datePickerCurrentDateSelector = createSelector(
  fastSearchDomain,
  (domain): FastSearchDomain['datePickerCurrentDate'] => domain.datePickerCurrentDate
);

export const dateSelectionInProgressSelector = createSelector(
  fastSearchDomain,
  (domain): FastSearchDomain['dateSelectionInProgress'] => domain.dateSelectionInProgress
);

export const showDatePickerSelector = createSelector(
  fastSearchDomain,
  (domain): FastSearchDomain['showDatePicker'] => domain.showDatePicker
);

export const isRepeatGuestSelector = createSelector(lodgingSelector, (lodging): boolean => lodging[0].repeatCustomer);

export const selectedDatesSelector = createSelector(
  dateRangeSelector,
  totalStayDaysSelector,
  (dateRange, totalStayDays): string[] => {
    const firstTimestamp = new Date(dateRange.start).getTime();
    return DateHelper.generateDatesFrom(firstTimestamp, totalStayDays, 'en-US').map(d => d.dateString);
  }
);

export const dateRangeDisplayStringSelector = createSelector(dateRangeSelector, (dateRange): string => {
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
});

export const fastSearchBookingBuilderSelector = createSelector(
  bookingBuilderHotelUuidSelector,
  offersSearchResultsSelector,
  (hotelId, results): BookingBuilder | undefined => {
    if (!results || !results.length) {
      return undefined;
    }

    const found = results.find(result => {
      return result.uuid === hotelId;
    });

    return found ? found.bookingBuilder : undefined;
  }
);

export const nameSearchResultsSelector = createSelector(fastSearchDomain, (domain): string[][] => {
  if (!domain.nameSearchResults) {
    return [];
  }
  const countries = domain.nameSearchResults.countries.map(v => v.name);
  const hotels = domain.nameSearchResults.hotels.map(v => v.name);
  return [[ALL_COUNTRIES_AND_RESORTS], countries, hotels];
});

export const canSearchSelector = createSelector(lodgingSelector, dateRangeSelector, (lodgings, dateRange): boolean =>
  [
    dateRange.start,
    dateRange.end,
    lodgings.every(lg => lg.numberOfAdults > 0 || (lg.agesOfAllChildren && lg.agesOfAllChildren.length > 0)),
  ].every(item => Boolean(item))
);
