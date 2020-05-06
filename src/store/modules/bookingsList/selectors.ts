import { createSelector } from 'reselect';
import { IBookingsListDomain, initialState } from './model';
import { isSR } from 'store/modules/auth';
import { IHotelNameItem } from '../../../services/BackendApi/types/HotelNamesResponse';
import { IValueLabelPair } from '../../../interfaces';

const bookingsListDomain = (state: any) => state.bookingsList;

export const requestPendingSelector = createSelector(
  bookingsListDomain,
  (domain: IBookingsListDomain): IBookingsListDomain['requestPending'] => domain.requestPending
);

export const errorSelector = createSelector(
  bookingsListDomain,
  (domain: IBookingsListDomain): IBookingsListDomain['error'] => domain.error
);

export const bookingsSelector = createSelector(
  bookingsListDomain,
  (domain: IBookingsListDomain): IBookingsListDomain['bookings'] => {
    return domain.bookings;
  }
);

export const filterSelector = createSelector(
  bookingsListDomain,
  (domain: IBookingsListDomain): IBookingsListDomain['filter'] => domain.filter
);

export const itemsPerPageSelector = createSelector(
  bookingsListDomain,
  (domain: IBookingsListDomain): IBookingsListDomain['itemsPerPage'] => domain.itemsPerPage
);

export const currentPageSelector = createSelector(
  bookingsListDomain,
  (domain: IBookingsListDomain): IBookingsListDomain['currentPage'] => domain.currentPage
);

export const totalResultsSelector = createSelector(
  bookingsListDomain,
  (domain: IBookingsListDomain): IBookingsListDomain['totalResults'] => domain.totalResults
);

export const filterFieldsSelector = createSelector(
  bookingsListDomain,
  (domain: IBookingsListDomain): IBookingsListDomain['filterFields'] => domain.filterFields
);

export const bookingFieldsSelector = createSelector(
  bookingsListDomain,
  (domain: IBookingsListDomain): IBookingsListDomain['bookingFields'] => domain.bookingFields
);

export const sortBySelector = createSelector(
  bookingsListDomain,
  (domain: IBookingsListDomain): IBookingsListDomain['sortBy'] => domain.sortBy
);

export const sortOrderSelector = createSelector(
  bookingsListDomain,
  (domain: IBookingsListDomain): IBookingsListDomain['sortOrder'] => domain.sortOrder
);

export const pageCountSelector = createSelector(
  itemsPerPageSelector,
  totalResultsSelector,
  (itemsPerPage, totalResults): number => {
    return itemsPerPage && totalResults ? Math.ceil(totalResults / itemsPerPage) : 0;
  }
);

export const selectedTravelAgentUuidSelector = createSelector(
  bookingsListDomain,
  (domain: IBookingsListDomain): IBookingsListDomain['travelAgentUuid'] => domain.travelAgentUuid
);

export const selectedHotelSelector = createSelector(
  bookingsListDomain,
  (domain: IBookingsListDomain): IBookingsListDomain['hotel'] => domain.hotel
);

export const selectedStatusSelector = createSelector(
  bookingsListDomain,
  (domain: IBookingsListDomain): IBookingsListDomain['bookingStatus'] => domain.bookingStatus
);

export const getHotelNamesSelector = createSelector(
  bookingsListDomain,
  (domain: IBookingsListDomain): IBookingsListDomain['hotelNames'] => domain.hotelNames
);

export const getHotelsRequestPendingSelector = createSelector(
  bookingsListDomain,
  (domain: IBookingsListDomain): IBookingsListDomain['hotelsRequestPending'] => domain.hotelsRequestPending
);

export const getHotelNamesErrorSelector = createSelector(
  bookingsListDomain,
  (domain: IBookingsListDomain): IBookingsListDomain['hotelNamesError'] => domain.hotelNamesError
);

export const hotelNameOptionsSelector = createSelector(
  getHotelNamesSelector,
  getHotelsRequestPendingSelector,
  getHotelNamesErrorSelector,
  (hotelNames: IHotelNameItem[] | null, requestPending: boolean, error: string | null): IValueLabelPair[] => {
    if (requestPending) {
      return [{ value: '', label: 'Loading hotel names', disabled: true }];
    }

    if (error) {
      return [{ value: '', label: 'Error loading hotel names', disabled: true }];
    }

    if (!hotelNames) {
      return [{ value: '', label: 'No hotels', disabled: true }];
    }

    const initialOption = { value: '', label: 'All Hotels' };
    const options = hotelNames.map(h => ({ value: h.uuid, label: h.name }));
    return [initialOption, ...options];
  }
);

export const bookingsListQuerySelector = createSelector(
  sortBySelector,
  filterSelector,
  bookingFieldsSelector,
  currentPageSelector,
  itemsPerPageSelector,
  sortOrderSelector,
  filterFieldsSelector,
  selectedTravelAgentUuidSelector,
  selectedHotelSelector,
  selectedStatusSelector,
  isSR,
  (
    sortBy,
    filter,
    bookingFields,
    currentPage,
    itemsPerPage,
    sortOrder,
    filterFields,
    travelAgentUuid,
    hotel,
    status,
    isSr
  ) => {
    let filterParam = {
      booking: {},
    };

    if (filter != '') {
      filterParam = {
        booking: {
          [`${filterFields.join(',')}:ilike`]: filter,
        },
      };
    }

    const associations: string[] = [];

    if (isSr) {
      associations.push('travelAgent');
    }

    if (travelAgentUuid) {
      filterParam['booking']['travelAgentUserUuid'] = travelAgentUuid;
    }
    if (hotel) {
      filterParam['booking']['hotelUuid'] = hotel;
    }
    if (status) {
      filterParam['booking']['status'] = status;
    }

    return {
      sort: sortOrder === 'asc' ? `booking.${sortBy}` : `-booking.${sortBy}`,
      page: {
        offset: currentPage * itemsPerPage,
        limit: itemsPerPage,
      },
      fields: {
        booking:
          'uuid,humanReadableId,checkInDate,checkOutDate,guestTitle,guestFirstName,guestLastName,guestEmail,status,travelAgentUserUuid,hotelName,hotelUuid,overrideTotal,createdAt,updatedAt,clientUuid',
      },
      filter: filterParam,
      associations: associations.length >= 1 ? associations.join(',') : undefined,
    };
  }
);
