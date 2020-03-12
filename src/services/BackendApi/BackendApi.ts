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
import { PriceRange, StarRating } from './types/SearchQuery';
import { Hotel, IBooking } from './types/OffersSearchResponse';
import { IBookingAttributes, IBookingInformation, IReviewBookingSchema } from 'interfaces';
import { BookingBuilderDomain } from 'store/modules/bookingBuilder';
import { getBookingInformationForBooking } from '../../utils/bookingBuilder';
import { IProposalsListResponse } from './types/ProposalsListResponse';
import { IBookingsListResponse } from './types/BookingsListResponse';
import { ITravelAgentRespone } from './types/TravelAgentResponse';
import { IHotelNamesResponse } from './types/HotelNamesResponse';
import { IOffersListResponse, IOffersDeleteResponse } from './types/OffersListResponse';
import { IOfferResponse } from './types/OfferResponse';

export enum BackendEndpoints {
  SEARCH_OPTIONS = 'search/options',
  SEARCH = 'search',
  NAMES = 'search/names',
  BOOKING_BUILDER = 'booking-builder',
  HOTEL = 'hotels',
  BOOKINGS = 'bookings',
  PROPOSALS = 'proposals',
  AUTH0_LOGIN = 'users/auth0/login',
  OFFERS = 'offers',
  PRODUCTS = 'products',
  COUNTRIES = 'countries',
}

export class BackendApiService<T extends AxiosInstance> {
  client: T;

  constructor(client: T) {
    this.client = client;
  }

  getSearchOptions = async (): Promise<AxiosResponse<SearchOptionsResponse>> =>
    this.client.get(BackendEndpoints.SEARCH_OPTIONS);

  getOffersSearch = async (query: SearchQuery): Promise<AxiosResponse<OffersSearchSuccessResponse | ErrorResponse>> => {
    const endpoint = `${BackendEndpoints.SEARCH}`;
    return this.client.get(endpoint, { params: query });
  };

  getNamesSearch = async (name: string): Promise<AxiosResponse<ErrorResponse | ErrorResponse>> => {
    const endpoint = `${BackendEndpoints.NAMES}/?name=${encodeURI(name)}`;
    return this.client.get(endpoint);
  };

