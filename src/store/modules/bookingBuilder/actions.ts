import {
  Hotel,
  BookingBuilder,
  BookingBuilderResponse,
  TransferReference,
  GuestAges,
  GroundServiceReference,
  FineReference,
  SupplementReference,
  HotelAccommodationProduct,
} from 'services/BackendApi/types';

export const INITIALIZE_BOOKING_BUILDER = 'bookingBuilder/INITIALIZE_BOOKING_BUILDER';
export const INITIALIZE_BOOKING_BUILDER_FAILURE = 'bookingBuilder/INITIALIZE_BOOKING_BUILDER_FAILURE';
export const COPY_BOOKING_BUILDER = 'bookingBuilder/COPY_BOOKING_BUILDER';
export const CREATE_STUB_BOOKING_BUILDER = 'bookingBuilder/CREATE_STUB_BOOKING_BUILDER';
export const CLEAR_BOOKING_BUILDER = 'bookingBuilder/CLEAR_BOOKING_BUILDER';

export const UPDATE_TRANSFER = 'bookingBuilder/UPDATE_TRANSFER';
export const UPDATE_BOOKING_SUCCESS = 'bookingBuilder/UPDATE_BOOKING_SUCCESS';

export const UPDATE_GROUND_SERVICE_ACTION = 'bookingBuilder/UPDATE_GROUND_SERVICE_ACTION';
export const UPDATE_SUPPLEMENT_ACTION = 'bookingBuilder/UPDATE_SUPPLEMENT_ACTION';
export const UPDATE_FINE_ACTION = 'bookingBuilder/UPDATE_FINE_ACTION';
// LODGINGS
export const UPDATE_LODGING_GUEST_AGES_ACTION = 'bookingBuilder/UPDATE_LODGING_GUEST_AGES_ACTION';
export const UPDATE_LODGING_DATES_ACTION = 'bookingBuilder/UPDATE_LODGING_DATES_ACTION';
export const UPDATE_LODGING_MEAL_PLAN_ACTION = 'bookingBuilder/UPDATE_LODGING_MEAL_PLAN_ACTION';
export const REMOVE_LODGING_ACTION = 'bookingBuilder/REMOVE_LODGING_ACTION';
export const UPDATE_LODGING_OCCASIONS_ACTION = 'bookingBuilder/UPDATE_LODGING_OCCASIONS_ACTION';

export const ADD_LODGING_ACTION = 'bookingBuilder/ADD_LODGING_ACTION';

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

export type UpdateTransferAction = ReturnType<typeof updateTransferAction>;
export const updateTransferAction = (transfer: TransferReference, hotelUuid: string) => ({
  type: UPDATE_TRANSFER as typeof UPDATE_TRANSFER,
  transfer,
  hotelUuid,
});

export type UpdateGroundServiceAction = ReturnType<typeof updateGroundServiceAction>;
export const updateGroundServiceAction = (groundService: GroundServiceReference, hotelUuid: string) => ({
  type: UPDATE_GROUND_SERVICE_ACTION as typeof UPDATE_GROUND_SERVICE_ACTION,
  groundService,
  hotelUuid,
});

export type UpdateSupplementAction = ReturnType<typeof updateSupplementAction>;
export const updateSupplementAction = (supplement: SupplementReference, hotelUuid: string) => ({
  type: UPDATE_SUPPLEMENT_ACTION as typeof UPDATE_SUPPLEMENT_ACTION,
  supplement,
  hotelUuid,
});

export type UpdateFineAction = ReturnType<typeof updateFineAction>;
export const updateFineAction = (fine: FineReference, hotelUuid: string) => ({
  type: UPDATE_FINE_ACTION as typeof UPDATE_FINE_ACTION,
  fine,
  hotelUuid,
});

export type UpdateBookingSuccessAction = ReturnType<typeof updateBookingSuccessAction>;
export const updateBookingSuccessAction = (response: BookingBuilderResponse, hotelUuid: string) => ({
  type: UPDATE_BOOKING_SUCCESS as typeof UPDATE_BOOKING_SUCCESS,
  response,
  hotelUuid,
});

export type UpdateLodgingGuestAgesAction = ReturnType<typeof updateLodgingGuestAges>;
export const updateLodgingGuestAges = (hotelUuid: string, lodgingIndex: number, guestAges: GuestAges) => ({
  type: UPDATE_LODGING_GUEST_AGES_ACTION as typeof UPDATE_LODGING_GUEST_AGES_ACTION,
  hotelUuid,
  lodgingIndex,
  guestAges,
});

export type UpdateLodgingMealPlanAction = ReturnType<typeof updateLodgingMealPlan>;
export const updateLodgingMealPlan = (hotelUuid: string, lodgingIndex: number, mealPlanUuids: string[]) => ({
  type: UPDATE_LODGING_MEAL_PLAN_ACTION as typeof UPDATE_LODGING_MEAL_PLAN_ACTION,
  hotelUuid,
  lodgingIndex,
  mealPlanUuids,
});

export type RemoveLodgingAction = ReturnType<typeof removeLodging>;
export const removeLodging = (hotelUuid: string, lodgingIndex: number) => ({
  type: REMOVE_LODGING_ACTION as typeof REMOVE_LODGING_ACTION,
  hotelUuid,
  lodgingIndex,
});

export type UpdateLodgingOccasionsAction = ReturnType<typeof updateLodgingOccasions>;
export const updateLodgingOccasions = (hotelUuid: string, lodgingIndex: number, occasions: object) => ({
  type: UPDATE_LODGING_OCCASIONS_ACTION as typeof UPDATE_LODGING_OCCASIONS_ACTION,
  hotelUuid,
  lodgingIndex,
  occasions,
});

export type UpdateLodgingDatesAction = ReturnType<typeof updateLodgingDates>;
export const updateLodgingDates = (hotelUuid: string, lodgingIndex: number, startDate: string, endDate: string) => ({
  type: UPDATE_LODGING_DATES_ACTION as typeof UPDATE_LODGING_DATES_ACTION,
  hotelUuid,
  lodgingIndex,
  startDate,
  endDate,
});

// add lodgings
export type AddLodgingAction = ReturnType<typeof addLodgingAction>;
export const addLodgingAction = (
  hotelUuid: string,
  accommodationProductUuid: string,
  hotelAccommodationProducts: HotelAccommodationProduct[],
  startDate: string,
  endDate: string
) => ({
  type: ADD_LODGING_ACTION as typeof ADD_LODGING_ACTION,
  hotelUuid,
  accommodationProductUuid,
  hotelAccommodationProducts,
  startDate,
  endDate,
});

export type BookingBuilderAction =
  | InitializeBookingBuilderAction
  | CopyBookingBuilderAction
  | CreateStubBookingBuilderAction
  | ClearBookingBuilderAction
  | UpdateTransferAction
  | UpdateBookingSuccessAction
  | UpdateLodgingGuestAgesAction
  | UpdateLodgingDatesAction
  | UpdateLodgingMealPlanAction
  | RemoveLodgingAction
  | UpdateLodgingOccasionsAction
  | AddLodgingAction
  | UpdateGroundServiceAction
  | UpdateSupplementAction
  | UpdateFineAction;
