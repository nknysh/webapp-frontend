import { IOffer, IOfferOnHotelItem, IAccommodationProductForHotelItem } from 'services/BackendApi';
import { IDateRange } from 'interfaces';
import { IApiErrorPayload } from 'services/BackendApi/types/ApiError';

interface KeyValuePair {
  [key: string]: string;
}

export interface IOfferUiState {
  getOfferRequestIsPending: boolean;
  putOfferRequestIsPending: boolean;
  postOfferRequestIsPending: boolean;
  getError: any | null;
  putError: IApiErrorPayload[] | null;
  postError: IApiErrorPayload[] | null;
  isTextOnly: boolean;
}

export interface IOfferModel {
  uiState: IOfferUiState;
  offer: IOffer;
  associatedOffersMapping: KeyValuePair;
  associatedProductsMapping: KeyValuePair;
  offersOnHotel: IOfferOnHotelItem[];
  accommodationProductsForHotel: IAccommodationProductForHotelItem[];
}

export const initialState: IOfferModel = {
  uiState: {
    getOfferRequestIsPending: false,
    putOfferRequestIsPending: false,
    postOfferRequestIsPending: false,
    getError: null,
    putError: null,
    postError: null,
    isTextOnly: true,
  },
  offer: {
    uuid: 'NEW_OFFER',
    name: '',
    termsAndConditions: '',
    furtherInformation: '',
    combines: true,
    hotelUuid: '',
    prerequisites: {
      dates: [] as IDateRange[],
      countryCodes: [] as string[],
      maximumLodgingsInBooking: undefined,
      advance: undefined,
    },
    preDiscount: false,
  } as IOffer,
  associatedOffersMapping: {},
  associatedProductsMapping: {},
  offersOnHotel: [],
  accommodationProductsForHotel: [],
};
