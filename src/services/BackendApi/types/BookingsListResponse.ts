export enum EBookingStatus {
  POTENTIAL = 'potential',
  REQUESTED = 'requested',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',

  // from https://www.figma.com/file/EnOPBWYY4NGcr6AMIDHZ00/Bookings?node-id=29%3A0
  PAYMENT = 'payment',
  COMPLETE = 'complete',
}

export interface IBookingBooking {
  uuid: string;
  hotelUuid: string;
}

export interface IBookingUser {
  uuid: string;
  title: string;
  firstName: string;
  lastName: string;
}

export interface IBookingsListItem {
  uuid: string;
  humanReadableId: string;
  checkInDate: string;
  checkOutDate: string;
  guestTitle: string;
  guestFirstName: string;
  guestLastName: string;
  guestEmail: string;
  isRepeatGuest: string;
  specialRequests: string;
  comments: string;
  taMarginType: string;
  taMarginAmount: string;
  status: EBookingStatus;
  flightArrivalDate: string;
  flightArrivalNumber: string;
  flightDepartureDate: string;
  flightDepartureNumber: string;
  travelAgentUserUuid: string;
  proposalUuid: string;
  bookingHash: string;
  hotelName: string;
  hotelUuid: string;
  overrideTotal: string;
  bookingComments: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  clientUuid: string;
  travelAgent: Partial<IBookingUser>;
}

export interface IBookingsListResponseMeta {
  type: 'booking';
  total: number;
  associations: string[];
}

export interface IBookingsListResponse {
  meta: IBookingsListResponseMeta;
  data: IBookingsListItem[];
}
