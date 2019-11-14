import { Filters, OffersSearchSuccessResponse, ErrorResponse } from 'services/BackendApi';
import { SearchQuery, SearchOptions } from 'services/BackendApi/types';

export const DESTINATION_CHANGE = 'fastSearch/DESTINATION_CHANGE';
export const TOGGLE_FILTER = 'fastSearch/TOGGLE_FILTER';
export const SET_FILTER = 'fastSearch/SET_FILTER';
export const TOGGLE_REPEAT_GUEST = 'fastSearch/TOGGLE_REPEAT_GUEST';
export const DATE_RANGE_START_CHANGE = 'fastSearch/DATE_RANGE_START_CHANGE';
export const DATE_RANGE_END_CHANGE = 'fastSearch/DATE_RANGE_END_CHANGE';
export const MIN_PRICE_CHANGE = 'fastSearch/MIN_PRICE_CHANGE';
export const MAX_PRICE_CHANGE = 'fastSearch/MAX_PRICE_CHANGE';
export const INCREMENT_ROOM = 'fastSearch/INCREMENT_ROOM';
export const DECREMENT_ROOM = 'fastSearch/DECREMENT_ROOM';
export const INCREMENT_ADULT = 'fastSearch/INCREMENT_ADULT';
export const DECREMENT_ADULT = 'fastSearch/DECREMENT_ADULT';
export const INCREMENT_CHILD = 'fastSearch/INCREMENT_CHILD';
export const DECREMENT_CHILD = 'fastSearch/DECREMENT_CHILD';
export const AGE_CHANGE = 'fastSearch/AGE_CHANGE';
export const OFFERS_SEARCH_REQUEST = 'fastSearch/OFFERS_SEARCH_REQUEST';
export const OFFERS_SEARCH_SUCCESS = 'fastSearch/OFFERS_SEARCH_SUCCESS';
export const OFFERS_SEARCH_FAILURE = 'fastSearch/OFFERS_SEARCH_FAILURE';
export const OPTIONS_REQUEST = 'fastSearch/OPTIONS_REQUEST';
export const OPTIONS_SUCCESS = 'fastSearch/OPTIONS_SUCCESS';
export const OPTIONS_FAILURE = 'fastSearch/OPTIONS_FAILURE';

// ---------------------------------------------------------------------------------------
// How to type Redux Actions with as little boilerplate as possible.
// ---------------------------------------------------------------------------------------
//
// The objective here is to have the types driven by the implementation, so you can
// edit and change actions easily, and get all the benefits of Typescript automatically
// without having to manually create and maintain types for everything. ProTip: Make
// sure your actions are always simple object literals. That means, no "thunks". This
// method is a lot more boilerplatey than before, but it's a lot easier to figure out
// what's happening and to make changes.
//
// 1. Infer the ReturnType of the action. We'll use this to create a Union type later.
export type DestinationChangeAction = ReturnType<typeof destinationChangeAction>;
export const destinationChangeAction = (value: string) => ({
  // 2. Infer the string literal type of the action. This helps typescript narrow down the
  //    Action type in the any reducers Switch statemet.
  //    See `FastSearchAction` at the bottom of this file for step 3.
  type: DESTINATION_CHANGE as typeof DESTINATION_CHANGE,
  value,
});
// ---------------------------------------------------------------------------------------

export type ToggleFilterAction = ReturnType<typeof toggleFilterAction>;
export const toggleFilterAction = (filter: Filters) => ({
  type: TOGGLE_FILTER as typeof TOGGLE_FILTER,
  filter,
});

export type SetFilterAction = ReturnType<typeof setFilterAction>;
export const setFilterAction = (filter: Filters, value: boolean) => ({
  type: TOGGLE_FILTER as typeof TOGGLE_FILTER,
  filter,
  value,
});

export type ToggleRepeatGuestAction = ReturnType<typeof toggleRepeatGuestAction>;
export const toggleRepeatGuestAction = () => ({
  type: TOGGLE_REPEAT_GUEST as typeof TOGGLE_REPEAT_GUEST,
});

export type DateRangeStartChangeAction = ReturnType<typeof dateRangeStartChangeAction>;
export const dateRangeStartChangeAction = (date: string) => ({
  type: DATE_RANGE_START_CHANGE as typeof DATE_RANGE_START_CHANGE,
  date,
});

export type DateRangeEndChangeAction = ReturnType<typeof dateRangeEndChangeAction>;
export const dateRangeEndChangeAction = (date: string) => ({
  type: DATE_RANGE_START_CHANGE as typeof DATE_RANGE_START_CHANGE,
  date,
});

