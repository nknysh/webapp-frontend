import { IOffer, IOfferOnHotelItem } from 'services/BackendApi';
import { IDateRange } from 'interfaces';

interface KeyValuePair {
  [key: string]: string;
}

export interface IOfferModel {
  getOfferRequestIsPending: boolean;
  error: any | null;
  isTextOnly: boolean;
  offer: IOffer;
  associatedOffersMapping: KeyValuePair;
  associatedProductsMapping: KeyValuePair;
  offersOnHotel: IOfferOnHotelItem[];
}

export const initialState: IOfferModel = {
  getOfferRequestIsPending: true,
  error: null,
  isTextOnly: false,
  offer: {
    uuid: '',
    name: '',
    termsAndConditions: '',
    furtherInformation: '',
    hotelUuid: '',
    prerequisites: {
      dates: [] as IDateRange[],
    },
    preDiscount: false,
  } as IOffer,
  associatedOffersMapping: {},
  associatedProductsMapping: {},
  offersOnHotel: [],
};
