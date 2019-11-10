import axios, { AxiosInstance } from 'axios';
import qs from 'qs';
import { ISearchQuery } from './types/OffersSearch';

export enum BackendEndpoints {
  SEARCH = 'api/search',
}

export class BackendApiService<T extends AxiosInstance> {
  client: T;

  constructor(client: T) {
    this.client = client;
  }

  getOffersSearch = async (query: ISearchQuery): Promise<any> => {
    const endpoint = `${BackendEndpoints.SEARCH}?${qs.stringify(query)}`;
    return this.client.get(endpoint);
  };
}

const client = axios.create({
  baseURL: process.env.BACKEND_BASE_URL,
  withCredentials: true,
});

export default new BackendApiService<AxiosInstance>(client);
