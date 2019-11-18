import { without, difference, omit, dropLast, update } from 'ramda';
import { FastSearchDomain, initialState } from './model';
import * as Actions from './actions';
import { Filters, Lodging } from 'services/BackendApi';
import { TOGGLE_HIGHLIGHTS } from './actions';

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
    // TODO: Break out into subReducer
    // ------------------------------------------------------
    case Actions.INCREMENT_ROOM:
      return {
        ...state,
        query: {
          ...state.query,
          lodgings:
            action.step > 0
              ? [...state.query.lodgings, makeLodgingStub(state.query.lodgings[0])]
              : dropLast(1, state.query.lodgings),
        },
      };

    case Actions.SET_ACTIVE_LODGING_INDEX:
      return {
        ...state,
        activeLodgingIndex: action.index,
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

    default:
      return state;
  }
}
