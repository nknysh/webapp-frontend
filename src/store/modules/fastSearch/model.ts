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
import { ALL_COUNTRIES_AND_RESORTS } from './constants';
import { getDefaultSearchAndBookingStartDate, getDefaultSearchAndBookingEndDate } from '../../utils';

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
  queryHasChanged: boolean;
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

  queryHasChanged: false,
  query: {
    name: ALL_COUNTRIES_AND_RESORTS,
    lodgings: [
      {
        numberOfAdults: 2,
        agesOfAllChildren: [],
        repeatCustomer: false,
      },
    ],
    // Why typescast? It's because ts-jest can't process enums correctly,
    // and we use this initialState in the tests.
    // https://github.com/kulshekhar/ts-jest/pull/308/files
    mealPlanCategories: ['Any' as MealPlanNames],
    regions: [],
    filters: [],
    starRatings: ['5' as StarRating, '5+' as StarRating],
    startDate: getDefaultSearchAndBookingStartDate(),
    endDate: getDefaultSearchAndBookingEndDate(),
    priceRange: { min: 1, max: 100000 },
  },
};
