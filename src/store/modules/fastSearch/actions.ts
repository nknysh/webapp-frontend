import { Filters, SearchSuccessResponse, SearchErrorResponse } from 'services/BackendApi';

export const DESTINATION_CHANGE = 'fastSearch/DESTINATION_CHANGE';
export const TOGGLE_FILTER = 'fastSearch/TOGGLE_FILTER';
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

export const destinationChangeAction = (value: string) => ({
  type: DESTINATION_CHANGE as typeof DESTINATION_CHANGE,
  value,
});

export const toggleFilterAction = (filter: Filters) => ({
  type: TOGGLE_FILTER as typeof TOGGLE_FILTER,
  filter,
});

export const toggleRepeatGuestAction = () => ({
  type: TOGGLE_REPEAT_GUEST as typeof TOGGLE_REPEAT_GUEST,
});

export const dateRangeStartChangeAction = (date: string) => ({
  type: DATE_RANGE_START_CHANGE as typeof DATE_RANGE_START_CHANGE,
  date,
});

export const dateRangeEndChangeAction = (date: string) => ({
  type: DATE_RANGE_START_CHANGE as typeof DATE_RANGE_START_CHANGE,
  date,
});

export const minPriceChangeAction = (value: string) => ({
  type: MIN_PRICE_CHANGE as typeof MIN_PRICE_CHANGE,
  value,
});

export const maxPriceChangeAction = (value: string) => ({
  type: MAX_PRICE_CHANGE as typeof MAX_PRICE_CHANGE,
  value,
});

export const incrementRoomAction = (lodgingIndex: number) => ({
  type: INCREMENT_ROOM as typeof INCREMENT_ROOM,
  lodgingIndex,
});

export const decrementRoomAction = (lodgingIndex: number) => ({
  type: DECREMENT_ROOM as typeof DECREMENT_ROOM,
  lodgingIndex,
});

export const incrementAdultAction = (lodgingIndex: number) => ({
  type: INCREMENT_ADULT as typeof INCREMENT_ADULT,
  lodgingIndex,
});

export const decrementAdultAction = (lodgingIndex: number) => ({
  type: DECREMENT_ADULT as typeof DECREMENT_ADULT,
  lodgingIndex,
});

export const incrementChildAction = (lodgingIndex: number) => ({
  type: INCREMENT_CHILD as typeof INCREMENT_CHILD,
  lodgingIndex,
});

export const decrementChildAction = (lodgingIndex: number) => ({
  type: DECREMENT_CHILD as typeof DECREMENT_CHILD,
  lodgingIndex,
});

export const ageChangeAction = (lodgingIndex: number, childIndex: number, value: string) => ({
  type: AGE_CHANGE as typeof AGE_CHANGE,
  lodgingIndex,
  childIndex,
  value,
});

export const searchRequestAction = () => ({
  type: OFFERS_SEARCH_REQUEST as typeof OFFERS_SEARCH_REQUEST,
});

export const searchSuccessAction = (successResponse: SearchSuccessResponse) => ({
  type: OFFERS_SEARCH_SUCCESS as typeof OFFERS_SEARCH_SUCCESS,
  successResponse,
});

export const searchFailureAction = (errorResponse: SearchErrorResponse) => ({
  type: OFFERS_SEARCH_FAILURE as typeof OFFERS_SEARCH_FAILURE,
  errorResponse,
});

export type FastSearchAction =
  | ReturnType<typeof destinationChangeAction>
  | ReturnType<typeof toggleFilterAction>
  | ReturnType<typeof toggleRepeatGuestAction>
  | ReturnType<typeof dateRangeStartChangeAction>
  | ReturnType<typeof dateRangeEndChangeAction>
  | ReturnType<typeof minPriceChangeAction>
  | ReturnType<typeof maxPriceChangeAction>
  | ReturnType<typeof incrementRoomAction>
  | ReturnType<typeof decrementRoomAction>
  | ReturnType<typeof incrementAdultAction>
  | ReturnType<typeof decrementAdultAction>
  | ReturnType<typeof incrementChildAction>
  | ReturnType<typeof decrementChildAction>
  | ReturnType<typeof ageChangeAction>
  | ReturnType<typeof searchRequestAction>
  | ReturnType<typeof searchSuccessAction>
  | ReturnType<typeof searchFailureAction>;
