import * as Actions from './actions';
import produce from 'immer';
import { IOffer } from 'services/BackendApi';
import { IDateRange } from 'interfaces';
import { OfferDomainAction, GET_OFFER_SUCCESS } from '../../actions';
import { initialState } from '../../model';

export const offerReducer = (state: IOffer = initialState.offer, action: OfferDomainAction): IOffer => {
  switch (action.type) {
    case GET_OFFER_SUCCESS:
      return action.offer;
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
