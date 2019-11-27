import { Hotel, BookingBuilder } from 'services/BackendApi';

export const INITIALIZE_BOOKING_BUILDER = 'bookingBuilder/INITIALIZE_BOOKING_BUILDER';
export const INITIALIZE_BOOKING_BUILDER_FAILURE = 'bookingBuilder/INITIALIZE_BOOKING_BUILDER_FAILURE';
export const COPY_BOOKING_BUILDER = 'bookingBuilder/COPY_BOOKING_BUILDER';
export const CREATE_STUB_BOOKING_BUILDER = 'bookingBuilder/CREATE_STUB_BOOKING_BUILDER';
export const CLEAR_BOOKING_BUILDER = 'bookingBuilder/CLEAR_BOOKING_BUILDER';

export type InitializeBookingBuilderAction = ReturnType<typeof initializeBookingBuilderAction>;
export const initializeBookingBuilderAction = (hotelUuid: string) => ({
  type: INITIALIZE_BOOKING_BUILDER as typeof INITIALIZE_BOOKING_BUILDER,
  hotelUuid,
});

export type InitializeBookingBuilderFailureAction = ReturnType<typeof initializeBookingBuilderFailureAction>;
export const initializeBookingBuilderFailureAction = () => ({
  type: INITIALIZE_BOOKING_BUILDER_FAILURE as typeof INITIALIZE_BOOKING_BUILDER_FAILURE,
});

export type CopyBookingBuilderAction = ReturnType<typeof copyBookingBuilderAction>;
export const copyBookingBuilderAction = (bookingBuilder: BookingBuilder) => ({
  type: COPY_BOOKING_BUILDER as typeof COPY_BOOKING_BUILDER,
  bookingBuilder,
});

export type CreateStubBookingBuilderAction = ReturnType<typeof createStubBookingBuilderAction>;
export const createStubBookingBuilderAction = (hotel: Hotel) => ({
  type: CREATE_STUB_BOOKING_BUILDER as typeof CREATE_STUB_BOOKING_BUILDER,
  hotel,
});

export type ClearBookingBuilderAction = ReturnType<typeof clearBookingBuilderAction>;
export const clearBookingBuilderAction = () => ({
  type: CLEAR_BOOKING_BUILDER as typeof CLEAR_BOOKING_BUILDER,
});

export type BookingBuilderAction =
  | InitializeBookingBuilderAction
  | CopyBookingBuilderAction
  | CreateStubBookingBuilderAction
  | ClearBookingBuilderAction;
