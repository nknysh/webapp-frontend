import { IBooking, ENetworkRequestStatus } from 'services/BackendApi';
export interface IBookingManagerDomain {
  booking: IBooking;
  networkRequests: IBookingManagerDomainNetworkRequests;
}

export interface IBookingManagerDomainNetworkRequests {
  bookingLoad: ENetworkRequestStatus;
  requestToBook: ENetworkRequestStatus;
  confirm: ENetworkRequestStatus;
  cancel: ENetworkRequestStatus;
}

export interface IBookingLeadGuestInformation {
  guestTitle?: string;
  guestFirstName?: string;
  guestLastName?: string;
  guestEmail?: string;
}

export const initialState: IBookingManagerDomain = {
  booking: {},
  networkRequests: {
    bookingLoad: ENetworkRequestStatus.IDLE,
    requestToBook: ENetworkRequestStatus.IDLE,
    confirm: ENetworkRequestStatus.IDLE,
    cancel: ENetworkRequestStatus.IDLE,
  },
};
