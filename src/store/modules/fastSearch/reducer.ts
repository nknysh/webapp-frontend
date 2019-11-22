import { without, difference, omit, dropLast, update, set } from 'ramda';
import { FastSearchDomain, initialState } from './model';
import * as Actions from './actions';
import { Filters, Lodging, BookingBuilderRequest } from 'services/BackendApi';
import { bookingRequestSelector } from './selectors';
import { getHotelId } from 'store/modules/hotel';
import lensPath from 'ramda/es/lensPath';

const defaultAge = 7;
const makeLodgingStub = (existingLodging?: Lodging): Lodging => {
  const lodgingStub: Lodging = {
    numberOfAdults: 0,
    agesOfAllChildren: [],
    repeatCustomer: false,
  };

  return existingLodging ? { ...existingLodging, ...lodgingStub } : { ...lodgingStub };
};

export default function fastSearchReducer(
  state: FastSearchDomain = initialState,
  action: Actions.FastSearchAction
): FastSearchDomain {
  switch (action.type) {
    // ------------------------------------------------------
    // Search Options
    // ------------------------------------------------------
    case Actions.OPTIONS_REQUEST:
      return {
        ...state,
        optionsRequestPending: true,
      };

    case Actions.OPTIONS_SUCCESS:
      console.log('OPTIONS_SUCCESS', action);
      return {
        ...state,
        options: action.successResponse,
        optionsRequestPending: false,
      };

    case Actions.OPTIONS_FAILURE:
      return {
        ...state,
        optionsRequestError: action.errorResponse,
        offersRequestPending: false,
      };

    // ------------------------------------------------------
    // Offers Search
    // ------------------------------------------------------
    case Actions.OFFERS_SEARCH_REQUEST:
      return {
        ...state,
        offersRequestPending: true,
      };

    case Actions.OFFERS_SEARCH_SUCCESS:
      return {
        ...state,
        results: action.successResponse.data.hotels,
        offersRequestPending: false,
      };

    case Actions.OFFERS_SEARCH_FAILURE:
      return {
        ...state,
        offersRequestError: action.errorResponse,
        offersRequestPending: false,
      };

    // ------------------------------------------------------
    // Destination
    // ------------------------------------------------------
    case Actions.DESTINATION_CHANGE:
      return {
        ...state,
        query: {
          ...state.query,
          name: action.value,
        },
      };

    case Actions.NAME_SEARCH_SUCCESS:
      return {
        ...state,
        nameSearchResults: action.successResponse,
      };

    case Actions.NAME_SEARCH_FAILURE:
      return {
        ...state,
        nameSearchRequestError: action.errorResponse,
      };

    case Actions.SET_NAME_SEARCH_RESUTS_VISIBILITY:
      return {
        ...state,
        showNameSearchResults: action.visible,
      };

    // ------------------------------------------------------
    // Start Ratings
    // ------------------------------------------------------
    case Actions.TOGGLE_STAR_RATING:
      return {
        ...state,
        query: {
          ...state.query,
          starRatings: state.query.starRatings.includes(action.starRating)
            ? without([action.starRating], state.query.starRatings)
            : [...state.query.starRatings, action.starRating],
        },
      };

    // ------------------------------------------------------
    // Occasions
    // ------------------------------------------------------
    case Actions.TOGGLE_OCCASION:
      const lodgingsWithOccasion = state.query.lodgings.map(lodging => {
        return lodging.hasOwnProperty(action.occasion)
          ? omit([action.occasion], lodging)
          : { ...lodging, [action.occasion]: true };
      });

      return {
        ...state,
        query: {
          ...state.query,
          lodgings: lodgingsWithOccasion,
        },
      };

    // ------------------------------------------------------
    // MealPlan
    // ------------------------------------------------------
    case Actions.SELECT_MEAN_PLAN:
      return {
        ...state,
        query: {
          ...state.query,
          mealPlanCategories: [action.mealPlan],
        },
      };

    // ------------------------------------------------------
    // Regions
    // ------------------------------------------------------
    case Actions.TOGGLE_SHOW_REGIONS:
      return {
        ...state,
        showRegions: !state.showRegions,
      };

    case Actions.TOGGLE_REGION:
      return {
        ...state,
        query: {
          ...state.query,
          regions: state.query.regions.includes(action.region)
            ? without([action.region], state.query.regions)
            : [...state.query.regions, action.region],
        },
      };

    // ------------------------------------------------------
    // Highlights
    // ------------------------------------------------------
    case Actions.TOGGLE_HIGHLIGHTS:
      return {
        ...state,
        expandedHighlights: state.expandedHighlights.includes(action.hotelUuid)
          ? without([action.hotelUuid], state.expandedHighlights)
          : [...state.expandedHighlights, action.hotelUuid],
      };

    // ------------------------------------------------------
    // Filters
    // ------------------------------------------------------
    case Actions.TOGGLE_FILTER:
      return {
        ...state,
        query: {
          ...state.query,
          filters: state.query.filters.includes(action.filter)
            ? without([action.filter], state.query.filters)
            : [...state.query.filters, action.filter],
        },
      };

    case Actions.SET_FILTERS:
      return {
        ...state,
        query: {
          ...state.query,
          filters:
            action.value === true
              ? [...state.query.filters, ...action.filters]
              : difference(state.query.filters, action.filters),
        },
      };

    case Actions.SET_ALL_FILTERS:
      return {
        ...state,
        query: {
          ...state.query,
          filters: action.value === true ? Object.keys(Filters).map(k => Filters[k]) : [],
          priceRange: !action.value ? { min: undefined, max: undefined } : state.query.priceRange,
        },
      };

    // ------------------------------------------------------
    // Price Range
    // ------------------------------------------------------
    case Actions.MIN_PRICE_CHANGE:
      return {
        ...state,
        query: {
          ...state.query,
          priceRange: { ...state.query.priceRange, min: action.value },
        },
      };

    case Actions.MAX_PRICE_CHANGE:
      return {
        ...state,
        query: {
          ...state.query,
          priceRange: { ...state.query.priceRange, max: action.value },
        },
      };

    // ------------------------------------------------------
    // Lodgings
    // TODO: Break out into subReducer?
    // ------------------------------------------------------
    case Actions.INCREMENT_ROOM:
      const newActiveLodgingIndex =
        state.activeLodgingIndex === state.query.lodgings.length - 1 && action.step < 1
          ? (state.activeLodgingIndex = state.activeLodgingIndex - 1)
          : state.activeLodgingIndex;

      console.log('-->', state.activeLodgingIndex, state.query.lodgings.length, newActiveLodgingIndex);
      return {
        ...state,
        activeLodgingIndex: newActiveLodgingIndex,
        query: {
          ...state.query,
          lodgings:
            action.step > 0
              ? [...state.query.lodgings, makeLodgingStub(state.query.lodgings[0])]
              : dropLast(1, state.query.lodgings),
        },
      };

    case Actions.TOGGLE_LODGING_CONTROLS:
      return {
        ...state,
        showLodgingControls: !state.showLodgingControls,
      };

    case Actions.SET_LODGING_CONTOLS_VISBILITY:
      return {
        ...state,
        showLodgingControls: action.visible,
      };

    case Actions.SET_ACTIVE_LODGING_INDEX:
      return {
        ...state,
        activeLodgingIndex: action.index,
      };

    case Actions.INCREMENT_ACTIVE_LODGING_INDEX:
      return {
        ...state,
        activeLodgingIndex: state.activeLodgingIndex += action.step,
      };

    case Actions.INCREMENT_ADULT:
      const current = state.query.lodgings[action.lodgingIndex];
      const newLodging: Lodging = {
        ...current,
        numberOfAdults: current.numberOfAdults + action.step,
      };
      return {
        ...state,
        query: {
          ...state.query,
          lodgings: update(action.lodgingIndex, newLodging, state.query.lodgings),
        },
      };

    case Actions.INCREMENT_CHILD:
      const currentWithAges: Lodging = state.query.lodgings[action.lodgingIndex];
      const currentAges: number[] = currentWithAges.agesOfAllChildren || [];
      const newAges = action.step > 0 ? [...currentAges, defaultAge] : dropLast(1, currentAges);
      const newLodgingWithAhes: Lodging = {
        ...currentWithAges,
        agesOfAllChildren: newAges,
      };
      return {
        ...state,
        query: {
          ...state.query,
          lodgings: update(action.lodgingIndex, newLodgingWithAhes, state.query.lodgings),
        },
      };

    case Actions.SET_AGE:
      const updatedAges: number[] = update(
        action.childIndex,
        parseInt(action.value, 10),
        state.query.lodgings[action.lodgingIndex].agesOfAllChildren || []
      );

      const updatedLodging: Lodging = {
        ...state.query.lodgings[action.lodgingIndex],
        agesOfAllChildren: updatedAges,
      };
      return {
        ...state,
        query: {
          ...state.query,
          lodgings: update(action.lodgingIndex, updatedLodging, state.query.lodgings),
        },
      };

    case Actions.UPDATE_TRANSFER:
      const updateTransferHotelRequestIndex = state.results!.findIndex(r => r.uuid === action.hotelUuid);
      const updatedBookingRequest = state.results![updateTransferHotelRequestIndex].bookingBuilder.request;

      // if no direction, remove all others and keep just this
      if (!action.transfer.direction) {
        updatedBookingRequest.Transfer = [action.transfer];
      }

      // if direction, remove all others without direction or with the same direction
      if (action.transfer.direction) {
        updatedBookingRequest.Transfer = updatedBookingRequest.Transfer.filter(
          t => t.direction && t.direction !== action.transfer.direction
        ).concat(action.transfer);
      }

      const path = lensPath(['results', updateTransferHotelRequestIndex, 'bookingBuilder', 'request']);

      const setValue = set(path, updatedBookingRequest, state);

      return setValue;

    case Actions.UPDATE_BOOKING_SUCCESS:
      const updateBookingSuccessHotelResponseIndex = state.results!.findIndex(r => r.uuid === action.hotelUuid);
      const responsePath = lensPath(['results', updateBookingSuccessHotelResponseIndex, 'bookingBuilder', 'response']);

      return set(responsePath, action.response, state);

    default:
      return state;
  }
}
