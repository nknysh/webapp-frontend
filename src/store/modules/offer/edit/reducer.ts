import { IOfferModel } from '../model';
import {
  EditOfferHotelUuidChangeAction,
  EditOfferNameChangeAction,
  EditOfferTermsChangeAction,
  EditOfferFurtherInformationChangeAction,
  EditOfferAddStayBetweenPrerequisiteAction,
  EditOfferRemoveStayBetweenPrerequisiteAction,
} from './actions';
import produce from 'immer';

export const editOfferHotelUuidReducer = (state: IOfferModel, action: EditOfferHotelUuidChangeAction) => {
  return produce(state, draftState => {
    if (draftState.offer) {
      draftState.offer.hotelUuid = action.hotelUuid;
    }
    return draftState;
  });
};

export const editOfferNameReducer = (state: IOfferModel, action: EditOfferNameChangeAction) => {
  return produce(state, draftState => {
    if (draftState.offer) {
      draftState.offer.name = action.offerName;
    }
    return draftState;
  });
};

export const editOfferTermsReducer = (state: IOfferModel, action: EditOfferTermsChangeAction) => {
  return produce(state, draftState => {
    if (draftState.offer) {
      draftState.offer.termsAndConditions = action.offerTerms;
    }
    return draftState;
  });
};

export const editOfferFurtherInformationReducer = (
  state: IOfferModel,
  action: EditOfferFurtherInformationChangeAction
) => {
  return produce(state, draftState => {
    if (draftState.offer) {
      draftState.offer.furtherInformation = action.offerFurtherInformation;
    }
    return draftState;
  });
};

export const editOfferAddStayBetweenPrerequisiteReducer = (
  state: IOfferModel,
  action: EditOfferAddStayBetweenPrerequisiteAction
) => {
  return produce(state, draftState => {
    if (draftState.offer) {
      draftState.offer.prerequisites.dates.push({
        startDate: '',
        endDate: '',
      });
    }
    return draftState;
  });
};

export const editOfferRemoveStayBetweenPrerequisiteReducer = (
  state: IOfferModel,
  action: EditOfferRemoveStayBetweenPrerequisiteAction
) => {
  return produce(state, draftState => {
    if (draftState.offer) {
      draftState.offer.prerequisites.dates.splice(action.stayBetweenIndex, 1);
    }
    return draftState;
  });
};
