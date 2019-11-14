import * as Actions from './actions';
import {
  SearchQuery,
  HotelResult,
  ErrorResponse,
  MealPlanNames,
  Filters,
  StarRating,
  SearchOptions,
} from 'services/BackendApi';

export interface FastSearchDomain {
  options: SearchOptions | null; // We should look at using fp-ts to make use of `Option` types
  showDatePicker: boolean;

  offersRequestPending: boolean;
  offersRequestError: ErrorResponse | null;
  results: HotelResult[] | null;

  optionsRequestPending: boolean;
  optionsRequestError: ErrorResponse | null;

  query: SearchQuery;
}

export const initialState: FastSearchDomain = {
  results: null,
  options: null,
  showDatePicker: false,
  optionsRequestPending: true,
  offersRequestPending: false,
  offersRequestError: null,
  optionsRequestError: null,
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
};
