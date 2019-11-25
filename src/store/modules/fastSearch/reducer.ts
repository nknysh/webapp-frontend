import { without, difference, omit, dropLast, update, set, lensPath, flatten, mergeDeepLeft } from 'ramda';
import { FastSearchDomain, initialState } from './model';
import * as Actions from './actions';
import { Filters, Lodging, BookingBuilderRequest } from 'services/BackendApi';
import lensPath from 'ramda/es/lensPath';
import { addMonths } from 'date-fns';
import qs from 'qs';
import { SearchQuery } from '../../../services/BackendApi/types/SearchQuery';
import { TOGGLE_REPEAT_GUEST } from './actions';
import mergeDeepRight from 'ramda/es/mergeDeepRight';
// import { bookingRequestSelector } from './selectors';
import { getHotelId } from 'store/modules/hotel';
import produce from 'immer';
import { formatDate } from 'utils';

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
    case Actions.INITIALIZE_QUERY:
      return {
        ...state,
        offersRequestPending: true,
        // The only time we should merge two object.
        // The query string isn't guaranteed to have all the required properties
        // but our initial state is. So merging is a form of autocorrect.
        query: mergeDeepLeft<SearchQuery, SearchQuery>(state.query, qs.parse(action.queryString)),
      };

    case Actions.POPULATE_QUERY: {
      console.log('action.query', action.query);
      console.log('original', state.query);
      console.log('merged', mergeDeepLeft<SearchQuery, SearchQuery>(state.query, action.query));
      return {
        ...state,
        query: {
          ...state.query,
          name: action.query.name ? action.query.name : state.query.name,
        },
      };
    }

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
    // Repeat Guest
    // ------------------------------------------------------
    case Actions.TOGGLE_REPEAT_GUEST:
      return {
        ...state,
        query: {
          ...state.query,
          lodgings: state.query.lodgings.map(l => ({ ...l, repeatCustomer: !l.repeatCustomer })),
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
      const updatedBookingRequest = { ...state.results![updateTransferHotelRequestIndex].bookingBuilder.request };

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

      return set(path, updatedBookingRequest, state);

    case Actions.UPDATE_BOOKING_SUCCESS:
      const updateBookingSuccessHotelResponseIndex = state.results!.findIndex(r => r.uuid === action.hotelUuid);
      const responsePath = lensPath(['results', updateBookingSuccessHotelResponseIndex, 'bookingBuilder', 'response']);

      return set(responsePath, action.response, state);

    case Actions.DATE_RANGE_SELECT_START:
      return {
        ...state,
        dateSelectionInProgress: true,
        anchorDate: action.date,
        query: {
          ...state.query,
          startDate: action.date,
          endDate: action.date,
        },
      };

    case Actions.DATE_RANGE_CHANGE:
    case Actions.DATE_RANGE_SELECT_END:
      const isFutureDate = !state.anchorDate || action.date <= state.anchorDate! ? false : true;

      return {
        ...state,
        dateSelectionInProgress: action.type === Actions.DATE_RANGE_CHANGE ? true : false,
        showDatePicker: action.type === Actions.DATE_RANGE_CHANGE ? true : false,
        query: {
          ...state.query,
          startDate: isFutureDate ? state.anchorDate! : action.date,
          endDate: isFutureDate ? action.date : state.anchorDate!,
        },
      };

    case Actions.INCREMENT_CURRENT_DATE:
      const currentDateObj = new Date(state.datePickerCurrentDate);
      return {
        ...state,
        datePickerCurrentDate:
          action.step > 0 ? addMonths(currentDateObj, 1).toISOString() : addMonths(currentDateObj, -1).toISOString(),
      };

    case Actions.TOGGLE_DATE_PICKER:
      return {
        ...state,
        showDatePicker: !state.showDatePicker,
      };

    case Actions.SET_DATE_PICKER_VISIBILITY:
      return {
        ...state,
        showDatePicker: action.visible,
      };

    case Actions.UPDATE_LODGING_GUEST_AGES_ACTION:
      return updateLodgingGuestAgesReducer(state, action);
    case Actions.UPDATE_LODGING_MEAL_PLAN_ACTION:
      return updateLodgingMealPlanReducer(state, action);
    case Actions.ADD_LODGING_ACTION:
      return addLodgingReducer(state, action);
    case Actions.UPDATE_LODGING_DATES_ACTION:
      return updateLodgingDatesReducer(state, action);

    case Actions.UPDATE_LODGING_OCCASIONS_ACTION:
      return updateLodgingOccasionsReducer(state, action);

    case Actions.REMOVE_LODGING_ACTION:
      return removeLodgingReducer(state, action);

    case Actions.UPDATE_GROUND_SERVICE_ACTION:
      return updateGroundServiceReducer(state, action);
    case Actions.UPDATE_SUPPLEMENT_ACTION:
      return updateSupplementReducer(state, action);
    case Actions.UPDATE_FINE_ACTION:
      return updateFineReducer(state, action);
    default:
      return state;
  }
}

