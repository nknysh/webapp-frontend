import { IOffer } from 'services/BackendApi';

export interface IOfferModel {
  getOfferRequestIsPending: boolean;
  error: any | null;
  offer: IOffer | null;
  associatedOffersMapping: any;
  associatedProductsMapping: any;
  offersOnHotel: any;
}

export const initialState: IOfferModel = {
  getOfferRequestIsPending: true,
  error: null,
  offer: null,
  associatedOffersMapping: {},
  associatedProductsMapping: {},
  offersOnHotel: [],
};
