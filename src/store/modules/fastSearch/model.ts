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
  showRegions: boolean;
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
  showRegions: false,
  optionsRequestPending: true,
  offersRequestPending: false,
  offersRequestError: null,
  optionsRequestError: null,
  query: {
    name: 'Maldives',
    lodgings: [
      {
        numberOfAdults: 2,
        agesOfAllChildren: [],
        repeatCustomer: false,
        honeymoon: true,
      },
    ],
    mealPlanCategories: [MealPlanNames.HALF_BOARD],
    regions: [],
    filters: [],
    starRatings: [StarRating.FiveStarPlus],
    startDate: '2020-01-01',
    endDate: '2020-01-07',
    priceRange: { min: 1, max: 100000 },
  },
};
