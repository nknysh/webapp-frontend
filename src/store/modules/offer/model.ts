import { IOfferOnHotelItem, IAccommodationProductForHotelItem, IOfferUI } from 'services/BackendApi';
import { IDateRange } from 'interfaces';
import { IApiErrorPayload } from 'services/BackendApi/types/ApiError';

interface KeyValuePair {
  [key: string]: string;
}

export enum ECombinationMode {
  COMBINES_WITH_ANY = 'COMBINES_WITH_ANY',
  COMBINES_WITH_NONE = 'COMBINES_WITH_NONE',
  COMBINES_WITH_LIST = 'COMBINES_WITH_LIST',
  CANNOT_COMBINE_WITH_LIST = 'CANNOT_COMBINE_WITH_LIST',
}

export const CombinationModeOptions: { [key in ECombinationMode]: string } = {
  [ECombinationMode.COMBINES_WITH_ANY]: 'Combines with any other offer',
  [ECombinationMode.COMBINES_WITH_NONE]: 'Does not combine with any offers',
  [ECombinationMode.COMBINES_WITH_LIST]: 'Exclusively combines with the offers selected',
  [ECombinationMode.CANNOT_COMBINE_WITH_LIST]: 'Combines with any offers EXCEPT the ones selected',
};

export interface IOfferUiState {
  getOfferRequestIsPending: boolean;
  putOfferRequestIsPending: boolean;
  postOfferRequestIsPending: boolean;
  getError: any | null;
  putError: IApiErrorPayload[] | null;
  postError: IApiErrorPayload[] | null;
  isTextOnly: boolean;
  taCountryAccordianKeys: string[];
  combinationMode: ECombinationMode;
  combinationOfferUuids: string[];
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
    combinationMode: ECombinationMode.COMBINES_WITH_ANY,
    combinationOfferUuids: [],
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
