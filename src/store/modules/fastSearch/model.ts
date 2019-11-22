import * as Actions from './actions';
import {
  SearchQuery,
  HotelResult,
  ErrorResponse,
  MealPlanNames,
  StarRating,
  SearchOptions,
  NameSearchResponseData,
} from 'services/BackendApi';

export interface FastSearchDomain {
  options: SearchOptions | null; // We should look at using fp-ts to make use of `Option` types
  showRegions: boolean;
  showDatePicker: boolean;
  showLodgingControls: boolean;
  showNameSearchResults: boolean;
  activeLodgingIndex: number;
  expandedHighlights: string[];

  offersRequestPending: boolean;
  offersRequestError: ErrorResponse | null;
  nameSearchRequestError: ErrorResponse | null;

  results: HotelResult[] | null;
  nameSearchResults: NameSearchResponseData | undefined;

  optionsRequestPending: boolean;
  optionsRequestError: ErrorResponse | null;

  query: SearchQuery;
  activeHotelId: string | undefined;
}

export const initialState: FastSearchDomain = {
  activeHotelId: undefined,
  results: null,
  nameSearchResults: undefined,
  options: null,
  showDatePicker: false,
  showRegions: false,
  showLodgingControls: false,
  showNameSearchResults: false,
  optionsRequestPending: true,
  offersRequestPending: false,
  offersRequestError: null,
  optionsRequestError: null,
  nameSearchRequestError: null,
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
