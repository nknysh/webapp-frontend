import { IOffer } from 'services/BackendApi';

export const GET_OFFER_REQUEST = 'offer/GET_OFFER_REQUEST';
export const GET_OFFER_SUCCESS = 'offer/GET_OFFER_SUCCESS';
export const GET_OFFER_FAILURE = 'offer/GET_OFFER_FAILURE';

export type GetOfferRequestAction = ReturnType<typeof getOfferRequestAction>;
export const getOfferRequestAction = (offerId: string) => ({
  type: GET_OFFER_REQUEST as typeof GET_OFFER_REQUEST,
  offerId,
});

export type GetOfferSuccessAction = ReturnType<typeof getOfferSuccessAction>;
export const getOfferSuccessAction = (offer: IOffer) => ({
  type: GET_OFFER_SUCCESS as typeof GET_OFFER_SUCCESS,
  offer,
});

export type GetOfferFailureAction = ReturnType<typeof getOfferFailureAction>;
export const getOfferFailureAction = (error: any) => ({
  type: GET_OFFER_FAILURE as typeof GET_OFFER_FAILURE,
  error,
});

export type OfferAction = GetOfferRequestAction | GetOfferSuccessAction | GetOfferFailureAction;
