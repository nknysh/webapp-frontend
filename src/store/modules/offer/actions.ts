import { IOffer } from 'services/BackendApi';

import {
  OfferHotelUuidChangeAction,
  OfferNameChangeAction,
  OfferTermsChangeAction,
  OfferFurtherInformationChangeAction,
  OfferAddStayBetweenPrerequisiteAction,
  OfferRemoveStayBetweenPrerequisiteAction,
  OfferChangeStayBetweenPrerequisiteAction,
  OfferSetBooleanPrerequisiteAction,
  OfferSetPreDiscountAction,
} from './edit/actions';

export const GET_OFFER_REQUEST = 'offer/GET_OFFER_REQUEST';
export const GET_OFFER_SUCCESS = 'offer/GET_OFFER_SUCCESS';
export const GET_OFFER_FAILURE = 'offer/GET_OFFER_FAILURE';

export const SET_OFFER_IS_TEXT_ONLY = 'offer/SET_OFFER_IS_TEXT_ONLY';

export type GetOfferRequestAction = ReturnType<typeof getOfferRequestAction>;
export const getOfferRequestAction = (offerId: string) => ({
  type: GET_OFFER_REQUEST as typeof GET_OFFER_REQUEST,
  offerId,
});

export type GetOfferSuccessAction = ReturnType<typeof getOfferSuccessAction>;
export const getOfferSuccessAction = (
  offer: IOffer,
  associatedOffersMapping,
  associatedProductsMapping,
  offersOnHotel,
  isTextOnly
) => ({
  type: GET_OFFER_SUCCESS as typeof GET_OFFER_SUCCESS,
  offer,
  associatedOffersMapping,
  associatedProductsMapping,
  offersOnHotel,
  isTextOnly,
});

export type GetOfferFailureAction = ReturnType<typeof getOfferFailureAction>;
export const getOfferFailureAction = (error: any) => ({
  type: GET_OFFER_FAILURE as typeof GET_OFFER_FAILURE,
  error,
});

export type SetOfferIsTextOnly = ReturnType<typeof setOfferIsTextOnly>;
export const setOfferIsTextOnly = (value: boolean) => ({
  type: SET_OFFER_IS_TEXT_ONLY as typeof SET_OFFER_IS_TEXT_ONLY,
  value,
});

export type OfferAction =
  | GetOfferRequestAction
  | GetOfferSuccessAction
  | GetOfferFailureAction
  | OfferHotelUuidChangeAction
  | OfferNameChangeAction
  | OfferTermsChangeAction
  | OfferFurtherInformationChangeAction
  | OfferAddStayBetweenPrerequisiteAction
  | OfferRemoveStayBetweenPrerequisiteAction
  | OfferChangeStayBetweenPrerequisiteAction
  | OfferSetBooleanPrerequisiteAction
  | OfferSetPreDiscountAction
  | SetOfferIsTextOnly;
