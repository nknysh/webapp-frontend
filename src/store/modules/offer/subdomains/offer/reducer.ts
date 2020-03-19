import * as Actions from './actions';
import produce from 'immer';
import { IOffer } from 'services/BackendApi';
import { IDateRange } from 'interfaces';
import { OfferDomainAction, GET_OFFER_SUCCESS, PUT_OFFER_SUCCESS, POST_OFFER_SUCCESS } from '../../actions';
import { initialState } from '../../model';
import * as R from 'ramda';

export const offerReducer = (state: IOffer = initialState.offer, action: OfferDomainAction): IOffer => {
  switch (action.type) {
    case GET_OFFER_SUCCESS:
      return action.offer;
    case PUT_OFFER_SUCCESS:
    case POST_OFFER_SUCCESS:
      return {
        // Offer may contain associations which are not on the put response
        ...state,
        ...action.offer,
      };
    case Actions.OFFER_HOTEL_UUID_CHANGE:
      return offerHotelUuidChangeReducer(state, action);
    case Actions.OFFER_NAME_CHANGE:
      return offerNameChangeReducer(state, action);
    case Actions.OFFER_TERMS_CHANGE:
      return offerTermsChangeReducer(state, action);
    case Actions.OFFER_FURTHER_INFORMATION_CHANGE:
      return offerFurtherInformationChangeReducer(state, action);
    case Actions.OFFER_ADD_STAY_BETWEEN_PREREQUISITE:
      return offerAddStayBetweenPrerequisiteReducer(state, action);
    case Actions.OFFER_CHANGE_STAY_BETWEEN_PREREQUISITE:
      return offerChangeStayBetweenPrerequisiteReducer(state, action);
    case Actions.OFFER_REMOVE_STAY_BETWEEN_PREREQUISITE:
      return offerRemoveStayBetweenPrerequisiteReducer(state, action);
    case Actions.OFFER_SET_BOOLEAN_PREREQUISITE:
      return offerSetBooleanPrerequisitesReducer(state, action);
    case Actions.OFFER_SET_PRE_DISCOUNT:
      return offerSetPreDiscountReducer(state, action);
    case Actions.OFFER_SET_COUNTRY_CODE_PREREQUISITE:
      return offerSetCountryCodeReducer(state, action);
    case Actions.OFFER_CLEAR_ALL_COUNTRY_CODE_PREREQUISITE:
      return offerClearAllCountryCodeReducer(state, action);
    case Actions.OFFER_SET_ACCOMMODATION_PRODUCT_PREREQUISITE:
      return offerSetAccommodationProductPrerequisiteReducer(state, action);
    case Actions.OFFER_CLEAR_ALL_ACCOMMODATION_PRODUCT_PREREQUISITE:
      return offerClearAllAccommodationProductPrerequisiteReducer(state, action);
    case Actions.OFFER_SET_ADVANCE_BOOK_BY_PREREQUISITE:
      return offerSetAdvanceBookByPrerequisiteReducer(state, action);
    case Actions.OFFER_SET_ADVANCE_MINIMUM_PREREQUISITE:
      return offerSetAdvanceMinimumPrerequisiteReducer(state, action);
    case Actions.OFFER_SET_ADVANCE_MAXIMUM_PREREQUISITE:
      return offerSetAdvanceMaximumPrerequisiteReducer(state, action);
    case Actions.OFFER_CLEAR_ALL_ADVANCE_PREREQUISITE:
      return offerClearAllAdvancePrerequisiteReducer(state, action);
    case Actions.OFFER_SET_MAX_LODGINGS_PREREQUISITE:
      return offerSetMaxLodgingsPrerequisiteReducer(state, action);

    case Actions.OFFER_SET_STAY_LENGTH_MINIMUM_PREREQUISITE:
      return offerSetStayLengthMinimumPrerequisiteReducer(state, action);
    case Actions.OFFER_SET_STAY_LENGTH_MAXIMUM_PREREQUISITE:
      return offerSetStayLengthMaximumPrerequisiteReducer(state, action);
    case Actions.OFFER_SET_STAY_LENGTH_STRICT_PREREQUISITE:
      return offerSetStayLengthStrictPrerequisiteReducer(state, action);
    case Actions.OFFER_CLEAR_ALL_STAY_LENGTH_PREREQUISITE:
      return offerClearAllStayLengthPrerequisiteReducer(state, action);

    case Actions.OFFER_SET_STEPPING_EVERY_X_NIGHTS_APPLICATION:
      return offerSetSteppingEveryXNightsApplicationReducer(state, action);
    case Actions.OFFER_SET_STEPPING_APPLY_TO_APPLICATION:
      return offerSetSteppingApplyToApplicationReducer(state, action);
    case Actions.OFFER_SET_STEPPING_MAXIMUM_NIGHTS_APPLICATION:
      return offerSetSteppingMaximumNightsApplicationReducer(state, action);
    case Actions.OFFER_SET_STEPPING_DISCOUNT_CHEAPEST_APPLICATION:
      return offerSetSteppingDiscountCheapestApplicationReducer(state, action);
    case Actions.OFFER_CLEAR_ALL_STEPPING_APPLICATION:
      return offerClearAllSteppingApplicationReducer(state, action);

    case Actions.OFFER_SET_ACCOMMODATION_DISCOUNT_DISCOUNT_PERCENTAGE_APPLICATION:
      return offerSetAccommodationDiscountDiscountPercentageReducer(state, action);
    case Actions.OFFER_SET_ACCOMMODATION_DISCOUNT_GREEN_TAX_APPROACH_APPLICATION:
      return offerSetAccommodationDiscountGreenTaxApproachReducer(state, action);
    case Actions.OFFER_CLEAR_ALL_ACCOMMODATION_DISCOUNT_APPLICATION:
      return offerClearAllAccommodationDiscountReducer(state, action);
    default:
      return state;
  }
};

