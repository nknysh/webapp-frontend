export interface ITaCountriesUiData {
  [key: string]: {
    total: string;
    countries: ITACountry[];
  };
}

export interface ITACountry {
  label: string;
  region: string;
  value: boolean;
  code: string;
}
