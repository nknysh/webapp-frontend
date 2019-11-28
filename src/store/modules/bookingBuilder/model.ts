import { BookingBuilder } from 'services/BackendApi';

export interface BookingBuilderDomain {
  currentBookingBuilder: BookingBuilder | null;
  hotelUuid: string | null;
}

export const initialState: BookingBuilderDomain = {
  currentBookingBuilder: null,
  hotelUuid: null,
};
