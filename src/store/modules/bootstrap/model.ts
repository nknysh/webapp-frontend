export interface IBootstrapCountry {
  code: string;
  name: string;
  region: string;
  isDestination: boolean;
}

export interface IBootstrapHotel {
  uuid: string;
  name: string;
  countryCode: string;
}

export interface IBootstrapExtraPersonSupplementProduct {
  uuid: string;
  name: string;
}

export interface IBootstrapModule {
  countries: IBootstrapCountry[];
  hotels: IBootstrapHotel[];
  extraPersonSupplementProduct: IBootstrapExtraPersonSupplementProduct;
  error: any;
}

export const initialState: IBootstrapModule = {
  countries: [],
  hotels: [],
  extraPersonSupplementProduct: {
    uuid: '',
    name: '',
  },
  error: null,
};
