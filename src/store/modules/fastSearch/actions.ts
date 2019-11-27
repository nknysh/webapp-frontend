import { Filters, OffersSearchSuccessResponse, ErrorResponse } from 'services/BackendApi';
import {
  SearchQuery,
  SearchOptions,
  StarRating,
  Occasion,
  MealPlanNames,
  NameSearchResponseData,
} from 'services/BackendApi/types';

export const INITIALIZE_QUERY = 'fastSearch/INITIALIZE_QUERY';
export const POPULATE_QUERY = 'fastSearch/POPULATE_QUERY';
export const DESTINATION_CHANGE = 'fastSearch/DESTINATION_CHANGE';
export const TOGGLE_FILTER = 'fastSearch/TOGGLE_FILTER';
export const SET_FILTERS = 'fastSearch/SET_FILTER';
export const SET_ALL_FILTERS = 'fastSearch/SET_ALL_FILTERS';
export const TOGGLE_REPEAT_GUEST = 'fastSearch/TOGGLE_REPEAT_GUEST';
export const TOGGLE_STAR_RATING = 'fastSearch/TOGGLE_STAR_RATING';
export const TOGGLE_OCCASION = 'fastSearch/TOGGLE_OCCASION';
export const TOGGLE_REGION = 'fastSearch/TOGGLE_REGION';
export const TOGGLE_SHOW_REGIONS = 'fastSearch/TOGGLE_SHOW_REGIONS';
export const TOGGLE_HIGHLIGHTS = 'fastSearch/TOGGLE_HIGHLIGHTS';
export const TOGGLE_LODGING_CONTROLS = 'fastSearch/TOGGLE_LODGING_CONTROLS';
export const SET_LODGING_CONTOLS_VISBILITY = 'fastSearch/SET_LODGING_CONTOLS_VISBILITY';
export const SELECT_MEAN_PLAN = 'fastSearch/SELECT_MEAL_PLAN';
export const MIN_PRICE_CHANGE = 'fastSearch/MIN_PRICE_CHANGE';
export const MAX_PRICE_CHANGE = 'fastSearch/MAX_PRICE_CHANGE';
export const INCREMENT_ROOM = 'fastSearch/INCREMENT_ROOM';
export const SET_ACTIVE_LODGING_INDEX = 'fastSearch/SET_ACTIVE_LODGING_INDEX';
export const INCREMENT_ACTIVE_LODGING_INDEX = 'fastSearch/INCREMENT_ACTIVE_LODGING_INDEX';
export const INCREMENT_ADULT = 'fastSearch/INCREMENT_ADULT';
export const INCREMENT_CHILD = 'fastSearch/INCREMENT_CHILD';
export const SET_AGE = 'fastSearch/SET_AGE';
export const OFFERS_SEARCH_REQUEST = 'fastSearch/OFFERS_SEARCH_REQUEST';
export const OFFERS_SEARCH_SUCCESS = 'fastSearch/OFFERS_SEARCH_SUCCESS';
export const OFFERS_SEARCH_FAILURE = 'fastSearch/OFFERS_SEARCH_FAILURE';
export const OPTIONS_REQUEST = 'fastSearch/OPTIONS_REQUEST';
export const OPTIONS_SUCCESS = 'fastSearch/OPTIONS_SUCCESS';
export const OPTIONS_FAILURE = 'fastSearch/OPTIONS_FAILURE';
export const NAME_SEARCH_SUCCESS = 'fastSearch/NAME_SEARCH_SUCCESS';
export const NAME_SEARCH_FAILURE = 'fastSearch/NAME_SEARCH_FAILURE';
export const SET_NAME_SEARCH_RESUTS_VISIBILITY = 'fastSearch/SET_NAME_SEARCH_RESUTS_VISIBILITY';

export const DATE_RANGE_SELECT_START = 'fastSearch/DATE_SELECT_START';
export const DATE_RANGE_SELECT_END = 'fastSearch/DATE_RANGE_SELECT_END';
export const DATE_RANGE_CHANGE = 'fastSearch/DATE_RANGE_CHANGE';
export const INCREMENT_CURRENT_DATE = 'fastSearch/INCREMENT_CURRENT_DATE';
export const TOGGLE_DATE_PICKER = 'fastSearch/TOGGLE_DATE_PICKER';
export const SET_DATE_PICKER_VISIBILITY = 'fastSearch/SET_DATE_PICKER_VISIBILITY';

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

export type InitializeQueryAction = ReturnType<typeof initializeQueryAction>;
export const initializeQueryAction = (queryString: string) => ({
  type: INITIALIZE_QUERY as typeof INITIALIZE_QUERY,
  queryString,
});

export type PopulateQueryAction = ReturnType<typeof populateQueryAction>;
export const populateQueryAction = (query: SearchQuery) => ({
  type: POPULATE_QUERY as typeof POPULATE_QUERY,
  query,
});

