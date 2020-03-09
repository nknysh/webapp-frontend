import { IOfferModel } from '../model';
import {
  EditOfferHotelUuidChangeAction,
  EditOfferNameChangeAction,
  EditOfferTermsChangeAction,
  EditOfferFurtherInformationChangeAction,
} from './actions';

export const editOfferHotelUuidReducer = (state: IOfferModel, action: EditOfferHotelUuidChangeAction) => {
  return {
    ...state,
    offer: {
      ...state.offer,
      hotelUuid: action.hotelUuid,
    },
  };
};

export const editOfferNameReducer = (state: IOfferModel, action: EditOfferNameChangeAction) => {
  return {
    ...state,
    offer: {
      ...state.offer,
      name: action.offerName,
    },
  };
};

export const editOfferTermsReducer = (state: IOfferModel, action: EditOfferTermsChangeAction) => {
  return {
    ...state,
    offer: {
      ...state.offer,
      termsAndConditions: action.offerTerms,
    },
  };
};

export const editOfferFurtherInformationReducer = (
  state: IOfferModel,
  action: EditOfferFurtherInformationChangeAction
) => {
  return {
    ...state,
    offer: {
      ...state.offer,
      furtherInformation: action.offerFurtherInformation,
    },
  };
};
