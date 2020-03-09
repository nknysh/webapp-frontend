import { IOffer, IOfferOnHotelItem, IPrerequisiteDate } from 'services/BackendApi';

interface KeyValuePair {
  [key: string]: string;
}

export interface IOfferModel {
  getOfferRequestIsPending: boolean;
  error: any | null;
  offer: IOffer;
  associatedOffersMapping: KeyValuePair;
  associatedProductsMapping: KeyValuePair;
  offersOnHotel: IOfferOnHotelItem[];
}

export const initialState: IOfferModel = {
  getOfferRequestIsPending: true,
  error: null,
  offer: {
    prerequisites: {
      dates: [] as IPrerequisiteDate[],
    },
  } as IOffer,
  associatedOffersMapping: {},
  associatedProductsMapping: {},
  offersOnHotel: [],
};
