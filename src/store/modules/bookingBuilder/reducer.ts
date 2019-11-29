import { initialState, BookingBuilderDomain } from './model';
import * as Actions from './actions';
import { makeBookingBuilderStub } from './utils';
import { SelectedAccommodation } from 'services/BackendApi';
import { flatten } from 'ramda';

import produce from 'immer';
import { formatDate } from 'utils';
import { min, max, subDays } from 'date-fns';

const bookingBuilderReducer = (state: BookingBuilderDomain = initialState, action: Actions.BookingBuilderAction) => {
  switch (action.type) {
    case Actions.CLEAR_BOOKING_BUILDER:
      return clearBookingBuilderReducer(state, action);

    case Actions.COPY_BOOKING_BUILDER:
      return copyBookingBuilderReducer(state, action);

    case Actions.CREATE_STUB_BOOKING_BUILDER:
      return createStubBookingBuilderReducer(state, action);

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
    case Actions.UPDATE_TRANSFER:
      return updateTransferReducer(state, action);

    case Actions.UPDATE_BOOKING_SUCCESS:
      return updateBookingSuccessReducer(state, action);

    case Actions.INITIALIZE_BOOKING_BUILDER:
      return initializeBookingBuilderReducer(state, action);

    case Actions.FORWARDS_COMPAT_BOOKING_BUILDER_ACTION:
      return forwardsCompatBookingBuilderReducer(state, action);

    case Actions.UPDATE_TA_MARGIN_TYPE:
      return updateTAMarginTypeReducer(state, action);
    case Actions.UPDATE_TA_MARGIN_AMOUNT:
      return updateTAMarginAmountReducer(state, action);
    default:
      return state;
  }
};

export const updateBookingSuccessReducer = (
  state: BookingBuilderDomain,
  action: Actions.UpdateBookingSuccessAction
): BookingBuilderDomain => {
  return produce(state, draftState => {
    if (!draftState.currentBookingBuilder) {
      return state;
    }

    draftState.currentBookingBuilder.response = action.response;

    return draftState;
  });
};

export const updateTransferReducer = (
  state: BookingBuilderDomain,
  action: Actions.UpdateTransferAction
): BookingBuilderDomain => {
  const { hotelUuid, transfer } = action;

  return produce(state, draftState => {
    if (!draftState.currentBookingBuilder) {
      return state;
    }

    if (!action.transfer.direction) {
      draftState.currentBookingBuilder.request.Transfer = [transfer];
    }

    if (action.transfer.direction) {
      draftState.currentBookingBuilder.request.Transfer = draftState.currentBookingBuilder.request.Transfer.filter(
        t => t.direction && t.direction !== action.transfer.direction
      ).concat(action.transfer);
    }

    return draftState;
  });
};

export const updateLodgingGuestAgesReducer = (
  state: BookingBuilderDomain,
  action: Actions.UpdateLodgingGuestAgesAction
): BookingBuilderDomain => {
  return produce(state, draftState => {
    if (!draftState.currentBookingBuilder) {
      return state;
    }

    // update the request accommodation to be correct
    draftState.currentBookingBuilder.request.Accommodation[action.lodgingIndex].guestAges = action.guestAges;

    // rebuild the request level `guestAges` to match all the new figures
    draftState.currentBookingBuilder.request.guestAges = calculateBookingTotalGuestAges(
      draftState.currentBookingBuilder.request.Accommodation
    );

    return draftState;
  });
};

export const updateLodgingMealPlanReducer = (
  state: BookingBuilderDomain,
  action: Actions.UpdateLodgingMealPlanAction
): BookingBuilderDomain => {
  return produce(state, draftState => {
    if (!draftState.currentBookingBuilder) {
      return state;
    }

    // update the meal plans on the correct lodging
    draftState.currentBookingBuilder.request.Accommodation[action.lodgingIndex].subProducts[
      'Meal Plan'
    ] = action.mealPlanUuids.map(mealPlanUuid => {
      return {
        uuid: mealPlanUuid,
      };
    });

    return draftState;
  });
};