  getHotel = async (hotelUuid: string): Promise<AxiosResponse<Hotel | ErrorResponse>> => {
    const endpoint = `${BackendEndpoints.HOTEL}/${hotelUuid}`;
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

  getAvailableProposals = async () => {
    const endpoint = `proposals/available`;
    return this.client.get(endpoint);
  };

  getProposalsList = async (query): Promise<AxiosResponse<IProposalsListResponse>> => {
    const endpoint = `${BackendEndpoints.PROPOSALS}`;
    return this.client.get(endpoint, { params: query });
  };

  getBookingsList = async (query): Promise<AxiosResponse<IBookingsListResponse>> => {
    const endpoint = `${BackendEndpoints.BOOKINGS}`;
    return this.client.get(endpoint, { params: query });
  };

  getTravelAgents = async (): Promise<AxiosResponse<ITravelAgentRespone>> => {
    const endpoint = `/users?filter[user][type]=ta`;
    return this.client.get(endpoint);
  };

  getHotelsAsHotelNames = async (): Promise<AxiosResponse<IHotelNamesResponse>> => {
    const endpoint = `/hotels?fields[hotel]=uuid,name&sort=hotel.name`;
    return this.client.get(endpoint);
  };

  getOffersAsUuidAndName = async (uuids: string[]): Promise<AxiosResponse> => {
    const filter = uuids.map(uuid => `filter[offer][uuid:in][]=${uuid}`).join('&');
    const endpoint = `${BackendEndpoints.OFFERS}?fields[offer]=uuid,name&${filter}`;
    return this.client.get(endpoint);
  };

  getOffersForHotel = async (hotelUuid: string): Promise<AxiosResponse> => {
    const endpoint = `${BackendEndpoints.OFFERS}?fields[offer]=uuid,name,order&filter[offer][hotelUuid]=${hotelUuid}`;
    return this.client.get(endpoint);
  };

  getProductsAsUuidAndName = async (uuids: string[]): Promise<AxiosResponse> => {
    const filter = uuids.map(uuid => `filter[product][uuid:in][]=${uuid}`).join('&');
    const endpoint = `${BackendEndpoints.PRODUCTS}?fields[product]=uuid,name&${filter}`;
    return this.client.get(endpoint);
  };

  getOffersList = async (query): Promise<AxiosResponse<IOffersListResponse>> => {
    const endpoint = `${BackendEndpoints.OFFERS}`;
    return this.client.get(endpoint, { params: query });
  };

  deleteOffers = async (uuids): Promise<AxiosResponse<IOffersDeleteResponse> | undefined> => {
    if (uuids.length <= 0) {
      return;
    }

    let query = '?';
    query += uuids.map(uuid => `filter[offer][uuid:id][]=${uuid}`).join('&');

    const endpoint = `${BackendEndpoints.OFFERS}${query}`;
    return this.client.delete(endpoint);
  };

  getOffer = async (uuid: string): Promise<AxiosResponse<IOfferResponse>> => {
    // TODO: This really should take a params object, but this API makesa it really difficult to type properly.
    const endpoint = `${BackendEndpoints.OFFERS}/${uuid}?associations=hotel&fields[hotel]=name`;
    return this.client.get(endpoint);
  };

  getBootstrapCountries = async (): Promise<AxiosResponse> => {
    const endpoint = `${BackendEndpoints.COUNTRIES}`;
    return this.client.get(endpoint);
  };

  sanitizQueryObject = (query: SearchQuery): SearchQuery => {
    // Convery any strings that should be integers to integers
    // qs seem to not handle stings containing '+' correctly
    const sanitizeStarRatings = (sr: string[]) =>
      sr.map((rating: string) => (rating === '5 ' ? StarRating.FiveStarPlus : (rating as StarRating)));
    const sanitizeAges = (ages: string[]) => ages.map(age => parseInt(age, 10));
    const sanitizeNumberOfAdults = (s: string) => parseInt(s, 10);
    const sanitizePricePrange = (pr: PriceRange) => ({
      min: pr.min ? parseInt((<unknown>pr.min) as string, 10) : undefined,
      max: pr.max ? parseInt((<unknown>pr.max) as string, 10) : undefined,
    });

    const sanitized = {
      ...query,
      startDate: query.startDate.split('T')[0],
      endDate: query.endDate.split('T')[0],
      name: query.name === ALL_COUNTRIES_AND_RESORTS ? '' : query.name,
      priceRange: query.priceRange ? sanitizePricePrange(query.priceRange) : { min: 0, max: 100000 },
      mealPlanCategories: without(['Any' as MealPlanNames], query.mealPlanCategories || []),
      starRatings: query.starRatings ? sanitizeStarRatings(query.starRatings) : [],
      lodgings: query.lodgings.map(lodging => ({
        ...lodging,
        agesOfAllChildren: sanitizeAges(((<unknown>lodging.agesOfAllChildren) as string[] | undefined) || []),
        numberOfAdults: sanitizeNumberOfAdults((<unknown>lodging.numberOfAdults) as string),
      })),
    };

    return sanitized;
  };

  postBookingSave = async (
    bookingAttributes: IBookingAttributes
  ): Promise<AxiosResponse<BookingBuilderResponse | ErrorResponse>> => {
    const endpoint = `${BackendEndpoints.BOOKINGS}`;

    const tempPayloadShape = {
      data: {
        attributes: {
          ...bookingAttributes,
        },
      },
    };
    return this.client.post(endpoint, tempPayloadShape);
  };

  postBookingSaveAndTakeHolds = async (
    bookingAttributes: IBookingAttributes
  ): Promise<AxiosResponse<BookingBuilderResponse | ErrorResponse>> => {
    const endpoint = `${BackendEndpoints.BOOKINGS}`;

    const tempPayloadShape = {
      data: {
        attributes: {
          ...bookingAttributes,
          placeHolds: true,
        },
      },
    };
    return this.client.post(endpoint, tempPayloadShape);
  };

  addBookingToProposal = async (proposalUuid: string, bookingUuid: string): Promise<AxiosResponse> => {
    const endpoint = `proposals/${proposalUuid}/bookings/${bookingUuid}`;

    return this.client.post(endpoint);
  };

  addHoldToBooking = async (
    bookingUuid: string,
    holdHours: string | number | undefined = undefined
  ): Promise<AxiosResponse> => {
    const endpoint = `${BackendEndpoints.BOOKINGS}/${bookingUuid}/holds`;

    if (holdHours) {
      return this.client.post(endpoint, {
        data: {
          attributes: {
            holdHours,
          },
        },
      });
    } else {
      return this.client.post(endpoint, {
        data: {
          attributes: {},
        },
      });
    }
  };

  releaseHoldFromBooking = async (bookingUuid: string): Promise<AxiosResponse> => {
    const endpoint = `${BackendEndpoints.BOOKINGS}/${bookingUuid}/holds`;

    return this.client.delete(endpoint);
  };

  requestToBook = async (booking: BookingBuilderDomain): Promise<AxiosResponse> => {
    const endpoint = `${BackendEndpoints.BOOKINGS}/${booking.uuid}/request`;

    const bookingInformation: IBookingInformation = getBookingInformationForBooking(booking);

    // the endpoint doesn't want these things
    delete bookingInformation.taMarginAmount;
    delete bookingInformation.taMarginType;
    delete bookingInformation.proposalUuid;

    return this.client.post(endpoint, {
      data: {
        attributes: {
          bookingInformation,
        },
      },
    });
  };

  cancelBooking = async (booking: BookingBuilderDomain | IBooking): Promise<AxiosResponse> => {
    const endpoint = `${BackendEndpoints.BOOKINGS}/${booking.uuid}/cancel`;

    return this.client.post(endpoint, {
      data: {
        attributes: {
          uuid: booking.uuid,
        },
      },
    });
  };

  reviewBooking = async (bookingUuid: string, updatingBookingData: IReviewBookingSchema): Promise<AxiosResponse> => {
    const endpoint = `${BackendEndpoints.BOOKINGS}/${bookingUuid}/review`;

    if (updatingBookingData.bookingComments == '') {
      updatingBookingData.bookingComments = undefined;
    }
    if (updatingBookingData.internalComments == '') {
      updatingBookingData.internalComments = undefined;
    }

    return this.client.post(endpoint, {
      data: {
        attributes: {
          ...updatingBookingData,
        },
      },
    });
  };

  updateHoldHoursForBooking = async (bookingUuid: string, holdHours: string): Promise<AxiosResponse> => {
    const endpoint = `${BackendEndpoints.BOOKINGS}/${bookingUuid}/holds`;

    return this.client.post(endpoint, {
      data: {
        attributes: {
          holdHours: parseInt(holdHours, 10),
        },
      },
    });
  };
}

export const makeBackendApi = (actingCountryCode: string): BackendApiService<AxiosInstance> => {
  const client = axios.create({
    baseURL: process.env.BACKEND_BASE_URL,
    withCredentials: true,
    paramsSerializer: params => {
      return qs.stringify(params);
    },
  });

  client.defaults.params = {
    actingCountryCode: actingCountryCode,
  };

  return new BackendApiService<AxiosInstance>(client);
};
