import { IOfferOnHotelItem, IAccommodationProductForHotelItem, IOfferUI } from 'services/BackendApi';
import { IDateRange } from 'interfaces';
import { IApiErrorPayload } from 'services/BackendApi/types/ApiError';

interface KeyValuePair {
  [key: string]: string;
}

export type ICombinationMode =
  | 'COMBINES_WITH_ANY'
  | 'COMBINES_WITH_NONE'
  | 'COMBINES_WITH_LIST'
  | 'CANNOT_COMBINE_WITH_LIST';

export interface IOfferUiState {
  getOfferRequestIsPending: boolean;
  putOfferRequestIsPending: boolean;
  postOfferRequestIsPending: boolean;
  getError: any | null;
  putError: IApiErrorPayload[] | null;
  postError: IApiErrorPayload[] | null;
  isTextOnly: boolean;
  taCountryAccordianKeys: string[];
  combinationMode: ICombinationMode;
  combinationList: string[];
}

export interface IOfferModel {
  uiState: IOfferUiState;
  offer: IOfferUI;
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
    taCountryAccordianKeys: [],
    combinationMode: 'COMBINES_WITH_ANY',
    combinationList: [],
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
    stepping: undefined,
    preDiscount: false,
  } as IOfferUI,
  associatedOffersMapping: {},
  associatedProductsMapping: {},
  offersOnHotel: [],
  accommodationProductsForHotel: [],
};
