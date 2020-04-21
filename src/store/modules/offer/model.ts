import {
  IOfferOnHotelItem,
  IAccommodationProductForHotelItem,
  IOfferUI,
  IProduct,
  IAccomodationProductOptions,
  ITransferProductOptions,
  IMealPlanProductOptions,
  IHotel,
} from 'services/BackendApi';
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

export interface OrderedOffer {
  uuid: string;
  name: string;
  selected?: boolean;
}

export interface IOfferUiState {
  getOfferRequestIsPending: boolean;
  putOfferRequestIsPending: boolean;
  postOfferRequestIsPending: boolean;
  postOffersOrderRequestIsPending: boolean;
  getError: any | null;
  putError: IApiErrorPayload[] | null;
  postError: IApiErrorPayload[] | null;
  postOffersOrderError: IApiErrorPayload[] | null;
  showSuccessConfirmation: boolean;
  isTextOnly: boolean;
  taCountryAccordianKeys: string[];
  combinationMode: ECombinationMode;
  combinationOfferUuids: string[];
  orderedOffersList: OrderedOffer[];
  isPristine: boolean;
  ageNameAccordianKeys: string[];
}

export interface IHotelAvailableProducts {
  accommodationProducts: IProduct<IAccomodationProductOptions>[];
  fineProducts: IProduct<{}>[];
  transferProducts: IProduct<ITransferProductOptions>[];
  groundServiceProducts: IProduct<{}>[];
  mealPlanProducts: IProduct<IMealPlanProductOptions>[];
  supplementProducts: IProduct<any>[];
}

export interface IOfferModel {
  uiState: IOfferUiState;
  offer: IOfferUI;
  associatedOffersMapping: KeyValuePair;
  associatedProductsMapping: KeyValuePair;
  offersOnHotel: IOfferOnHotelItem[];
  accomodationProductsForHotel?: IAccommodationProductForHotelItem[];
  availableProducts: IHotelAvailableProducts;
}

export const initialState: IOfferModel = {
  uiState: {
    getOfferRequestIsPending: false,
    putOfferRequestIsPending: false,
    postOfferRequestIsPending: false,
    postOffersOrderRequestIsPending: false,
    showSuccessConfirmation: false,
    getError: null,
    putError: null,
    postError: null,
    postOffersOrderError: null,
    isTextOnly: false,
    taCountryAccordianKeys: [],
    combinationMode: ECombinationMode.COMBINES_WITH_ANY,
    combinationOfferUuids: [],
    orderedOffersList: [],
    isPristine: true,
    ageNameAccordianKeys: [],
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
      stayLength: undefined,
    },
    stepping: undefined,
    preDiscount: false,
    subProductDiscounts: {},
    productDiscounts: {},
    combinesWith: [],
    cannotCombineWith: [],
    order: Infinity,
    hotel: {} as IHotel,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  associatedOffersMapping: {},
  associatedProductsMapping: {},
  offersOnHotel: [],
  accomodationProductsForHotel: [],
  availableProducts: {
    accommodationProducts: [],
    fineProducts: [],
    transferProducts: [],
    groundServiceProducts: [],
    mealPlanProducts: [],
    supplementProducts: [],
  },
};
