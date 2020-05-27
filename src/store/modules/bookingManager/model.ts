import { IBooking } from 'services/BackendApi';

export interface IBookingManagerDomain {
  booking: IBooking;
  status: string;
}

export interface IBookingLeadGuestInformation {
  guestTitle?: string;
  guestFirstName?: string;
  guestLastName?: string;
  guestEmail?: string;
}

export const initialState: IBookingManagerDomain = {
  booking: {},
  status: 'IDLE',
};
