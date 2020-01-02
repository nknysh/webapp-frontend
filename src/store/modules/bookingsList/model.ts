import { IBookingsListItem } from 'services/BackendApi/types/BookingsListResponse';
import { IHotelNameItem } from '../../../services/BackendApi/types/HotelNamesResponse';

export interface IBookingsListDomain {
  requestPending: boolean;
  hotelsRequestPending: boolean;
  error: any | null;
  bookings: IBookingsListItem[] | null;
  filter: string;
  itemsPerPage: number;
  currentPage: number;
  totalResults: number;
  sortBy: keyof IBookingsListItem;
  sortOrder: 'asc' | 'desc';
  filterFields: string[];
  bookingFields: string[];
  travelAgentUuid: string | null;
  hotel: string | null;
  bookingStatus: string | null;
  hotelNames: IHotelNameItem[] | null;
  hotelNamesError: string | null;
}

export const initialState: IBookingsListDomain = {
  requestPending: true,
  hotelsRequestPending: false,
  error: null,
  bookings: null,
  filter: '',
  itemsPerPage: 10,
  currentPage: 0,
  sortBy: 'createdAt',
  sortOrder: 'asc',
  totalResults: 0,
  filterFields: ['uuid', 'guestFirstName', 'guestLastName'],
  bookingFields: ['hotelUuid'],
  travelAgentUuid: null,
  hotel: null,
  bookingStatus: null,
  hotelNames: null,
  hotelNamesError: null,
};
