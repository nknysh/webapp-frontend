import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { without } from 'ramda';
import qs from 'qs';
import {
  SearchQuery,
  OffersSearchSuccessResponse,
  MealPlanNames,
  ErrorResponse,
  SearchOptionsResponse,
  BookingBuilderRequest,
  BookingBuilderResponse,
} from './types';

// Move to backkendApiService
import { ALL_COUNTRIES_AND_RESORTS } from 'store/modules/fastSearch';

export enum BackendEndpoints {
  SEARCH_OPTIONS = 'api/search/options',
  SEARCH = 'api/search',
  NAMES = 'api/search/names',
  BOOKING_BUILDER = 'api/booking-builder',
}

export class BackendApiService<T extends AxiosInstance> {
  client: T;

  constructor(client: T) {
    this.client = client;
  }

  getSearchOptions = async (): Promise<AxiosResponse<SearchOptionsResponse>> =>
    this.client.get(BackendEndpoints.SEARCH_OPTIONS);

  getOffersSearch = async (query: SearchQuery): Promise<AxiosResponse<OffersSearchSuccessResponse | ErrorResponse>> => {
    const endpoint = `${BackendEndpoints.SEARCH}?${qs.stringify(query)}`;
    return this.client.get(endpoint);
  };

  getNamesSearch = async (name: string): Promise<AxiosResponse<ErrorResponse | ErrorResponse>> => {
    const endpoint = `${BackendEndpoints.NAMES}/?name=${encodeURI(name)}`;
    return this.client.get(endpoint);
  };

  postBookingBuilderRequest = async (
    bookingBuilderRequest: BookingBuilderRequest
  ): Promise<AxiosResponse<BookingBuilderResponse | ErrorResponse>> => {
    const endpoint = `${BackendEndpoints.BOOKING_BUILDER}`;

    const tempPayloadShape = {
      data: {
        attributes: {
          ...bookingBuilderRequest,
        },
      },
    };
    return this.client.post(endpoint, tempPayloadShape);
  };

  sanitizQuery = (query: SearchQuery): SearchQuery => {
    const s = {
      ...query,
      startDate: query.startDate.split('T')[0],
      endDate: query.endDate.split('T')[0],
      name: query.name === ALL_COUNTRIES_AND_RESORTS ? '' : query.name,
      mealPlanCategories: without([MealPlanNames.ANY], query.mealPlanCategories || []),
    };
    console.log('sanitized', query, s);
    return s;
  };
}

const client = axios.create({
  baseURL: process.env.BACKEND_BASE_URL,
  withCredentials: true,
});

export default new BackendApiService<AxiosInstance>(client);
