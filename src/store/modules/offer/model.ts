import { IOffer } from 'services/BackendApi';

export interface IOfferModel {
  getOfferRequestIsPending: boolean;
  error: any | null;
  offer: IOffer | null;
}

export const initialState: IOfferModel = {
  getOfferRequestIsPending: false,
  error: null,
  offer: null,
};
