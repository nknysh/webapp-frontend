import { IOfferModel } from '../model';
import {
  OfferHotelUuidChangeAction,
  OfferNameChangeAction,
  OfferTermsChangeAction,
  OfferFurtherInformationChangeAction,
  OfferAddStayBetweenPrerequisiteAction,
  OfferRemoveStayBetweenPrerequisiteAction,
  OfferChangeStayBetweenPrerequisiteAction,
} from './actions';
import produce from 'immer';
import { IOffer } from 'services/BackendApi';

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
    // no dates got sent - do nothing.
    if (action.dates.length <= 0) {
      return draftState;
    } else if (action.dates.length === 1) {
      // exactly 1 date means that no end date is set
      draftState.offer.prerequisites.dates[action.stayBetweenIndex].startDate = action.dates[0];
      draftState.offer.prerequisites.dates[action.stayBetweenIndex].endDate = '';
    } else {
      // 2 or more dates means we have both a start and an end date
      draftState.offer.prerequisites.dates[action.stayBetweenIndex].startDate = action.dates[0];
      draftState.offer.prerequisites.dates[action.stayBetweenIndex].endDate = action.dates[action.dates.length - 1];
    }

    return draftState;
  });
};
