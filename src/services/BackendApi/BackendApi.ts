import axios, { AxiosInstance, AxiosResponse } from 'axios';
import qs from 'qs';
import { SearchQuery, ErrorResponse, SearchOptionsResponse } from './types';
export enum BackendEndpoints {
  SEARCH_OPTIONS = 'api/search/options',
  SEARCH = 'api/search',
}

export class BackendApiService<T extends AxiosInstance> {
  client: T;

  constructor(client: T) {
    this.client = client;
  }

  getSearchOptions = async (): Promise<AxiosResponse<SearchOptionsResponse>> =>
    this.client.get(BackendEndpoints.SEARCH_OPTIONS);

  getOffersSearch = async (query: SearchQuery): Promise<AxiosResponse<ErrorResponse | ErrorResponse>> => {
    const endpoint = `${BackendEndpoints.SEARCH}?${qs.stringify(query)}`;
    return this.client.get(endpoint);
  };
}

const client = axios.create({
  baseURL: process.env.BACKEND_BASE_URL,
  withCredentials: true,
});

export default new BackendApiService<AxiosInstance>(client);
