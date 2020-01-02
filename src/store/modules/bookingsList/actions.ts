import { IBookingsListItem, IHotelNameItem } from 'services/BackendApi';

export const GET_BOOKING_LIST_REQUEST = 'bookingList/GET_BOOKING_LIST_REQUEST';
export const GET_BOOKING_LIST_SUCCESS = 'bookingList/GET_BOOKING_LIST_SUCCESS';
export const GET_BOOKING_LIST_FAILURE = 'bookingList/GET_BOOKING_LIST_FAILURE';

export const GET_HOTEL_NAMES_REQUEST = 'bookingList/GET_HOTEL_NAMES_REQUEST';
export const GET_HOTEL_NAMES_SUCCESS = 'bookingList/GET_HOTEL_NAMES_SUCCESS';
export const GET_HOTEL_NAMES_FAILURE = 'bookingList/GET_HOTEL_NAMES_FAILURE';

export const SET_FILTER = 'bookingList/SET_FILTER';
export const SET_PAGE_NUMBER = 'bookingList/SET_PAGE_NUMBER';
export const SET_SORT = 'bookingList/SET_SORT';
export const SET_TRAVEL_AGENT_UUID = 'bookingList/SET_TRAVEL_AGENT_UUID';
export const SET_HOTEL = 'bookingList/SET_HOTEL';
export const SET_STATUS = 'bookingList/SET_STATUS';

export type GetBookingListRequestAction = ReturnType<typeof getBookingListRequestAction>;
export const getBookingListRequestAction = () => ({
  type: GET_BOOKING_LIST_REQUEST as typeof GET_BOOKING_LIST_REQUEST,
});

export type GetBookingListSuccessAction = ReturnType<typeof getBookingListSuccessAction>;
export const getBookingListSuccessAction = (bookings: IBookingsListItem[], totalResults: number) => ({
  type: GET_BOOKING_LIST_SUCCESS as typeof GET_BOOKING_LIST_SUCCESS,
  bookings,
  totalResults,
});

export type GetBookingListFailureAction = ReturnType<typeof getBookingListFailureAction>;
export const getBookingListFailureAction = (error: string) => ({
  type: GET_BOOKING_LIST_FAILURE as typeof GET_BOOKING_LIST_FAILURE,
  error,
});

export type GetHotelNamesRequestAction = ReturnType<typeof getHotelNamesRequestAction>;
export const getHotelNamesRequestAction = () => ({
  type: GET_HOTEL_NAMES_REQUEST as typeof GET_HOTEL_NAMES_REQUEST,
});

export type GetHotelNamesSuccessAction = ReturnType<typeof getHotelNamesSuccessAction>;
export const getHotelNamesSuccessAction = (hotelNames: IHotelNameItem[]) => ({
  type: GET_HOTEL_NAMES_SUCCESS as typeof GET_HOTEL_NAMES_SUCCESS,
  hotelNames,
});

export type GetHotelNamesFailureAction = ReturnType<typeof getHotelNamesFailureAction>;
export const getHotelNamesFailureAction = (error: any) => ({
  type: GET_HOTEL_NAMES_FAILURE as typeof GET_HOTEL_NAMES_FAILURE,
  error,
});

export type SetFilterAction = ReturnType<typeof setFilterAction>;
export const setFilterAction = (filter: string) => ({
  type: SET_FILTER as typeof SET_FILTER,
  filter,
});

export type SetPageNumberAction = ReturnType<typeof setPageNumberAction>;
export const setPageNumberAction = (pageNumber: any) => ({
  type: SET_PAGE_NUMBER as typeof SET_PAGE_NUMBER,
  pageNumber,
});

export type SetSortAction = ReturnType<typeof setSortAction>;
export const setSortAction = (sortBy: keyof IBookingsListItem, sortOrder: 'asc' | 'desc') => ({
  type: SET_SORT as typeof SET_SORT,
  sortBy,
  sortOrder,
});

export type SetSelectedTravelAgentAction = ReturnType<typeof setSelectedTravelAgentAction>;
export const setSelectedTravelAgentAction = (travelAgentUuid: string) => ({
  type: SET_TRAVEL_AGENT_UUID as typeof SET_TRAVEL_AGENT_UUID,
  travelAgentUuid,
});

export type SetSelectedHotelAction = ReturnType<typeof setSelectedHotelAction>;
export const setSelectedHotelAction = (hotel: string) => ({
  type: SET_HOTEL as typeof SET_HOTEL,
  hotel,
});

export type SetSelectedStatusAction = ReturnType<typeof setSelectedStatusAction>;
export const setSelectedStatusAction = (status: string) => ({
  type: SET_STATUS as typeof SET_STATUS,
  status,
});

export type BookingsListAction =
  | GetBookingListRequestAction
  | GetBookingListSuccessAction
  | GetBookingListFailureAction
  | GetHotelNamesRequestAction
  | GetHotelNamesSuccessAction
  | GetHotelNamesFailureAction
  | SetFilterAction
  | SetPageNumberAction
  | SetSortAction
  | SetSelectedTravelAgentAction
  | SetSelectedHotelAction
  | SetSelectedStatusAction;