export const addLodgingReducer = (
  state: BookingBuilderDomain,
  action: Actions.AddLodgingAction
): BookingBuilderDomain => {
  const { hotelUuid, accommodationProductUuid, hotelAccommodationProducts, startDate, endDate } = action;

  const selectedAccommodationProduct = hotelAccommodationProducts.find(r => r.uuid === accommodationProductUuid);

  return produce(state, draftState => {
    if (!draftState.currentBookingBuilder) {
      return state;
    }

    const existingLodgingOfAccommodationProduct = draftState.currentBookingBuilder.request.Accommodation.find(
      a => a.uuid === accommodationProductUuid
    );

    let newLodging;
    if (existingLodgingOfAccommodationProduct) {
      // we already have a lodging of this accommodation product, which means the new lodging
      // should be added with the exact same data + standard occupancy
      newLodging = {
        ...existingLodgingOfAccommodationProduct,
        startDate: formatDate(existingLodgingOfAccommodationProduct.startDate),
        endDate: formatDate(existingLodgingOfAccommodationProduct.endDate),
        guestAges: {
          numberOfAdults: selectedAccommodationProduct ? selectedAccommodationProduct.occupancy.standardOccupancy : 0,
          agesOfAllChildren: [],
        },
      };
    } else {
      // this is the first lodging of this accommodation product, so add it with standard occupancy,
      // the search query dates, and the accommodation product default meal plan
      newLodging = {
        uuid: accommodationProductUuid,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        guestAges: {
          numberOfAdults: selectedAccommodationProduct ? selectedAccommodationProduct.occupancy.standardOccupancy : 0,
          agesOfAllChildren: [],
        },
        subProducts: {
          'Meal Plan': [
            {
              uuid: selectedAccommodationProduct ? selectedAccommodationProduct.defaultMealPlanUuid : null,
            },
          ],
        },
      };
    }

    // now that newLodging is built, add it into the request Accommodation array
    draftState.currentBookingBuilder.request.Accommodation.push(newLodging);

    // rebuild the request level `guestAges` to match all the new figures
    draftState.currentBookingBuilder.request.guestAges = calculateBookingTotalGuestAges(
      draftState.currentBookingBuilder.request.Accommodation
    );

    const { earliestStartDate, latestEndDate } = calculateBookingDates(
      draftState.currentBookingBuilder.request.Accommodation
    );

    draftState.currentBookingBuilder.request.startDate = formatDate(earliestStartDate);
    draftState.currentBookingBuilder.request.endDate = formatDate(latestEndDate);

    return draftState;
  });
};

export const updateLodgingOccasionsReducer = (
  state: BookingBuilderDomain,
  action: Actions.UpdateLodgingOccasionsAction
): BookingBuilderDomain => {
  const { hotelUuid, lodgingIndex, occasions } = action;

  return produce(state, draftState => {
    if (!draftState.currentBookingBuilder) {
      return state;
    }

    // update the occasions on the correct lodging
    draftState.currentBookingBuilder.request.Accommodation[lodgingIndex] = {
      ...draftState.currentBookingBuilder.request.Accommodation[lodgingIndex],
      ...occasions,
    };

    return draftState;
  });
};

export const removeLodgingReducer = (
  state: BookingBuilderDomain,
  action: Actions.RemoveLodgingAction
): BookingBuilderDomain => {
  const { hotelUuid, lodgingIndex } = action;

  return produce(state, draftState => {
    if (!draftState.currentBookingBuilder) {
      return state;
    }

    // remove the lodging at the index
    draftState.currentBookingBuilder.request.Accommodation.splice(lodgingIndex, 1);

    // rebuild the request level `guestAges` to match all the new figures
    draftState.currentBookingBuilder.request.guestAges = calculateBookingTotalGuestAges(
      draftState.currentBookingBuilder.request.Accommodation
    );

    return draftState;
  });
};

export const updateLodgingDatesReducer = (
  state: BookingBuilderDomain,
  action: Actions.UpdateLodgingDatesAction
): BookingBuilderDomain => {
  const { hotelUuid, lodgingIndex, startDate, endDate } = action;

  return produce(state, draftState => {
    if (!draftState.currentBookingBuilder) {
      return state;
    }

    // @see https://pureescapes.atlassian.net/browse/OWA-1031
    const newEndDate = subDays(new Date(endDate), 1);
    draftState.currentBookingBuilder.request.Accommodation[lodgingIndex].startDate = formatDate(startDate);
    draftState.currentBookingBuilder.request.Accommodation[lodgingIndex].endDate = formatDate(newEndDate);

    const { earliestStartDate, latestEndDate } = calculateBookingDates(
      draftState.currentBookingBuilder.request.Accommodation
    );

    draftState.currentBookingBuilder.request.startDate = formatDate(earliestStartDate);
    draftState.currentBookingBuilder.request.endDate = formatDate(latestEndDate);

    return draftState;
  });
};

export const updateGroundServiceReducer = (
  state: BookingBuilderDomain,
  action: Actions.UpdateGroundServiceAction
): BookingBuilderDomain => {
  const { groundService, hotelUuid } = action;

  return produce(state, draftState => {
    if (!draftState.currentBookingBuilder) {
      return state;
    }

    if (!draftState.currentBookingBuilder.request['Ground Service']) {
      draftState.currentBookingBuilder.request['Ground Service'] = [];
    }

    const existingIndex = draftState.currentBookingBuilder.request['Ground Service'].findIndex(
      gs => gs.uuid === groundService.uuid
    );

    if (existingIndex !== -1) {
      // we have it, so remove it
      draftState.currentBookingBuilder.request['Ground Service'].splice(existingIndex, 1);
    } else {
      draftState.currentBookingBuilder.request['Ground Service'].push({
        uuid: groundService.uuid,
      });
    }

    return draftState;
  });
};