export const offerHotelUuidChangeReducer = (state: IOffer, action: Actions.OfferHotelUuidChangeAction): IOffer => {
  return {
    ...state,
    hotelUuid: action.hotelUuid,
  };
};

export const offerNameChangeReducer = (state: IOffer, action: Actions.OfferNameChangeAction): IOffer => {
  return {
    ...state,
    name: action.offerName,
  };
};

export const offerTermsChangeReducer = (state: IOffer, action: Actions.OfferTermsChangeAction): IOffer => {
  return {
    ...state,
    termsAndConditions: action.offerTerms,
  };
};

export const offerFurtherInformationChangeReducer = (
  state: IOffer,
  action: Actions.OfferFurtherInformationChangeAction
): IOffer => {
  return {
    ...state,
    furtherInformation: action.offerFurtherInformation,
  };
};

export const offerAddStayBetweenPrerequisiteReducer = (
  state: IOffer,
  action: Actions.OfferAddStayBetweenPrerequisiteAction
): IOffer => {
  return produce<IOffer>(state, draftState => {
    draftState.prerequisites.dates.push({
      startDate: '',
      endDate: '',
    });
    return draftState;
  });
};

export const offerRemoveStayBetweenPrerequisiteReducer = (
  state: IOffer,
  action: Actions.OfferRemoveStayBetweenPrerequisiteAction
): IOffer => {
  return produce<IOffer>(state, draftState => {
    draftState.prerequisites.dates.splice(action.stayBetweenIndex, 1);
    return draftState;
  });
};

export const offerChangeStayBetweenPrerequisiteReducer = (
  state: IOffer,
  action: Actions.OfferChangeStayBetweenPrerequisiteAction
): IOffer => {
  return produce<IOffer>(state, draftState => {
    action.datesArray.forEach((dates, index) => {
      const newDateRange = {
        startDate: dates[0],
        endDate: dates[dates.length - 1],
      } as IDateRange;

      draftState.prerequisites.dates[index] = newDateRange;
    });

    return draftState;
  });
};

