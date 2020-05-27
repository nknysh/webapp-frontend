import {
  IHotel,
  BookingBuilder,
  BookingBuilderResponse,
  TransferReference,
  GuestAges,
  GroundServiceReference,
  FineReference,
  SupplementReference,
  HotelAccommodationProduct,
  ISearchQuery,
} from 'services/BackendApi/types';

import { CustomItemAction } from './subdomains/customItem/actions';

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

export const FORWARDS_COMPAT_BOOKING_BUILDER_ACTION = 'bookingBuilder/FORWARDS_COMPAT_BOOKING_BUILDER_ACTION';

export const UPDATE_TA_MARGIN_TYPE_ACTION = 'bookingBuilder/UPDATE_TA_MARGIN_TYPE_ACTION';
export const UPDATE_TA_MARGIN_AMOUNT_ACTION = 'bookingBuilder/UPDATE_TA_MARGIN_AMOUNT_ACTION';

export const UPDATE_IS_TA_MARGIN_APPLIED_ACTION = 'bookingBuilder/UPDATE_IS_TA_MARGIN_APPLIED_ACTION';

export const UPDATE_BOOKING_GUEST_INFORMATION_ACTION = 'bookingBuilder/UPDATE_BOOKING_GUEST_INFORMATION_ACTION';
export const CLEAR_BOOKING_BUILDER_UI_STATE = 'bookingBuilder/CLEAR_BOOKING_BUILDER_UI_STATE';

export const UPDATE_TRAVEL_AGENT_USER_ID = 'bookingBuilder/UPDATE_TRAVEL_AGENT_USER_ID';

export const UPDATE_LODGING_REPEAT_GUEST_ACTION = 'bookingBuilder/UPDATE_LODGING_REPEAT_GUEST_ACTION';
export const SAVE_CUSTOM_ITEM = 'bookingBuilder/SAVE_CUSTOM_ITEM';
export const REMOVE_CUSTOM_ITEM = 'bookingBuilder/REMOVE_CUSTOM_ITEM';

