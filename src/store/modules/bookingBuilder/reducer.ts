import { initialState, BookingBuilderDomain } from './model';
import * as Actions from './actions';
import * as CustomItemActions from './subdomains/customItem/actions';
import { customItemReducer } from './subdomains/customItem/reducer';
import { makeBookingBuilderStub } from './utils';
import { SelectedAccommodation } from 'services/BackendApi';
import { flatten, min as Rmin } from 'ramda';
import produce from 'immer';
import { formatDate } from 'utils';
import { min, max, subDays } from 'date-fns';

export const bookingBuilderReducer = (
  state: BookingBuilderDomain = initialState,
  action: Actions.BookingBuilderAction
) => {
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

    case Actions.UPDATE_TA_MARGIN_TYPE_ACTION:
      return updateTAMarginTypeReducer(state, action);
    case Actions.UPDATE_TA_MARGIN_AMOUNT_ACTION:
      return updateTAMarginAmountReducer(state, action);
    case Actions.UPDATE_IS_TA_MARGIN_APPLIED_ACTION:
      return updateIsTAMarginAppliedReducer(state, action);

    case Actions.UPDATE_BOOKING_GUEST_INFORMATION_ACTION:
      return updateBookingGuestInformationReducer(state, action);
    case Actions.CLEAR_BOOKING_BUILDER_UI_STATE:
      return resetBookingBuilderUiStateReducer(state);
    case Actions.UPDATE_TRAVEL_AGENT_USER_ID:
      return updateBookingTravelAgentUserIdReducer(state, action);

    case Actions.UPDATE_LODGING_REPEAT_GUEST_ACTION:
      return updateLodgingRepeatGuestReducer(state, action);

    case Actions.UPDATE_AGREEE_TO_TERMS:
      return updateAgreeToTermsReducer(state, action);

    case Actions.SET_IS_PRISTINE:
      return setIsPristineReducer(state, action);

    case Actions.SAVE_CUSTOM_ITEM:
      return saveCustomItemReducer(state, action);
    case Actions.REMOVE_CUSTOM_ITEM:
      return removeCustomItemReducer(state, action);

    case CustomItemActions.SHOW_CUSTOM_ITEM_FORM:
    case CustomItemActions.HIDE_CUSTOM_ITEM_FORM:
    case CustomItemActions.UPDATE_CUSTOM_ITEM_NAME:
    case CustomItemActions.UPDATE_CUSTOM_ITEM_TOTAL:
    case CustomItemActions.UPDATE_CUSTOM_ITEM_DESCRIPTION:
    case CustomItemActions.UPDATE_CUSTOM_ITEM_COUNTS_AS_MEAL_PLAN:
    case CustomItemActions.UPDATE_CUSTOM_ITEM_COUNTS_AS_TRANSFER:
      return {
        ...state,
        customItem: customItemReducer(state.customItem, action),
      };

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
  const { accommodationProduct, searchQuery } = action;
  let { guestAges } = action;
  const { startDate, endDate } = searchQuery;

  return produce(state, draftState => {
    if (!draftState.currentBookingBuilder) {
      return state;
    }

    // if they're adding the room without guest ages, they want standard occupancy
    if (guestAges == null) {
      guestAges = {
        numberOfAdults: action.accommodationProduct.occupancy.standardOccupancy,
        agesOfAllChildren: [],
      };
    }

    let newLodging;

    if (draftState.currentBookingBuilder.request.Accommodation.length <= 0) {
      // first room on the booking
      newLodging = {
        uuid: accommodationProduct.uuid,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        honeymoon: searchQuery.lodgings[0].honeymoon || false,
        anniversary: searchQuery.lodgings[0].anniversary || false,
        wedding: searchQuery.lodgings[0].wedding || false,
        birthday: searchQuery.lodgings[0].birthday || false,
        repeatCustomer: searchQuery.lodgings[0].repeatCustomer || false,
        guestAges,
        subProducts: {
          'Meal Plan': [
            {
              uuid: accommodationProduct.defaultMealPlanUuid,
            },
          ],
        },
      };
    } else {
      // not the first room on the booking
      newLodging = {
        uuid: accommodationProduct.uuid,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        honeymoon: false,
        anniversary: false,
        wedding: false,
        birthday: false,
        repeatCustomer: false,
        guestAges,
        subProducts: {
          'Meal Plan': [
            {
              uuid: accommodationProduct.defaultMealPlanUuid,
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
  const { lodgingIndex } = action;

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

    // if the user has got to a position where they have no lodgings at all,
    // they've basically manually reset the booking - reset a whooooole bunch of stuff
    if (draftState.currentBookingBuilder.request.Accommodation.length <= 0) {
      draftState.currentBookingBuilder.request.Accommodation = [];
      draftState.currentBookingBuilder.response.canBeBooked = false;
      draftState.currentBookingBuilder.response.mustStop = false;
      draftState.currentBookingBuilder.response.errors = [];
      draftState.currentBookingBuilder.response.displayTotals.totals.total = null;
      draftState.currentBookingBuilder.response.potentialBooking = {
        Accommodation: [],
        Supplement: [],
        Transfer: [],
        'Ground Service': [],
        Fine: [],
      };
      draftState.currentBookingBuilder.response.availableProductSets = {
        Accommodation: [],
        Supplement: [],
        Transfer: [],
        'Ground Service': [],
        Fine: [],
      };

      draftState.currentBookingBuilder.response.totals = {
        oneOrMoreItemsOnRequest: false,
        totalForPricedItemsCents: 0,
        totalBeforeDiscountForPricedItemsCents: 0,
        totalForPricedItems: '0.00',
        totalBeforeDiscountForPricedItems: '0.00',
        total: '0.00',
        totalBeforeDiscount: '0.00',
      };
    }

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

    // rebuild the request level `guestAges` to take into account the new dates
    draftState.currentBookingBuilder.request.guestAges = calculateBookingTotalGuestAges(
      draftState.currentBookingBuilder.request.Accommodation
    );

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
    draftState = initialState;

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
      customItem: initialState.customItem,
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

export const updateIsTAMarginAppliedReducer = (
  state: BookingBuilderDomain,
  action: Actions.UpdateIsTAMarginAppliedAction
): BookingBuilderDomain => {
  return produce(state, draftState => {
    draftState.isTAMarginApplied = action.value;
    return draftState;
  });
};

export const updateBookingGuestInformationReducer = (
  state: BookingBuilderDomain,
  action: Actions.UpdateBookingGuestInformationAction
): BookingBuilderDomain => {
  return produce(state, draftState => {
    draftState = {
      ...draftState,
      ...action.bookingGuestInformation,
    };

    return draftState;
  });
};

export const updateAgreeToTermsReducer = (
  state: BookingBuilderDomain,
  action: Actions.UpdateAgreeToTermsAction
): BookingBuilderDomain => {
  return produce(state, draftState => {
    draftState.agreeToTerms = action.value;
    return draftState;
  });
};

export const setIsPristineReducer = (
  state: BookingBuilderDomain,
  action: Actions.SetIsPristineAction
): BookingBuilderDomain => {
  return produce(state, draftState => {
    draftState.isPristine = action.value;
    return draftState;
  });
};

export const updateLodgingRepeatGuestReducer = (
  state: BookingBuilderDomain,
  action: Actions.UpdateLodgingRepeatGuestAction
) => {
  return produce(state, draftState => {
    if (!draftState.currentBookingBuilder) {
      return draftState;
    }
    draftState.currentBookingBuilder.request.Accommodation[action.lodgingIndex].repeatCustomer = action.checked;
    return draftState;
  });
};

export const resetBookingBuilderUiStateReducer = (state: BookingBuilderDomain): BookingBuilderDomain => ({
  ...state,
  isTAMarginApplied: true,
  taMarginType: 'percentage',
  taMarginAmount: '0',
});

export const updateBookingTravelAgentUserIdReducer = (
  state: BookingBuilderDomain,
  action: Actions.UpdateBookingTravelAgentUserIdAction
) => {
  return produce(state, draftState => {
    draftState.travelAgentUserUuid = action.travelAgentUserUuid;
    return draftState;
  });
};

export const calculateBookingTotalGuestAges = (lodgings: SelectedAccommodation[]) => {
  let numberOfAdults: number = 0;
  let agesOfAllChildren: number[] = [];

  const { earliestStartDate: esd } = calculateBookingDates(lodgings);
  const earliestStartDate = formatDate(esd);

  lodgings
    .filter(accom => accom.startDate === earliestStartDate)
    .forEach(accom => {
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
  let earliestStartDate = accommodations[0] ? new Date(accommodations[0].startDate) : new Date();
  let latestEndDate = accommodations[0] ? new Date(accommodations[0].endDate) : new Date();

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

export const saveCustomItemReducer = (
  state: BookingBuilderDomain,
  action: Actions.SaveCustomItemAction
): BookingBuilderDomain => {
  return produce(state, draftState => {
    if (!draftState.currentBookingBuilder || !draftState.customItem.payload) {
      return state;
    }

    if (!draftState.currentBookingBuilder.request.customItems) {
      draftState.currentBookingBuilder.request.customItems = [];
    }

    const { payload } = draftState.customItem;

    draftState.currentBookingBuilder.request.customItems.push(payload);

    if (payload.countsAsTransfer) {
      draftState.currentBookingBuilder.request.Transfer = [];
    }

    if (payload.countsAsMealPlan) {
      draftState.currentBookingBuilder.request.Accommodation.forEach(product => {
        product.subProducts['Meal Plan'] = [];
      });
    }

    draftState.customItem.payload = null;

    return draftState;
  });
};

export const removeCustomItemReducer = (
  state: BookingBuilderDomain,
  action: Actions.RemoveCustomItemAction
): BookingBuilderDomain => {
  return produce(state, draftState => {
    if (!draftState.currentBookingBuilder) {
      return state;
    }

    draftState.currentBookingBuilder.request.customItems.splice(action.index, 1);

    return draftState;
  });
};
