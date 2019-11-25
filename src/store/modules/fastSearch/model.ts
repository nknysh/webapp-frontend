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
  datePickerCurrentDate: string;
  dateSelectionInProgress: boolean;
  anchorDate?: string;

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

  datePickerCurrentDate: new Date().toISOString(),
  dateSelectionInProgress: false,

  query: {
    name: '',
    lodgings: [
      {
        numberOfAdults: 2,
        agesOfAllChildren: [],
        repeatCustomer: false,
      },
    ],
    mealPlanCategories: [MealPlanNames.ANY],
    regions: [],
    filters: [],
    starRatings: [StarRating.FiveStar, StarRating.FiveStarPlus],
    startDate: '2019-12-13',
    endDate: '2019-12-20',
    priceRange: { min: 1, max: 100000 },
  },
};
