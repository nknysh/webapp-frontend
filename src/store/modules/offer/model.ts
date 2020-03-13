import { IOffer, IOfferOnHotelItem, IAccommodationProductForHotelItem } from 'services/BackendApi';
import { IDateRange } from 'interfaces';

interface KeyValuePair {
  [key: string]: string;
}

export interface IOfferUiState {
  getOfferRequestIsPending: boolean;
  error: any | null;
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
    getOfferRequestIsPending: true,
    error: null,
    isTextOnly: true,
  },
  offer: {
    uuid: '',
    name: '',
    termsAndConditions: '',
    furtherInformation: '',
    hotelUuid: '',
    prerequisites: {
      dates: [] as IDateRange[],
      countryCodes: [] as string[],
    },
    preDiscount: false,
  } as IOffer,
  associatedOffersMapping: {},
  associatedProductsMapping: {},
  offersOnHotel: [],
  accommodationProductsForHotel: [],
};
