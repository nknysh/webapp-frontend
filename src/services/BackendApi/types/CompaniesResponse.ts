export interface ICompany {
  uuid: string;
  name: string;
  countryCode: string;
  address: string;
  phoneNumber: string;
  website: string;
  createdAt: string;
  updatedAt: string;
}
export interface ICompaniesResponse {
  meta: {
    type: string;
    total: number;
    // TODO: array of what is it? always empty:/
    associations?: any[];
  };
  data: ICompany[];
}
