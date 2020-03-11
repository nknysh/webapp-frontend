import { OfferAction } from './subdomains/offer/actions';
import { OfferUiStateAction } from './subdomains/uiState/actions';
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

export type OfferDomainAction =
  | OfferAction
  | OfferUiStateAction
  | GetOfferRequestAction
  | GetOfferSuccessAction
  | GetOfferFailureAction;

export * from './subdomains/offer/actions';
