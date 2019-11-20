import * as Actions from './actions';
import { SearchQuery, HotelResult, ErrorResponse, MealPlanNames, StarRating, SearchOptions } from 'services/BackendApi';

export interface FastSearchDomain {
  options: SearchOptions | null; // We should look at using fp-ts to make use of `Option` types
  showRegions: boolean;
  showDatePicker: boolean;
  showLodgingControls: boolean;
  activeLodgingIndex: number;
  expandedHighlights: string[];

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
  showLodgingControls: false,
  optionsRequestPending: true,
  offersRequestPending: false,
  offersRequestError: null,
  optionsRequestError: null,
  activeLodgingIndex: 0,
  expandedHighlights: [],
  query: {
    name: '',
    lodgings: [
      {
        numberOfAdults: 2,
        agesOfAllChildren: [1, 2, 4],
        repeatCustomer: false,
      },
      {
        numberOfAdults: 2,
        agesOfAllChildren: [5],
        repeatCustomer: false,
      },
    ],
    mealPlanCategories: [MealPlanNames.HALF_BOARD],
    regions: [],
    filters: [],
    starRatings: [StarRating.FiveStar, StarRating.FiveStarPlus],
    startDate: '2020-01-01',
    endDate: '2020-01-07',
    priceRange: { min: 1, max: 100000 },
  },
};
