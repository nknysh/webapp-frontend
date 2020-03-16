import { OfferAction } from './subdomains/offer/actions';
import { OfferUiStateAction } from './subdomains/uiState/actions';
import { IOffer } from 'services/BackendApi';
import { IApiErrorPayload } from 'services/BackendApi/types/ApiError';

export const GET_OFFER_REQUEST = 'offer/GET_OFFER_REQUEST';
export const GET_OFFER_SUCCESS = 'offer/GET_OFFER_SUCCESS';
export const GET_OFFER_FAILURE = 'offer/GET_OFFER_FAILURE';

export const PUT_OFFER_REQUEST = 'offer/PUT_OFFER_REQUEST';
export const PUT_OFFER_SUCCESS = 'offer/PUT_OFFER_SUCCESS';
export const PUT_OFFER_FAILURE = 'offer/PUT_OFFER_FAILURE';

export const POST_OFFER_REQUEST = 'offer/POST_OFFER_REQUEST';
export const POST_OFFER_SUCCESS = 'offer/POST_OFFER_SUCCESS';
export const POST_OFFER_FAILURE = 'offer/POST_OFFER_FAILURE';

export const RESET_OFFER_MODULE = 'offer/RESET_OFFER_MODULE';

export type GetOfferRequestAction = ReturnType<typeof getOfferRequestAction>;
export const getOfferRequestAction = (offerId: string, shouldFetchHotelAccommodationProducts: boolean = false) => ({
  type: GET_OFFER_REQUEST as typeof GET_OFFER_REQUEST,
  offerId,
  shouldFetchHotelAccommodationProducts,
});

export type GetOfferSuccessAction = ReturnType<typeof getOfferSuccessAction>;
export const getOfferSuccessAction = (
  offer: IOffer,
  associatedOffersMapping,
  associatedProductsMapping,
  offersOnHotel,
  isTextOnly,
  accommodationProductsForHotel
) => ({
  type: GET_OFFER_SUCCESS as typeof GET_OFFER_SUCCESS,
  offer,
  associatedOffersMapping,
  associatedProductsMapping,
  offersOnHotel,
  isTextOnly,
  accommodationProductsForHotel,
});

export type GetOfferFailureAction = ReturnType<typeof getOfferFailureAction>;
export const getOfferFailureAction = (error: any) => ({
  type: GET_OFFER_FAILURE as typeof GET_OFFER_FAILURE,
  error,
});

export type PutOfferRequestAction = ReturnType<typeof putOfferRequestAction>;
export const putOfferRequestAction = () => ({
  type: PUT_OFFER_REQUEST as typeof PUT_OFFER_REQUEST,
});

export type PutOfferSuccessAction = ReturnType<typeof putOfferSuccessAction>;
export const putOfferSuccessAction = (offer: any) => ({
  type: PUT_OFFER_SUCCESS as typeof PUT_OFFER_SUCCESS,
  offer,
});

export type PutOfferFailureAction = ReturnType<typeof putOfferFailureAction>;
export const putOfferFailureAction = (errors: IApiErrorPayload[]) => ({
  type: PUT_OFFER_FAILURE as typeof PUT_OFFER_FAILURE,
  errors,
});

export type PostOfferRequestAction = ReturnType<typeof postOfferRequestAction>;
export const postOfferRequestAction = (history: any) => ({
  type: POST_OFFER_REQUEST as typeof POST_OFFER_REQUEST,
  history,
});

export type PostOfferSuccessAction = ReturnType<typeof postOfferSuccessAction>;
export const postOfferSuccessAction = (offer: any) => ({
  type: POST_OFFER_SUCCESS as typeof POST_OFFER_SUCCESS,
  offer,
});

export type PostOfferFailureAction = ReturnType<typeof postOfferFailureAction>;
export const postOfferFailureAction = (errors: IApiErrorPayload[]) => ({
  type: POST_OFFER_FAILURE as typeof POST_OFFER_FAILURE,
  errors,
});

export type ResetOfferModuleAction = ReturnType<typeof resetOfferModuleAction>;
export const resetOfferModuleAction = () => ({
  type: RESET_OFFER_MODULE as typeof RESET_OFFER_MODULE,
});

export type OfferDomainAction =
  | OfferAction
  | OfferUiStateAction
  | GetOfferRequestAction
  | GetOfferSuccessAction
  | GetOfferFailureAction
  | PutOfferRequestAction
  | PutOfferSuccessAction
  | PutOfferFailureAction
  | PostOfferRequestAction
  | PostOfferSuccessAction
  | PostOfferFailureAction
  | ResetOfferModuleAction;

export * from './subdomains/offer/actions';
export * from './subdomains/uiState/actions';
