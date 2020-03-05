import { IOffer, IOfferOnHotelItem } from 'services/BackendApi';

interface KeyValuePair {
  [key: string]: string;
}

export interface IOfferModel {
  getOfferRequestIsPending: boolean;
  error: any | null;
  offer: IOffer | null;
  associatedOffersMapping: KeyValuePair;
  associatedProductsMapping: KeyValuePair;
  offersOnHotel: IOfferOnHotelItem[];
}

export const initialState: IOfferModel = {
  getOfferRequestIsPending: true,
  error: null,
  offer: null,
  associatedOffersMapping: {},
  associatedProductsMapping: {},
  offersOnHotel: [],
};
