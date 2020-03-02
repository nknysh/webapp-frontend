import { IOffersListItem } from 'services/BackendApi';

export const GET_OFFERS_LIST_REQUEST = 'offersList/GET_OFFERS_LIST_REQUEST';
export const GET_OFFERS_LIST_SUCCESS = 'offersList/GET_OFFERS_LIST_SUCCESS';
export const GET_OFFERS_LIST_FAILURE = 'offersList/GET_OFFERS_LIST_FAILURE';
export const SET_FILTER = 'offersList/SET_FILTER';
export const SET_PAGE_NUMBER = 'offersList/SET_PAGE_NUMBER';
export const SET_SORT = 'offersList/SET_SORT';
export const SET_TRAVEL_AGENT_UUID = 'offersList/SET_TRAVEL_AGENT_UUID';
export const ADD_OFFER_UUID_TO_BULK_ACTION_SELECTED_UUIDS = 'offersList/ADD_OFFER_UUID_TO_BULK_ACTION_SELECTED_UUIDS';
export const REMOVE_OFFER_UUID_FROM_BULK_ACTION_SELECTED_UUIDS =
  'offersList/REMOVE_OFFER_UUID_FROM_BULK_ACTION_SELECTED_UUIDS';
export const TOGGLE_IS_BULK_DELETE_CONFIRM_OPEN = 'offersList/TOGGLE_IS_BULK_DELETE_CONFIRM_OPEN';
export const CONFIRM_REQUEST_TO_DELETE_OFFERS = 'offersList/CONFIRM_REQUEST_TO_DELETE_OFFERS';
export const OFFERS_DELETE_SUCCESS = 'offersList/OFFERS_DELETE_SUCCESS';
export const OFFERS_DELETE_FAIL = 'offersList/OFFERS_DELETE_FAIL';
export const DISMISS_ERROR = 'offersList/DISMISS_ERROR';

export type GetOffersListRequestAction = ReturnType<typeof getOffersListRequestAction>;
export const getOffersListRequestAction = () => ({
  type: GET_OFFERS_LIST_REQUEST as typeof GET_OFFERS_LIST_REQUEST,
});

export type GetOffersListSuccessAction = ReturnType<typeof getOffersListSuccessAction>;
export const getOffersListSuccessAction = (offers: IOffersListItem[], totalResults: number) => ({
  type: GET_OFFERS_LIST_SUCCESS as typeof GET_OFFERS_LIST_SUCCESS,
  offers,
  totalResults,
});

export type GetOffersListFailureAction = ReturnType<typeof getOffersListFailureAction>;
export const getOffersListFailureAction = (error: any) => ({
  type: GET_OFFERS_LIST_FAILURE as typeof GET_OFFERS_LIST_FAILURE,
  error,
});

export type SetFilterAction = ReturnType<typeof setFilterAction>;
export const setFilterAction = (filter: string) => ({
  type: SET_FILTER as typeof SET_FILTER,
  filter,
});

export type SetPageNumberAction = ReturnType<typeof setPageNumberAction>;
export const setPageNumberAction = (pageNumber: number) => ({
  type: SET_PAGE_NUMBER as typeof SET_PAGE_NUMBER,
  pageNumber,
});

export type SetSortAction = ReturnType<typeof setSortAction>;
export const setSortAction = (sortBy: keyof IOffersListItem, sortOrder: 'asc' | 'desc') => ({
  type: SET_SORT as typeof SET_SORT,
  sortBy,
  sortOrder,
});

export type SetSelectedTravelAgentAction = ReturnType<typeof setSelectedTravelAgentAction>;
export const setSelectedTravelAgentAction = (travelAgentUuid: string) => ({
  type: SET_TRAVEL_AGENT_UUID as typeof SET_TRAVEL_AGENT_UUID,
  travelAgentUuid,
});

export type AddOfferUuidToBulkActionSelectedUuidsAction = ReturnType<
  typeof addOfferUuidToBulkActionSelectedUuidsAction
>;
export const addOfferUuidToBulkActionSelectedUuidsAction = (offerUuid: string) => ({
  type: ADD_OFFER_UUID_TO_BULK_ACTION_SELECTED_UUIDS as typeof ADD_OFFER_UUID_TO_BULK_ACTION_SELECTED_UUIDS,
  offerUuid,
});

export type RemoveOfferUuidFromBulkActionSelectedUuidsAction = ReturnType<
  typeof removeOfferUuidFromBulkActionSelectedUuidsAction
>;
export const removeOfferUuidFromBulkActionSelectedUuidsAction = (offerUuid: string) => ({
  type: REMOVE_OFFER_UUID_FROM_BULK_ACTION_SELECTED_UUIDS as typeof REMOVE_OFFER_UUID_FROM_BULK_ACTION_SELECTED_UUIDS,
  offerUuid,
});

export type ToggleIsBulkDeleteConfirmOpenAction = ReturnType<typeof toggleIsBulkDeleteConfirmOpenAction>;
export const toggleIsBulkDeleteConfirmOpenAction = () => ({
  type: TOGGLE_IS_BULK_DELETE_CONFIRM_OPEN as typeof TOGGLE_IS_BULK_DELETE_CONFIRM_OPEN,
});

export type ConfirmRequestToDeleteOffersAction = ReturnType<typeof confirmRequestToDeleteOffersAction>;
export const confirmRequestToDeleteOffersAction = () => ({
  type: CONFIRM_REQUEST_TO_DELETE_OFFERS as typeof CONFIRM_REQUEST_TO_DELETE_OFFERS,
});

export type OffersDeleteSuccessAction = ReturnType<typeof offersDeleteSuccessAction>;
export const offersDeleteSuccessAction = () => ({
  type: OFFERS_DELETE_SUCCESS as typeof OFFERS_DELETE_SUCCESS,
});

export type OffersDeleteFailAction = ReturnType<typeof offersDeleteFailAction>;
export const offersDeleteFailAction = error => ({
  type: OFFERS_DELETE_FAIL as typeof OFFERS_DELETE_FAIL,
  error,
});

export type DismissErrorAction = ReturnType<typeof dismissErrorAction>;
export const dismissErrorAction = () => ({
  type: DISMISS_ERROR as typeof DISMISS_ERROR,
});

export type OffersListAction =
  | GetOffersListRequestAction
  | GetOffersListSuccessAction
  | GetOffersListFailureAction
  | SetFilterAction
  | SetPageNumberAction
  | SetSortAction
  | SetSelectedTravelAgentAction
  | AddOfferUuidToBulkActionSelectedUuidsAction
  | RemoveOfferUuidFromBulkActionSelectedUuidsAction
  | ToggleIsBulkDeleteConfirmOpenAction
  | ConfirmRequestToDeleteOffersAction
  | OffersDeleteSuccessAction
  | OffersDeleteFailAction
  | DismissErrorAction;