export type MinPriceChangeAction = ReturnType<typeof minPriceChangeAction>;
export const minPriceChangeAction = (value: string) => ({
  type: MIN_PRICE_CHANGE as typeof MIN_PRICE_CHANGE,
  value,
});

export type MaxPriceChangeAction = ReturnType<typeof maxPriceChangeAction>;
export const maxPriceChangeAction = (value: string) => ({
  type: MAX_PRICE_CHANGE as typeof MAX_PRICE_CHANGE,
  value,
});

export type IncrementRoomAction = ReturnType<typeof incrementRoomAction>;
export const incrementRoomAction = (lodgingIndex: number) => ({
  type: INCREMENT_ROOM as typeof INCREMENT_ROOM,
  lodgingIndex,
});

export type DecrementRoomAction = ReturnType<typeof decrementRoomAction>;
export const decrementRoomAction = (lodgingIndex: number) => ({
  type: DECREMENT_ROOM as typeof DECREMENT_ROOM,
  lodgingIndex,
});

export type IncrementAdultAction = ReturnType<typeof incrementAdultAction>;
export const incrementAdultAction = (lodgingIndex: number) => ({
  type: INCREMENT_ADULT as typeof INCREMENT_ADULT,
  lodgingIndex,
});

export type DecrementAdultAction = ReturnType<typeof decrementAdultAction>;
export const decrementAdultAction = (lodgingIndex: number) => ({
  type: DECREMENT_ADULT as typeof DECREMENT_ADULT,
  lodgingIndex,
});

export type IncrementChildAction = ReturnType<typeof incrementChildAction>;
export const incrementChildAction = (lodgingIndex: number) => ({
  type: INCREMENT_CHILD as typeof INCREMENT_CHILD,
  lodgingIndex,
});

export type DecrementChildAction = ReturnType<typeof decrementChildAction>;
export const decrementChildAction = (lodgingIndex: number) => ({
  type: DECREMENT_CHILD as typeof DECREMENT_CHILD,
  lodgingIndex,
});

export type AgeChangeAction = ReturnType<typeof ageChangeAction>;
export const ageChangeAction = (lodgingIndex: number, childIndex: number, value: string) => ({
  type: AGE_CHANGE as typeof AGE_CHANGE,
  lodgingIndex,
  childIndex,
  value,
});

export type SearchRequestAction = ReturnType<typeof offersSearchRequestAction>;
export const offersSearchRequestAction = (query: SearchQuery) => ({
  type: OFFERS_SEARCH_REQUEST as typeof OFFERS_SEARCH_REQUEST,
  query,
});

export type OffersSearchSuccessAction = ReturnType<typeof offersSearchSuccessAction>;
export const offersSearchSuccessAction = (successResponse: OffersSearchSuccessResponse) => ({
  type: OFFERS_SEARCH_SUCCESS as typeof OFFERS_SEARCH_SUCCESS,
  successResponse,
});

export type OffersSearchFailureAction = ReturnType<typeof offersSearchFailureAction>;
export const offersSearchFailureAction = (errorResponse: ErrorResponse) => ({
  type: OFFERS_SEARCH_FAILURE as typeof OFFERS_SEARCH_FAILURE,
  errorResponse,
});

export type OptionsRequestAction = ReturnType<typeof optionsRequestAction>;
export const optionsRequestAction = () => ({
  type: OPTIONS_REQUEST as typeof OPTIONS_REQUEST,
});

export type OptionsSuccessAction = ReturnType<typeof optionsSuccessAction>;
export const optionsSuccessAction = (successResponse: SearchOptions) => ({
  type: OPTIONS_SUCCESS as typeof OPTIONS_SUCCESS,
  successResponse,
});

export type OptionsFailureAction = ReturnType<typeof optionsFailureAction>;
export const optionsFailureAction = (errorResponse: ErrorResponse) => ({
  type: OPTIONS_FAILURE as typeof OPTIONS_FAILURE,
  errorResponse,
});

// 3. Create a union type which we can pass as the reducers action type.
// goto DestinationChangeAction to see start of these comments.
export type FastSearchAction =
  | DestinationChangeAction
  | ToggleFilterAction
  | ToggleRepeatGuestAction
  | SetFilterAction
  | DateRangeStartChangeAction
  | DateRangeEndChangeAction
  | MinPriceChangeAction
  | MaxPriceChangeAction
  | IncrementRoomAction
  | DecrementRoomAction
  | IncrementAdultAction
  | DecrementAdultAction
  | IncrementChildAction
  | DecrementChildAction
  | AgeChangeAction
  | SearchRequestAction
  | OffersSearchSuccessAction
  | OffersSearchFailureAction
  | OptionsRequestAction
  | OptionsSuccessAction
  | OptionsFailureAction;
