import { IOfferModel } from '../model';
import {
  OfferHotelUuidChangeAction,
  OfferNameChangeAction,
  OfferTermsChangeAction,
  OfferFurtherInformationChangeAction,
  OfferAddStayBetweenPrerequisiteAction,
  OfferRemoveStayBetweenPrerequisiteAction,
  OfferChangeStayBetweenPrerequisiteAction,
  OfferSetBooleanPrerequisiteAction,
} from './actions';
import produce from 'immer';
import { IOffer } from 'services/BackendApi';
import { IDateRange } from 'interfaces';

export const offerHotelUuidChangeReducer = (state: IOfferModel, action: OfferHotelUuidChangeAction) => {
  if (!state.offer) {
    state.offer = {} as IOffer;
  }
  return {
    ...state,
    offer: {
      ...state.offer,
      hotelUuid: action.hotelUuid,
    },
  };
};

export const offerNameChangeReducer = (state: IOfferModel, action: OfferNameChangeAction) => {
  if (!state.offer) {
    state.offer = {} as IOffer;
  }
  return {
    ...state,
    offer: {
      ...state.offer,
      name: action.offerName,
    },
  };
};

export const offerTermsChangeReducer = (state: IOfferModel, action: OfferTermsChangeAction) => {
  if (!state.offer) {
    state.offer = {} as IOffer;
  }
  return {
    ...state,
    offer: {
      ...state.offer,
      termsAndConditions: action.offerTerms,
    },
  };
};

export const offerFurtherInformationChangeReducer = (
  state: IOfferModel,
  action: OfferFurtherInformationChangeAction
) => {
  if (!state.offer) {
    state.offer = {} as IOffer;
  }
  return {
    ...state,
    offer: {
      ...state.offer,
      furtherInformation: action.offerFurtherInformation,
    },
  };
};

export const offerAddStayBetweenPrerequisiteReducer = (
  state: IOfferModel,
  action: OfferAddStayBetweenPrerequisiteAction
) => {
  return produce(state, draftState => {
    draftState.offer.prerequisites.dates.push({
      startDate: '',
      endDate: '',
    });
    return draftState;
  });
};

export const offerRemoveStayBetweenPrerequisiteReducer = (
  state: IOfferModel,
  action: OfferRemoveStayBetweenPrerequisiteAction
) => {
  return produce(state, draftState => {
    draftState.offer.prerequisites.dates.splice(action.stayBetweenIndex, 1);
    return draftState;
  });
};

export const offerChangeStayBetweenPrerequisiteReducer = (
  state: IOfferModel,
  action: OfferChangeStayBetweenPrerequisiteAction
) => {
  return produce(state, draftState => {
    action.datesArray.forEach((dates, index) => {
      const newDateRange = {
        startDate: dates[0],
        endDate: dates[dates.length - 1],
      } as IDateRange;

      draftState.offer.prerequisites.dates[index] = newDateRange;
    });

    return draftState;
  });
};

export const offerSetBooleanPrerequisitesReducer = (state: IOfferModel, action: OfferSetBooleanPrerequisiteAction) => {
  return produce(state, draftState => {
    // if value is true or false, make sure we have a payload object, and then set the value inside it
    if (action.value !== null) {
      if (!draftState.offer.prerequisites.payload) {
        draftState.offer.prerequisites.payload = {};
      }

      draftState.offer.prerequisites.payload[action.key] = action.value;
    }

    // if value is null and we HAVE that payload object, delete it from the object
    if (
      action.value === null &&
      draftState.offer.prerequisites.payload &&
      draftState.offer.prerequisites.payload[action.key]
    ) {
      delete draftState.offer.prerequisites.payload[action.key];
    }

    // if we have a payload, but its now empty, remove payload itself
    if (draftState.offer.prerequisites.payload && Object.keys(draftState.offer.prerequisites.payload).length <= 0) {
      delete draftState.offer.prerequisites.payload;
    }

    return draftState;
  });
};
