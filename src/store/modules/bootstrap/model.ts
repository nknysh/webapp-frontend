export interface IBootstrapCountry {
  code: string;
  name: string;
  isDestination: boolean;
}

export interface IBootstrapHotel {
  uuid: string;
  name: string;
}

export interface IBootstrapModule {
  countries: IBootstrapCountry[];
  hotels: IBootstrapHotel[];
}

export const initialState: IBootstrapModule = {
  countries: [],
  hotels: [],
};