export const offerSetBooleanPrerequisitesReducer = (
  state: IOffer,
  action: Actions.OfferSetBooleanPrerequisiteAction
): IOffer => {
  return produce<IOffer>(state, draftState => {
    // if value is true or false, make sure we have a payload object, and then set the value inside it
    if (action.value !== null) {
      if (!draftState.prerequisites.payload) {
        draftState.prerequisites.payload = {};
      }

      draftState.prerequisites.payload[action.key] = action.value;
    }

    // if value is null and we HAVE that payload object, delete it from the object
    if (action.value === null && draftState.prerequisites.payload && draftState.prerequisites.payload[action.key]) {
      delete draftState.prerequisites.payload[action.key];
    }

    // if we have a payload, but its now empty, remove payload itself
    if (draftState.prerequisites.payload && Object.keys(draftState.prerequisites.payload).length <= 0) {
      delete draftState.prerequisites.payload;
    }

    return draftState;
  });
};

export const offerSetPreDiscountReducer = (state: IOffer, action: Actions.OfferSetPreDiscountAction): IOffer => {
  return {
    ...state,
    preDiscount: action.value,
  };
};

export const offerSetCountryCodeReducer = (
  state: IOffer,
  action: Actions.OfferSetCountryCodePrerequisiteAction
): IOffer => {
  return produce(state, draftState => {
    if (action.value === true) {
      draftState.prerequisites.countryCodes.push(action.countryCode);
    } else if (action.value === false) {
      draftState.prerequisites.countryCodes = draftState.prerequisites.countryCodes.filter(
        cc => cc !== action.countryCode
      );
    }

    draftState.prerequisites.countryCodes = R.uniq(draftState.prerequisites.countryCodes);

    return draftState;
  });
};

export const offerClearAllCountryCodeReducer = (
  state: IOffer,
  action: Actions.OfferClearAllCountryCodePrerequisiteAction
): IOffer => {
  return {
    ...state,
    prerequisites: {
      ...state.prerequisites,
      countryCodes: [],
    },
  };
};

export const offerSetAccommodationProductPrerequisiteReducer = (
  state: IOffer,
  action: Actions.OfferSetAccommodationProductPrerequisiteAction
): IOffer => {
  return produce(state, draftState => {
    if (action.value === true) {
      draftState.prerequisites.accommodationProducts.push(action.accommodationProductUuid);
    } else if (action.value === false) {
      draftState.prerequisites.accommodationProducts = draftState.prerequisites.accommodationProducts.filter(
        cc => cc !== action.accommodationProductUuid
      );
    }

    draftState.prerequisites.accommodationProducts = R.uniq(draftState.prerequisites.accommodationProducts);

    return draftState;
  });
};

export const offerClearAllAccommodationProductPrerequisiteReducer = (
  state: IOffer,
  action: Actions.OfferClearAllAccommodationProductPrerequisiteAction
): IOffer => {
  return {
    ...state,
    prerequisites: {
      ...state.prerequisites,
      accommodationProducts: [],
    },
  };
};

export const offerSetAdvanceBookByPrerequisiteReducer = (
  state: IOffer,
  action: Actions.OfferSetAdvanceBookByPrerequisiteAction
): IOffer => {
  return {
    ...state,
    prerequisites: {
      ...state.prerequisites,
      advance: {
        ...state.prerequisites.advance,
        bookBy: action.value,
      },
    },
  };
};

export const offerSetAdvanceMinimumPrerequisiteReducer = (
  state: IOffer,
  action: Actions.OfferSetAdvanceMinimumPrerequisiteAction
): IOffer => {
  return {
    ...state,
    prerequisites: {
      ...state.prerequisites,
      advance: {
        ...state.prerequisites.advance,
        minimum: action.value,
      },
    },
  };
};

export const offerSetAdvanceMaximumPrerequisiteReducer = (
  state: IOffer,
  action: Actions.OfferSetAdvanceMaximumPrerequisiteAction
): IOffer => {
  return {
    ...state,
    prerequisites: {
      ...state.prerequisites,
      advance: {
        ...state.prerequisites.advance,
        maximum: action.value,
      },
    },
  };
};

export const offerClearAllAdvancePrerequisiteReducer = (
  state: IOffer,
  action: Actions.OfferClearAllAdvancePrerequisiteAction
): IOffer => {
  return {
    ...state,
    prerequisites: {
      ...state.prerequisites,
      advance: undefined,
    },
  };
};