export const updateLodgingGuestAgesReducer = (state: FastSearchDomain, action): FastSearchDomain => {
  const hotelIndex = state.results!.findIndex(r => r.uuid === action.hotelUuid);

  return produce(state, draftState => {
    if (!draftState || !draftState.results || !draftState.results[hotelIndex]) {
      return state;
    }

    const result = draftState.results[hotelIndex];

    // update the request accommodation to be correct
    result.bookingBuilder.request.Accommodation[action.lodgingIndex].guestAges = action.guestAges;

    // rebuild the request level `guestAges` to match all the new figures
    let numberOfAdults: number = 0;
    let agesOfAllChildren: number[] = [];
    result.bookingBuilder.request.Accommodation.forEach(accom => {
      numberOfAdults += accom.guestAges.numberOfAdults;
      agesOfAllChildren = flatten(agesOfAllChildren.concat(accom.guestAges.agesOfAllChildren));
    });

    result.bookingBuilder.request.guestAges = {
      numberOfAdults,
      agesOfAllChildren,
    };

    return draftState;
  });
};

export const updateLodgingMealPlanReducer = (state: FastSearchDomain, action) => {
  const hotelIndex = state.results!.findIndex(r => r.uuid === action.hotelUuid);

  return produce(state, draftState => {
    if (!draftState || !draftState.results || !draftState.results[hotelIndex]) {
      return state;
    }

    const result = draftState.results[hotelIndex];

    // update the meal plans on the correct lodging
    result.bookingBuilder.request.Accommodation[action.lodgingIndex].subProducts[
      'Meal Plan'
    ] = action.mealPlanUuids.map(mealPlanUuid => {
      return {
        uuid: mealPlanUuid,
      };
    });

    return draftState;
  });
};

export const addLodgingReducer = (state: FastSearchDomain, action) => {
  const { hotelUuid, accommodationProductUuid, hotelAccommodationProducts } = action;

  const hotelIndex = state.results!.findIndex(r => r.uuid === hotelUuid);
  const selectedAccommodationProduct = hotelAccommodationProducts.find(r => r.uuid === accommodationProductUuid);

  return produce(state, draftState => {
    if (!draftState || !draftState.results || !draftState.results[hotelIndex]) {
      return state;
    }
    const result = draftState.results[hotelIndex];
    const existingLodgingOfAccommodationProduct = result.bookingBuilder.request.Accommodation.find(
      a => a.uuid === accommodationProductUuid
    );

    let newLodging;
    if (existingLodgingOfAccommodationProduct) {
      // we already have a lodging of this accommodation product, which means the new lodging
      // should be added with the exact same data + standard occupancy
      newLodging = {
        ...existingLodgingOfAccommodationProduct,
        guestAges: {
          numberOfAdults: selectedAccommodationProduct.occupancy.standardOccupancy,
          agesOfAllChildren: [],
        },
      };
    } else {
      // this is the first lodging of this accommodation product, so add it with standard occupancy,
      // the search query dates, and the accommodation product default meal plan
      newLodging = {
        uuid: accommodationProductUuid,
        startDate: draftState.query.startDate,
        endDate: draftState.query.endDate,
        guestAges: {
          numberOfAdults: selectedAccommodationProduct.occupancy.standardOccupancy,
          agesOfAllChildren: [],
        },
        subProducts: {
          'Meal Plan': [
            {
              uuid: selectedAccommodationProduct.defaultMealPlanUuid,
            },
          ],
        },
      };
    }

    // now that newLodging is built, add it into the request Accommodation array
    result.bookingBuilder.request.Accommodation.push(newLodging);

    // rebuild the request level `guestAges` to match all the new figures
    let numberOfAdults: number = 0;
    let agesOfAllChildren: number[] = [];
    result.bookingBuilder.request.Accommodation.forEach(accom => {
      numberOfAdults += accom.guestAges.numberOfAdults;
      agesOfAllChildren = flatten(agesOfAllChildren.concat(accom.guestAges.agesOfAllChildren));
    });

    result.bookingBuilder.request.guestAges = {
      numberOfAdults,
      agesOfAllChildren,
    };

    return draftState;
  });
};

export const updateLodgingOccasionsReducer = (state: FastSearchDomain, action) => {
  const { hotelUuid, lodgingIndex, occasions } = action;
  const hotelIndex = state.results!.findIndex(r => r.uuid === hotelUuid);
  return produce(state, draftState => {
    if (!draftState || !draftState.results || !draftState.results[hotelIndex]) {
      return state;
    }

    const result = draftState.results[hotelIndex];

    // update the occasions on the correct lodging
    result.bookingBuilder.request.Accommodation[lodgingIndex] = {
      ...result.bookingBuilder.request.Accommodation[lodgingIndex],
      ...occasions,
    };

    return draftState;
  });
};

