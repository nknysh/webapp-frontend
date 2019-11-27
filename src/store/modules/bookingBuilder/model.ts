import { BookingBuilder } from 'services/BackendApi';

export interface BookingBuilderDomain {
  currentBookingBuilder: BookingBuilder | null;
}

export const initialState: BookingBuilderDomain = {
  currentBookingBuilder: null,
};
