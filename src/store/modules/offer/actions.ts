import { OfferAction } from './subdomains/offer/actions';
import { OfferUiStateAction } from './subdomains/uiState/actions';
import { IOffer } from 'services/BackendApi';

export const GET_OFFER_REQUEST = 'offer/GET_OFFER_REQUEST';
export const GET_OFFER_SUCCESS = 'offer/GET_OFFER_SUCCESS';
export const GET_OFFER_FAILURE = 'offer/GET_OFFER_FAILURE';

export const OFFER_SAVE_EDITS_REQUEST = 'offer/OFFER_SAVE_EDITS_REQUEST';
export const OFFER_SAVE_EDITS_SUCCESS = 'offer/OFFER_SAVE_EDITS_SUCCESS';
export const OFFER_SAVE_EDITS_FAILURE = 'offer/OFFER_SAVE_EDITS_FAILURE';

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

export type OfferDomainAction =
  | OfferAction
  | OfferUiStateAction
  | GetOfferRequestAction
  | GetOfferSuccessAction
  | GetOfferFailureAction;

export * from './subdomains/offer/actions';