export const UPDATE_AGREEE_TO_TERMS = 'bookingBuilder/UPDATE_AGREEE_TO_TERMS';
export const SET_IS_PRISTINE = 'bookingBuilder/SET_IS_PRISTINE';
export const SET_LATEST_BOOKING_OPERATION = 'bookingBuilder/SET_LATEST_BOOKING_OPERATION';

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
export const createStubBookingBuilderAction = (hotel: IHotel) => ({
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

export type UpdateLodgingGuestAgesAction = ReturnType<typeof updateLodgingGuestAgesAction>;
export const updateLodgingGuestAgesAction = (hotelUuid: string, lodgingIndex: number, guestAges: GuestAges) => ({
  type: UPDATE_LODGING_GUEST_AGES_ACTION as typeof UPDATE_LODGING_GUEST_AGES_ACTION,
  hotelUuid,
  lodgingIndex,
  guestAges,
});

export type UpdateLodgingMealPlanAction = ReturnType<typeof updateLodgingMealPlanAction>;
export const updateLodgingMealPlanAction = (hotelUuid: string, lodgingIndex: number, mealPlanUuids: string[]) => ({
  type: UPDATE_LODGING_MEAL_PLAN_ACTION as typeof UPDATE_LODGING_MEAL_PLAN_ACTION,
  hotelUuid,
  lodgingIndex,
  mealPlanUuids,
});

export type RemoveLodgingAction = ReturnType<typeof removeLodgingAction>;
export const removeLodgingAction = (hotelUuid: string, lodgingIndex: number) => ({
  type: REMOVE_LODGING_ACTION as typeof REMOVE_LODGING_ACTION,
  hotelUuid,
  lodgingIndex,
});

export type UpdateLodgingOccasionsAction = ReturnType<typeof updateLodgingOccasionsAction>;
export const updateLodgingOccasionsAction = (hotelUuid: string, lodgingIndex: number, occasions: object) => ({
  type: UPDATE_LODGING_OCCASIONS_ACTION as typeof UPDATE_LODGING_OCCASIONS_ACTION,
  hotelUuid,
  lodgingIndex,
  occasions,
});

export type UpdateLodgingDatesAction = ReturnType<typeof updateLodgingDatesAction>;
export const updateLodgingDatesAction = (
  hotelUuid: string,
  lodgingIndex: number,
  startDate: string,
  endDate: string
) => ({
  type: UPDATE_LODGING_DATES_ACTION as typeof UPDATE_LODGING_DATES_ACTION,
  hotelUuid,
  lodgingIndex,
  startDate,
  endDate,
});

// add lodgings
export type AddLodgingAction = ReturnType<typeof addLodgingAction>;
export const addLodgingAction = (
  accommodationProduct: any, // the accommodation product comes from JS land and is a massive nightmare
  searchQuery: ISearchQuery,
  guestAges?: {
    numberOfAdults: number;
    agesOfAllChildren: number[];
  }
) => ({
  type: ADD_LODGING_ACTION as typeof ADD_LODGING_ACTION,
  accommodationProduct,
  searchQuery,
  guestAges,
});

export type ForwardsCompatBookingBuilderAction = ReturnType<typeof forwardsCompatBookingBuilderAction>;
export const forwardsCompatBookingBuilderAction = (booking: any, holds: any) => ({
  type: FORWARDS_COMPAT_BOOKING_BUILDER_ACTION as typeof FORWARDS_COMPAT_BOOKING_BUILDER_ACTION,
  booking,
  holds,
});

export type UpdateTAMarginType = ReturnType<typeof updateTAMarginTypeAction>;
export const updateTAMarginTypeAction = (hotelUuid: string, taMarginType: string) => ({
  type: UPDATE_TA_MARGIN_TYPE_ACTION as typeof UPDATE_TA_MARGIN_TYPE_ACTION,
  hotelUuid,
  taMarginType,
});

export type UpdateTAMarginAmount = ReturnType<typeof updateTAMarginAmountAction>;
export const updateTAMarginAmountAction = (hotelUuid: string, taMarginAmount: string) => ({
  type: UPDATE_TA_MARGIN_AMOUNT_ACTION as typeof UPDATE_TA_MARGIN_AMOUNT_ACTION,
  hotelUuid,
  taMarginAmount,
});

export type UpdateIsTAMarginAppliedAction = ReturnType<typeof updateIsTAMarginAppliedAction>;
export const updateIsTAMarginAppliedAction = (hotelUuid: string, value: boolean) => ({
  type: UPDATE_IS_TA_MARGIN_APPLIED_ACTION as typeof UPDATE_IS_TA_MARGIN_APPLIED_ACTION,
  hotelUuid,
  value,
});

export type UpdateBookingGuestInformationAction = ReturnType<typeof updateBookingGuestInformationAction>;
export const updateBookingGuestInformationAction = (bookingGuestInformation: any) => ({
  type: UPDATE_BOOKING_GUEST_INFORMATION_ACTION as typeof UPDATE_BOOKING_GUEST_INFORMATION_ACTION,
  bookingGuestInformation,
});

export type ResetBookingBuilderUiStateAction = ReturnType<typeof resetBookingBuilderUiStateAction>;
export const resetBookingBuilderUiStateAction = () => ({
  type: CLEAR_BOOKING_BUILDER_UI_STATE as typeof CLEAR_BOOKING_BUILDER_UI_STATE,
});

export type UpdateBookingTravelAgentUserIdAction = ReturnType<typeof updateBookingTravelAgentUserIdAction>;
export const updateBookingTravelAgentUserIdAction = (travelAgentUserUuid: string | null = null) => ({
  type: UPDATE_TRAVEL_AGENT_USER_ID as typeof UPDATE_TRAVEL_AGENT_USER_ID,
  travelAgentUserUuid,
});

export type UpdateLodgingRepeatGuestAction = ReturnType<typeof updateLodgingRepeatGuestAction>;
export const updateLodgingRepeatGuestAction = (hotelUuid: string, lodgingIndex: number, checked: boolean) => ({
  type: UPDATE_LODGING_REPEAT_GUEST_ACTION as typeof UPDATE_LODGING_REPEAT_GUEST_ACTION,
  hotelUuid,
  lodgingIndex,
  checked,
});

export type SaveCustomItemAction = ReturnType<typeof saveCustomItemAction>;
export const saveCustomItemAction = (hotelUuid: string) => ({
  type: SAVE_CUSTOM_ITEM as typeof SAVE_CUSTOM_ITEM,
  hotelUuid,
});

export type RemoveCustomItemAction = ReturnType<typeof removeCustomItemAction>;
export const removeCustomItemAction = (index: number, hotelUuid: string) => ({
  type: REMOVE_CUSTOM_ITEM as typeof REMOVE_CUSTOM_ITEM,
  index,
  hotelUuid,
});

export type UpdateAgreeToTermsAction = ReturnType<typeof updateAgreeToTermsAction>;
export const updateAgreeToTermsAction = (value: boolean) => ({
  type: UPDATE_AGREEE_TO_TERMS as typeof UPDATE_AGREEE_TO_TERMS,
  value,
});

export type SetIsPristineAction = ReturnType<typeof setIsPristineAction>;
export const setIsPristineAction = (value: boolean) => ({
  type: SET_IS_PRISTINE as typeof SET_IS_PRISTINE,
  value,
});

export type SetLatestBookingOperationAction = ReturnType<typeof setLatestBookingOperationAction>;
export const setLatestBookingOperationAction = (operation: string) => ({
  type: SET_LATEST_BOOKING_OPERATION as typeof SET_LATEST_BOOKING_OPERATION,
  operation,
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
  | UpdateFineAction
  | ForwardsCompatBookingBuilderAction
  | UpdateTAMarginType
  | UpdateTAMarginAmount
  | UpdateIsTAMarginAppliedAction
  | UpdateBookingGuestInformationAction
  | ResetBookingBuilderUiStateAction
  | UpdateBookingTravelAgentUserIdAction
  | UpdateLodgingRepeatGuestAction
  | UpdateAgreeToTermsAction
  | SaveCustomItemAction
  | RemoveCustomItemAction
  | SetIsPristineAction
  | SetLatestBookingOperationAction
  | CustomItemAction;
