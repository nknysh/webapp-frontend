import axios, { AxiosInstance } from 'axios';
import qs from 'qs';
import { SearchQuery } from './types/SearchQuery';
import { SearchErrorResponse } from './types/OffersSearchResponse';
import { OptionsResponse } from './types/OptionsResponse';

export enum BackendEndpoints {
  OPTIONS = 'api/options',
  SEARCH = 'api/search',
}

export class BackendApiService<T extends AxiosInstance> {
  client: T;

  constructor(client: T) {
    this.client = client;
  }

  getOptions = async (): Promise<OptionsResponse> => this.client.get(BackendEndpoints.OPTIONS);

  getOffersSearch = async (query: SearchQuery): Promise<SearchErrorResponse | SearchErrorResponse> => {
    const endpoint = `${BackendEndpoints.SEARCH}?kjhkjhk${qs.stringify(query)}`;
    return this.client.get(endpoint);
  };
}

const client = axios.create({
  baseURL: process.env.BACKEND_BASE_URL,
  withCredentials: true,
});

export default new BackendApiService<AxiosInstance>(client);