export type ToggleFilterAction = ReturnType<typeof toggleFilterAction>;
export const toggleFilterAction = (filter: Filters) => ({
  type: TOGGLE_FILTER as typeof TOGGLE_FILTER,
  filter,
});

export type SetFiltersAction = ReturnType<typeof setFiltersAction>;
export const setFiltersAction = (filters: Filters[], value: boolean) => ({
  type: SET_FILTERS as typeof SET_FILTERS,
  filters,
  value,
});

export type SetAllFiltersAction = ReturnType<typeof setAllFiltersAction>;
export const setAllFiltersAction = (value: boolean) => ({
  type: SET_ALL_FILTERS as typeof SET_ALL_FILTERS,
  value,
});

export type ToggleRepeatGuestAction = ReturnType<typeof toggleRepeatGuestAction>;
export const toggleRepeatGuestAction = () => ({
  type: TOGGLE_REPEAT_GUEST as typeof TOGGLE_REPEAT_GUEST,
});

export type ToggleStarRatingAction = ReturnType<typeof toggleStarRatingAction>;
export const toggleStarRatingAction = (starRating: StarRating) => ({
  type: TOGGLE_STAR_RATING as typeof TOGGLE_STAR_RATING,
  starRating,
});

export type ToggleOccasionAction = ReturnType<typeof toggleOccasionAction>;
export const toggleOccasionAction = (occasion: Occasion) => ({
  type: TOGGLE_OCCASION as typeof TOGGLE_OCCASION,
  occasion,
});

export type ToggleShowRegionsAction = ReturnType<typeof toggleShowRegionsAction>;
export const toggleShowRegionsAction = () => ({
  type: TOGGLE_SHOW_REGIONS as typeof TOGGLE_SHOW_REGIONS,
});

export type ToggleRegionAction = ReturnType<typeof toggleRegionAction>;
export const toggleRegionAction = (region: string) => ({
  type: TOGGLE_REGION as typeof TOGGLE_REGION,
  region,
});

export type ToggleHighlightsAction = ReturnType<typeof toggleHighlightsAction>;
export const toggleHighlightsAction = (hotelUuid: string) => ({
  type: TOGGLE_HIGHLIGHTS as typeof TOGGLE_HIGHLIGHTS,
  hotelUuid,
});

export type ToggleLodgingControlsAction = ReturnType<typeof toggleLodgingControlsAction>;
export const toggleLodgingControlsAction = () => ({
  type: TOGGLE_LODGING_CONTROLS as typeof TOGGLE_LODGING_CONTROLS,
});

export type SetLodgingControlsVisibilityAction = ReturnType<typeof setLodgingControlsVisibilityAction>;
export const setLodgingControlsVisibilityAction = (visible: boolean) => ({
  type: SET_LODGING_CONTOLS_VISBILITY as typeof SET_LODGING_CONTOLS_VISBILITY,
  visible,
});

export type ToggleDatePickerAction = ReturnType<typeof toggleDatePickerAction>;
export const toggleDatePickerAction = () => ({
  type: TOGGLE_DATE_PICKER as typeof TOGGLE_DATE_PICKER,
});

export type SetDatePickerVisibilityAction = ReturnType<typeof setDatePickerVisibilityAction>;
export const setDatePickerVisibilityAction = (visible: boolean) => ({
  type: SET_DATE_PICKER_VISIBILITY as typeof SET_DATE_PICKER_VISIBILITY,
  visible,
});

export type SelectMealPlanAction = ReturnType<typeof selectMealPlanAction>;
export const selectMealPlanAction = (mealPlan: MealPlanNames) => ({
  type: SELECT_MEAN_PLAN as typeof SELECT_MEAN_PLAN,
  mealPlan,
});

export type MinPriceChangeAction = ReturnType<typeof minPriceChangeAction>;
export const minPriceChangeAction = (value: number | undefined) => ({
  type: MIN_PRICE_CHANGE as typeof MIN_PRICE_CHANGE,
  value,
});

export type MaxPriceChangeAction = ReturnType<typeof maxPriceChangeAction>;
export const maxPriceChangeAction = (value: number | undefined) => ({
  type: MAX_PRICE_CHANGE as typeof MAX_PRICE_CHANGE,
  value,
});

export type IncrementRoomAction = ReturnType<typeof incrementRoomAction>;
export const incrementRoomAction = (step: number) => ({
  type: INCREMENT_ROOM as typeof INCREMENT_ROOM,
  step,
});

export type SetActiveLodgingIndexAction = ReturnType<typeof setActiveLodgingIndexAction>;
export const setActiveLodgingIndexAction = (index: number) => ({
  type: SET_ACTIVE_LODGING_INDEX as typeof SET_ACTIVE_LODGING_INDEX,
  index,
});