export const removeLodgingReducer = (state: FastSearchDomain, action) => {
  const { hotelUuid, lodgingIndex } = action;
  const hotelIndex = state.results!.findIndex(r => r.uuid === hotelUuid);

  return produce(state, draftState => {
    if (!draftState || !draftState.results || !draftState.results[hotelIndex]) {
      return state;
    }

    const result = draftState.results[hotelIndex];

    // remove the lodging at the index
    result.bookingBuilder.request.Accommodation.splice(lodgingIndex, 1);

    // rebuild the request level `guestAges` to match all the new figures
    let numberOfAdults: number = 0;
    let agesOfAllChildren: number[] = [];
    result.bookingBuilder.request.Accommodation.forEach(accom => {
      numberOfAdults += accom.guestAges.numberOfAdults;
      agesOfAllChildren = flatten(agesOfAllChildren.concat(accom.guestAges.agesOfAllChildren));
    });

    result.bookingBuilder.request.guestAges = {
      numberOfAdults,
      agesOfAllChildren,
    };

    return draftState;
  });
};

export const updateLodgingDatesReducer = (state: FastSearchDomain, action) => {
  const { hotelUuid, lodgingIndex, startDate, endDate } = action;
  const hotelIndex = state.results!.findIndex(r => r.uuid === hotelUuid);

  return produce(state, draftState => {
    if (!draftState || !draftState.results || !draftState.results[hotelIndex]) {
      return state;
    }

    const result = draftState.results[hotelIndex];

    result.bookingBuilder.request.Accommodation[lodgingIndex].startDate = formatDate(startDate);
    result.bookingBuilder.request.Accommodation[lodgingIndex].endDate = formatDate(endDate);

    return draftState;
  });
};

export const updateGroundServiceReducer = (state: FastSearchDomain, action) => {
  const { groundService, hotelUuid } = action;
  const hotelIndex = state.results!.findIndex(r => r.uuid === hotelUuid);

  return produce(state, draftState => {
    if (!draftState || !draftState.results || !draftState.results[hotelIndex]) {
      return state;
    }

    const result = draftState.results[hotelIndex];

    if (!result.bookingBuilder.request['Ground Service']) {
      result.bookingBuilder.request['Ground Service'] = [];
    }

    const existingIndex = result.bookingBuilder.request['Ground Service'].findIndex(
      gs => gs.uuid === groundService.uuid
    );

    if (existingIndex !== -1) {
      // we have it, so remove it
      result.bookingBuilder.request['Ground Service'].splice(existingIndex, 1);
    } else {
      result.bookingBuilder.request['Ground Service'].push({
        uuid: groundService.uuid,
      });
    }

    return draftState;
  });
};

export const updateSupplementReducer = (state: FastSearchDomain, action) => {
  const { supplement, hotelUuid } = action;
  const hotelIndex = state.results!.findIndex(r => r.uuid === hotelUuid);

  return produce(state, draftState => {
    if (!draftState || !draftState.results || !draftState.results[hotelIndex]) {
      return state;
    }

    const result = draftState.results[hotelIndex];

    if (!result.bookingBuilder.request.Supplement) {
      result.bookingBuilder.request.Supplement = [];
    }

    const existingIndex = result.bookingBuilder.request.Supplement.findIndex(gs => gs.uuid === supplement.uuid);

    if (existingIndex !== -1) {
      // we have it, so remove it
      result.bookingBuilder.request.Supplement.splice(existingIndex, 1);
    } else {
      result.bookingBuilder.request.Supplement.push({
        uuid: supplement.uuid,
      });
    }

    return draftState;
  });
};

export const updateFineReducer = (state: FastSearchDomain, action) => {
  const { fine, hotelUuid } = action;
  const hotelIndex = state.results!.findIndex(r => r.uuid === hotelUuid);

  return produce(state, draftState => {
    if (!draftState || !draftState.results || !draftState.results[hotelIndex]) {
      return state;
    }

    const result = draftState.results[hotelIndex];

    if (!result.bookingBuilder.request.Fine) {
      result.bookingBuilder.request.Fine = [];
    }

    const existingIndex = result.bookingBuilder.request.Fine.findIndex(gs => gs.uuid === fine.uuid);

    if (existingIndex !== -1) {
      // we have it, so remove it
      result.bookingBuilder.request.Fine.splice(existingIndex, 1);
    } else {
      result.bookingBuilder.request.Fine.push({
        uuid: fine.uuid,
      });
    }

    return draftState;
  });
};