export const updateSupplementReducer = (
  state: BookingBuilderDomain,
  action: Actions.UpdateSupplementAction
): BookingBuilderDomain => {
  const { supplement } = action;

  return produce(state, draftState => {
    if (!draftState.currentBookingBuilder) {
      return state;
    }

    if (!draftState.currentBookingBuilder.request.Supplement) {
      draftState.currentBookingBuilder.request.Supplement = [];
    }

    const existingIndex = draftState.currentBookingBuilder.request.Supplement.findIndex(
      gs => gs.uuid === supplement.uuid
    );

    if (existingIndex !== -1) {
      // we have it, so remove it
      draftState.currentBookingBuilder.request.Supplement.splice(existingIndex, 1);
    } else {
      draftState.currentBookingBuilder.request.Supplement.push({
        uuid: supplement.uuid,
      });
    }

    return draftState;
  });
};

export const updateFineReducer = (
  state: BookingBuilderDomain,
  action: Actions.UpdateFineAction
): BookingBuilderDomain => {
  const { fine, hotelUuid } = action;

  return produce(state, draftState => {
    if (!draftState.currentBookingBuilder) {
      return state;
    }

    if (!draftState.currentBookingBuilder.request.Fine) {
      draftState.currentBookingBuilder.request.Fine = [];
    }

    const existingIndex = draftState.currentBookingBuilder.request.Fine.findIndex(gs => gs.uuid === fine.uuid);

    if (existingIndex !== -1) {
      // we have it, so remove it
      draftState.currentBookingBuilder.request.Fine.splice(existingIndex, 1);
    } else {
      draftState.currentBookingBuilder.request.Fine.push({
        uuid: fine.uuid,
      });
    }

    return draftState;
  });
};

export const initializeBookingBuilderReducer = (
  state: BookingBuilderDomain,
  action: Actions.InitializeBookingBuilderAction
): BookingBuilderDomain => {
  return produce(state, draftState => {
    draftState.hotelUuid = action.hotelUuid;

    return draftState;
  });
};

export const clearBookingBuilderReducer = (
  state: BookingBuilderDomain,
  action: Actions.ClearBookingBuilderAction
): BookingBuilderDomain => {
  return produce(state, draftState => {
    draftState.currentBookingBuilder = null;

    return draftState;
  });
};

export const copyBookingBuilderReducer = (
  state: BookingBuilderDomain,
  action: Actions.CopyBookingBuilderAction
): BookingBuilderDomain => {
  return produce(state, draftState => {
    draftState.currentBookingBuilder = action.bookingBuilder;

    return draftState;
  });
};

export const createStubBookingBuilderReducer = (state: BookingBuilderDomain, action): BookingBuilderDomain => {
  return produce(state, draftState => {
    draftState.currentBookingBuilder = makeBookingBuilderStub(action.hotel);

    return draftState;
  });
};

export const forwardsCompatBookingBuilderReducer = (
  state: BookingBuilderDomain,
  action: Actions.ForwardsCompatBookingBuilderAction
): BookingBuilderDomain => {
  return produce(state, draftState => {
    if (!action.booking.breakdown || !action.booking.breakdown.requestedBuild) {
      return draftState;
    }

    draftState = {
      ...action.booking,
      currentBookingBuilder: {
        request: {
          ...action.booking.breakdown.requestedBuild,
        },
        response: {
          ...action.booking.breakdown,
          requestedBuild: undefined,
        },
      },
      breakdown: undefined,
    };

    return draftState;
  });
};

export const updateTAMarginTypeReducer = (
  state: BookingBuilderDomain,
  action: Actions.UpdateTAMarginType
): BookingBuilderDomain => {
  return produce(state, draftState => {
    draftState.taMarginType = action.taMarginType;
    return draftState;
  });
};
export const updateTAMarginAmountReducer = (
  state: BookingBuilderDomain,
  action: Actions.UpdateTAMarginAmount
): BookingBuilderDomain => {
  return produce(state, draftState => {
    draftState.taMarginAmount = action.taMarginAmount;
    return draftState;
  });
};

export const calculateBookingTotalGuestAges = (accommodations: SelectedAccommodation[]) => {
  let numberOfAdults: number = 0;
  let agesOfAllChildren: number[] = [];
  accommodations.forEach(accom => {
    numberOfAdults += accom.guestAges.numberOfAdults;
    if (accom.guestAges.agesOfAllChildren && accom.guestAges.agesOfAllChildren.length >= 1) {
      agesOfAllChildren = flatten(agesOfAllChildren.concat(accom.guestAges.agesOfAllChildren));
    }
  });

  return {
    numberOfAdults,
    agesOfAllChildren,
  };
};

// rebuild the request level `startDate` and `endDate` so they are the earliest state
// and latest end, respectively
export const calculateBookingDates = (accommodations: SelectedAccommodation[]) => {
  let earliestStartDate = new Date(accommodations[0].startDate);
  let latestEndDate = new Date(accommodations[0].endDate);

  accommodations.forEach(reqAccom => {
    earliestStartDate = min([new Date(reqAccom.startDate), earliestStartDate]);
    latestEndDate = max([new Date(reqAccom.endDate), latestEndDate]);
  });

  return {
    earliestStartDate,
    latestEndDate,
  };
};

export default bookingBuilderReducer;
