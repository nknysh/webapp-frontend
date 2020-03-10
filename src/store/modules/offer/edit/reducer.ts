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