export type IncrementActiveLodgingIndexAction = ReturnType<typeof incrementActiveLodgingIndexAction>;
export const incrementActiveLodgingIndexAction = (step: number) => ({
  type: INCREMENT_ACTIVE_LODGING_INDEX as typeof INCREMENT_ACTIVE_LODGING_INDEX,
  step,
});

export type IncrementAdultAction = ReturnType<typeof incrementAdultAction>;
export const incrementAdultAction = (lodgingIndex: number, step: number) => ({
  type: INCREMENT_ADULT as typeof INCREMENT_ADULT,
  lodgingIndex,
  step,
});

export type IncrementChildAction = ReturnType<typeof incrementChildAction>;
export const incrementChildAction = (lodgingIndex: number, step: number) => ({
  type: INCREMENT_CHILD as typeof INCREMENT_CHILD,
  lodgingIndex,
  step,
});

export type SetAgeAction = ReturnType<typeof setAgeAction>;
export const setAgeAction = (lodgingIndex: number, childIndex: number, value: string) => ({
  type: SET_AGE as typeof SET_AGE,
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

export type NamesSearchSuccessAction = ReturnType<typeof namesSearchSuccessAction>;
export const namesSearchSuccessAction = (successResponse: NameSearchResponseData) => ({
  type: NAME_SEARCH_SUCCESS as typeof NAME_SEARCH_SUCCESS,
  successResponse,
});

export type NamesSearchFailureAction = ReturnType<typeof namesSearchFailureAction>;
export const namesSearchFailureAction = (errorResponse: ErrorResponse) => ({
  type: NAME_SEARCH_FAILURE as typeof NAME_SEARCH_FAILURE,
  errorResponse,
});

export type DateRangeSelectStartAction = ReturnType<typeof dateRangeSelectStartAction>;
export const dateRangeSelectStartAction = (date: string) => ({
  type: DATE_RANGE_SELECT_START as typeof DATE_RANGE_SELECT_START,
  date,
});

export type DateRangeSelectEndAction = ReturnType<typeof dateRangeSelectEndAction>;
export const dateRangeSelectEndAction = (date: string, currentStartDate: string) => ({
  type: DATE_RANGE_SELECT_END as typeof DATE_RANGE_SELECT_END,
  date,
  currentStartDate,
});

export type DateRangeChangeAction = ReturnType<typeof dateRangeChangeAction>;
export const dateRangeChangeAction = (date: string, currentStartDate: string) => ({
  type: DATE_RANGE_CHANGE as typeof DATE_RANGE_CHANGE,
  date,
  currentStartDate,
});

export type IncrementCurrentDateAction = ReturnType<typeof incrementCurrentDateAction>;
export const incrementCurrentDateAction = (step: number) => ({
  type: INCREMENT_CURRENT_DATE as typeof INCREMENT_CURRENT_DATE,
  step,
});

export type SetNamesSearchResultsVisibilityAction = ReturnType<typeof setNamesSearchResultsVisibilityAction>;
export const setNamesSearchResultsVisibilityAction = (visible: boolean) => ({
  type: SET_NAME_SEARCH_RESUTS_VISIBILITY as typeof SET_NAME_SEARCH_RESUTS_VISIBILITY,
  visible,
});

// 3. Create a union type which we can pass as the reducers action type.
// goto DestinationChangeAction to see start of these comments.
export type FastSearchAction =
  | InitializeQueryAction
  | DestinationChangeAction
  | ToggleFilterAction
  | ToggleRepeatGuestAction
  | ToggleStarRatingAction
  | ToggleOccasionAction
  | ToggleShowRegionsAction
  | ToggleRegionAction
  | ToggleHighlightsAction
  | ToggleLodgingControlsAction
  | SetLodgingControlsVisibilityAction
  | SelectMealPlanAction
  | SetFiltersAction
  | SetAllFiltersAction
  | MinPriceChangeAction
  | MaxPriceChangeAction
  | IncrementRoomAction
  | IncrementAdultAction
  | IncrementChildAction
  | SetAgeAction
  | SearchRequestAction
  | OffersSearchSuccessAction
  | OffersSearchFailureAction
  | OptionsRequestAction
  | OptionsSuccessAction
  | OptionsFailureAction
  | SetActiveLodgingIndexAction
  | IncrementActiveLodgingIndexAction
  | NamesSearchSuccessAction
  | NamesSearchFailureAction
  | SetNamesSearchResultsVisibilityAction
  | DateRangeSelectStartAction
  | DateRangeSelectEndAction
  | DateRangeChangeAction
  | IncrementCurrentDateAction
  | ToggleDatePickerAction
  | SetDatePickerVisibilityAction
  | PopulateQueryAction;