export const offerSetMaxLodgingsPrerequisiteReducer = (
  state: IOffer,
  action: Actions.OfferSetMaxLodgingsPrerequisiteAction
): IOffer => {
  return {
    ...state,
    prerequisites: {
      ...state.prerequisites,
      maximumLodgingsInBooking: action.value,
    },
  };
};

export const offerSetStayLengthMinimumPrerequisiteReducer = (
  state: IOffer,
  action: Actions.OfferSetStayLengthMinimumPrerequisiteAction
): IOffer => {
  return {
    ...state,
    prerequisites: {
      ...state.prerequisites,
      stayLength: {
        ...state.prerequisites.stayLength,
        minimum: action.value,
      },
    },
  };
};

export const offerSetStayLengthMaximumPrerequisiteReducer = (
  state: IOffer,
  action: Actions.OfferSetStayLengthMaximumPrerequisiteAction
): IOffer => {
  return {
    ...state,
    prerequisites: {
      ...state.prerequisites,
      stayLength: {
        ...state.prerequisites.stayLength,
        maximum: action.value,
      },
    },
  };
};

export const offerSetStayLengthStrictPrerequisiteReducer = (
  state: IOffer,
  action: Actions.OfferSetStayLengthStrictPrerequisiteAction
): IOffer => {
  return {
    ...state,
    prerequisites: {
      ...state.prerequisites,
      stayLength: {
        ...state.prerequisites.stayLength,
        strictMinMaxStay: action.value,
      },
    },
  };
};

export const offerClearAllStayLengthPrerequisiteReducer = (
  state: IOffer,
  action: Actions.OfferClearAllStayLengthPrerequisiteAction
): IOffer => {
  return {
    ...state,
    prerequisites: {
      ...state.prerequisites,
      stayLength: undefined,
    },
  };
};

export const offerSetSteppingEveryXNightsApplicationReducer = (
  state: IOffer,
  action: Actions.OfferSetSteppingEveryXNightsApplicationAction
): IOffer => {
  return {
    ...state,
    stepping: {
      ...state.stepping,
      everyXNights: action.value,
    },
  };
};

export const offerSetSteppingApplyToApplicationReducer = (
  state: IOffer,
  action: Actions.OfferSetSteppingApplyToApplicationAction
): IOffer => {
  return {
    ...state,
    stepping: {
      ...state.stepping,
      applyTo: action.value,
    },
  };
};

export const offerSetSteppingMaximumNightsApplicationReducer = (
  state: IOffer,
  action: Actions.OfferSetSteppingMaximumNightsApplicationAction
): IOffer => {
  return {
    ...state,
    stepping: {
      ...state.stepping,
      maximumNights: action.value,
    },
  };
};

export const offerSetSteppingDiscountCheapestApplicationReducer = (
  state: IOffer,
  action: Actions.OfferSetSteppingDiscountCheapestApplicationAction
): IOffer => {
  return {
    ...state,
    stepping: {
      ...state.stepping,
      discountCheapest: action.value,
    },
  };
};

export const offerClearAllSteppingApplicationReducer = (
  state: IOffer,
  action: Actions.OfferClearAllSteppingApplicationAction
): IOffer => {
  return {
    ...state,
    stepping: undefined,
  };
};

export const offerSetAccommodationDiscountDiscountPercentageReducer = (
  state: IOffer,
  action: Actions.OfferSetAccommodationDiscountDiscountPercentageAction
): IOffer => {
  return {
    ...state,
    accommodationProductDiscount: {
      ...state.accommodationProductDiscount,
      discountPercentage: action.value,
    },
  };
};

export const offerSetAccommodationDiscountGreenTaxApproachReducer = (
  state: IOffer,
  action: Actions.OfferSetAccommodationDiscountGreenTaxApproachAction
): IOffer => {
  return {
    ...state,
    accommodationProductDiscount: {
      ...state.accommodationProductDiscount,
      greenTaxDiscountApproach: action.value,
    },
  };
};

export const offerClearAllAccommodationDiscountReducer = (
  state: IOffer,
  action: Actions.OfferClearAllAccommodationDiscountAction
): IOffer => {
  return {
    ...state,
    accommodationProductDiscount: undefined,
  };
};
