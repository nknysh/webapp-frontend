import { BookingBuilder } from 'services/BackendApi';

export interface BookingBuilderDomain {
  currentBookingBuilder: BookingBuilder | null;
  hotelUuid: string | null;

  // these are here for forward compat reasons
  // they were found by loading up a booking and seeing what was inside the base booking data object
  uuid: string | null;
  checkInDate: string | null;
  checkOutDate: string | null;
  numAdults: number | null;
  agesOfAllChildren: number[];
  guestTitle: string | null;
  guestFirstName: string | null;
  guestLastName: string | null;
  guestEmail: string | null;
  isRepeatGuest: boolean;
  specialRequests: string[];
  comments: string | null;
  status: string | null;
  flightArrivalDate: string | null;
  flightArrivalNumber: string | null;
  flightDepartureDate: string | null;
  flightDepartureNumber: string | null;
  travelAgentUserUuid: string | null;
  proposalUuid: string | null;
  bookingHash: string | null;
  hotelName: string | null;
  overrideTotal: any | null;
  bookingComments: any | null;
  internalComments: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  deletedAt: any | null;
  clientUuid: any | null;
  isTAMarginApplied: boolean;
  taMarginType: string | undefined;
  taMarginAmount: string | undefined;
}

export const initialState: BookingBuilderDomain = {
  currentBookingBuilder: null,
  hotelUuid: null,

  // these are here for forward compat reasons
  // they were found by loading up a booking and seeing what was inside the base booking data object
  uuid: null,
  checkInDate: null,
  checkOutDate: null,
  numAdults: null,
  agesOfAllChildren: [],
  guestTitle: null,
  guestFirstName: null,
  guestLastName: null,
  guestEmail: null,
  isRepeatGuest: false,
  specialRequests: [],
  comments: null,
  taMarginType: 'percentage',
  taMarginAmount: '0',
  status: null,
  flightArrivalDate: null,
  flightArrivalNumber: null,
  flightDepartureDate: null,
  flightDepartureNumber: null,
  travelAgentUserUuid: null,
  proposalUuid: null,
  bookingHash: null,
  hotelName: null,
  overrideTotal: null,
  bookingComments: null,
  internalComments: null,
  createdAt: null,
  updatedAt: null,
  deletedAt: null,
  clientUuid: null,
  isTAMarginApplied: true,
};
