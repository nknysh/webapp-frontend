import * as Actions from './actions';
import {
  SearchQuery,
  HotelResult,
  SearchErrorResponse,
  MealPlanNames,
  Filters,
  StarRating,
  OptionsResponse,
} from 'services/BackendApi';

export interface FastSearchDomain {
  query: SearchQuery;
  results?: HotelResult[];
  error?: SearchErrorResponse;
  options?: OptionsResponse;
  showDatePicker: boolean;
  requestPending: boolean;
}

export const initialState: FastSearchDomain = {
  query: {
    name: 'Amilla Fushi',
    lodgings: [
      {
        numberOfAdults: 1,
        agesOfAllChildren: [],
        repeatCustomer: false,
        honeymoon: true,
      },
    ],
    mealPlanCategories: [MealPlanNames.BREAKFAST_BOARD],
    regions: [],
    filters: [Filters.SEAPLANE_TRANSFER],
    starRatings: [StarRating.FiveStarPlus],
    startDate: '2020-01-01',
    endDate: '2020-01-07',
    priceRange: { min: 1, max: 100000 },
  },
  showDatePicker: false,
  requestPending: false,
};

export default function fastSearchReducer(
  state: FastSearchDomain = initialState,
  action: Actions.FastSearchAction
): FastSearchDomain {
  switch (action.type) {
    case Actions.OFFERS_SEARCH_REQUEST:
      return {
        ...state,
        requestPending: true,
      };

    case Actions.OFFERS_SEARCH_SUCCESS:
      return {
        ...state,
        results: action.successResponse.data.hotels,
        requestPending: false,
      };

    case Actions.OFFERS_SEARCH_FAILURE:
      return {
        ...state,
        error: action.errorResponse,
        requestPending: false,
      };

    default:
      return state;
  }
}
