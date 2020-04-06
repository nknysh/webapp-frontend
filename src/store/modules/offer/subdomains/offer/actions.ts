import {
  IOfferPrerequisitesPayload,
  IUIOfferProductDiscountInstance,
  IOfferProductDiscountInstance,
  IOfferProductDiscounts,
  IDiscountProduct,
} from 'services/BackendApi';
import { IHotel } from 'services/BackendApi/types/HotelResponse';
import { IOfferSubProductDiscounts } from '../../../../../services/BackendApi/types/OfferResponse';

export const OFFER_HOTEL_UUID_CHANGE = 'offer/OFFER_HOTEL_UUID_CHANGE'; // In create mode, this will trigger a saga to load hotel data
export const OFFER_HOTEL_UUID_CHANGE_SUCCESS = 'offer/OFFER_HOTEL_UUID_CHANGE_SUCCESS';

export const OFFER_NAME_CHANGE = 'offer/OFFER_NAME_CHANGE';
export const OFFER_TERMS_CHANGE = 'offer/OFFER_TERMS_CHANGE';
export const OFFER_FURTHER_INFORMATION_CHANGE = 'offer/OFFER_FURTHER_INFORMATION_CHANGE';
export const OFFER_ADD_STAY_BETWEEN_PREREQUISITE = 'offer/OFFER_ADD_STAY_BETWEEN_PREREQUISITE';
export const OFFER_REMOVE_STAY_BETWEEN_PREREQUISITE = 'offer/OFFER_REMOVE_STAY_BETWEEN_PREREQUISITE';
export const OFFER_CHANGE_STAY_BETWEEN_PREREQUISITE = 'offer/OFFER_CHANGE_STAY_BETWEEN_PREREQUISITE';
export const OFFER_SET_PRE_DISCOUNT = 'offer/OFFER_SET_PRE_DISCOUNT';
export const OFFER_SET_BOOLEAN_PREREQUISITE = 'offer/OFFER_SET_BOOLEAN_PREREQUISITE';
export const OFFER_SET_COUNTRY_CODE_PREREQUISITE = 'offer/OFFER_SET_COUNTRY_CODE_PREREQUISITE';
export const OFFER_CLEAR_ALL_COUNTRY_CODE_PREREQUISITE = 'offer/OFFER_CLEAR_ALL_COUNTRY_CODE_PREREQUISITE';

export const OFFER_SET_ACCOMMODATION_PRODUCT_PREREQUISITE = 'offer/OFFER_SET_ACCOMMODATION_PRODUCT_PREREQUISITE';
export const OFFER_CLEAR_ALL_ACCOMMODATION_PRODUCT_PREREQUISITE =
  'offer/OFFER_CLEAR_ALL_ACCOMMODATION_PRODUCT_PREREQUISITE';

export const OFFER_SET_ADVANCE_BOOK_BY_PREREQUISITE = 'offer/OFFER_SET_ADVANCE_BOOK_BY_PREREQUISITE';
export const OFFER_SET_ADVANCE_MINIMUM_PREREQUISITE = 'offer/OFFER_SET_ADVANCE_MINIMUM_PREREQUISITE';
export const OFFER_SET_ADVANCE_MAXIMUM_PREREQUISITE = 'offer/OFFER_SET_ADVANCE_MAXIMUM_PREREQUISITE';
export const OFFER_CLEAR_ALL_ADVANCE_PREREQUISITE = 'offer/OFFER_CLEAR_ALL_ADVANCE_PREREQUISITE';
export const OFFER_SET_MAX_LODGINGS_PREREQUISITE = 'offer/OFFER_SET_MAX_LODGINGS_PREREQUISITE';

export const OFFER_SET_STAY_LENGTH_MINIMUM_PREREQUISITE = 'offer/OFFER_SET_STAY_LENGTH_MINIMUM_PREREQUISITE';
export const OFFER_SET_STAY_LENGTH_MAXIMUM_PREREQUISITE = 'offer/OFFER_SET_STAY_LENGTH_MAXIMUM_PREREQUISITE';
export const OFFER_SET_STAY_LENGTH_STRICT_PREREQUISITE = 'offer/OFFER_SET_STAY_LENGTH_STRICT_PREREQUISITE';
export const OFFER_CLEAR_ALL_STAY_LENGTH_PREREQUISITE = 'offer/OFFER_CLEAR_ALL_STAY_LENGTH_PREREQUISITE';

export const OFFER_SET_STEPPING_EVERY_X_NIGHTS_APPLICATION = 'offer/OFFER_SET_STEPPING_EVERY_X_NIGHTS_APPLICATION';
export const OFFER_SET_STEPPING_APPLY_TO_APPLICATION = 'offer/OFFER_SET_STEPPING_APPLY_TO_APPLICATION';
export const OFFER_SET_STEPPING_MAXIMUM_NIGHTS_APPLICATION = 'offer/OFFER_SET_STEPPING_MAXIMUM_NIGHTS_APPLICATION';
export const OFFER_SET_STEPPING_DISCOUNT_CHEAPEST_APPLICATION =
  'offer/OFFER_SET_STEPPING_DISCOUNT_CHEAPEST_APPLICATION';
export const OFFER_CLEAR_ALL_STEPPING_APPLICATION = 'offer/OFFER_CLEAR_ALL_STEPPING_APPLICATION';

export const OFFER_SET_ACCOMMODATION_DISCOUNT_DISCOUNT_PERCENTAGE_APPLICATION =
  'offer/OFFER_SET_ACCOMMODATION_DISCOUNT_DISCOUNT_PERCENTAGE_APPLICATION';
export const OFFER_SET_ACCOMMODATION_DISCOUNT_GREEN_TAX_APPROACH_APPLICATION =
  'offer/OFFER_SET_ACCOMMODATION_DISCOUNT_GREEN_TAX_APPROACH_APPLICATION';
export const OFFER_CLEAR_ALL_ACCOMMODATION_DISCOUNT_APPLICATION =
  'offer/OFFER_CLEAR_ALL_ACCOMMODATION_DISCOUNT_APPLICATION';

export const OFFER_ADD_PRODUCT_DISCOUNT = 'offer/ADD_PRODUCT_DISCOUNT';
export const OFFER_UPDATE_PRODUCT_DISCOUNT = 'offer/UPDATE_PRODUCT_DISCOUNT';
export const OFFER_REMOVE_PRODUCT_DISCOUNT = 'offer/OFFER_REMOVE_PRODUCT_DISCOUNT';
export const OFFER_ADD_PRODUCT_TO_PRODUCT_DISCOUNT = 'offer/ADD_PRODUCT_TO_PRODUCT_DISCOUNT';
export const OFFER_REMOVE_PRODUCT_FROM_PRODUCT_DISCOUNT = 'offer/REMOVE_PRODUCT_FROM_PRODUCT_DISCOUNT';
export const OFFER_TOGGLE_PRODUCT_DISCOUNT_AGENAME = 'offer/OFFER_TOGGLE_PRODUCT_DISCOUNT_AGENAME';

export const OFFER_ADD_SUB_PRODUCT_DISCOUNT = 'offer/ADD_SUB_PRODUCT_DISCOUNT';
export const OFFER_UPDATE_SUB_PRODUCT_DISCOUNT = 'offer/UPDATE_SUB_PRODUCT_DISCOUNT';
export const OFFER_REMOVE_SUB_PRODUCT_DISCOUNT = 'offer/OFFER_REMOVE_SUB_PRODUCT_DISCOUNT';
export const OFFER_ADD_PRODUCT_TO_SUB_PRODUCT_DISCOUNT = 'offer/ADD_PRODUCT_TO_SUB_PRODUCT_DISCOUNT';
export const OFFER_REMOVE_PRODUCT_FROM_SUB_PRODUCT_DISCOUNT = 'offer/REMOVE_PRODUCT_FROM_SUB_PRODUCT_DISCOUNT';
export const OFFER_TOGGLE_SUB_PRODUCT_DISCOUNT_AGENAME = 'offer/OFFER_TOGGLE_SUB_PRODUCT_DISCOUNT_AGENAME';

export const OFFER_TOGGLE_PRODUCT_ON_PRODUCT_DISCOUNT = 'offer/OFFER_TOGGLE_PRODUCT_ON_PRODUCT_DISCOUNT';
export const OFFER_TOGGLE_PRODUCT_ON_SUB_PRODUCT_DISCOUNT = 'offer/OFFER_TOGGLE_PRODUCT_ON_SUB_PRODUCT_DISCOUNT';

export type OfferHotelUuidChangeAction = ReturnType<typeof offerHotelUuidChangeAction>;
export const offerHotelUuidChangeAction = (hotelUuid: string) => ({
  type: OFFER_HOTEL_UUID_CHANGE as typeof OFFER_HOTEL_UUID_CHANGE,
  hotelUuid,
});

export type OfferHotelUuidChangeSuccessAction = ReturnType<typeof offerHotelUuidChangeSuccessAction>;
export const offerHotelUuidChangeSuccessAction = (data: IHotel) => ({
  type: OFFER_HOTEL_UUID_CHANGE_SUCCESS as typeof OFFER_HOTEL_UUID_CHANGE_SUCCESS,
  data,
});

export type OfferNameChangeAction = ReturnType<typeof offerNameChangeAction>;
export const offerNameChangeAction = (offerName: string) => ({
  type: OFFER_NAME_CHANGE as typeof OFFER_NAME_CHANGE,
  offerName,
});

export type OfferTermsChangeAction = ReturnType<typeof offerTermsChangeAction>;
export const offerTermsChangeAction = (offerTerms: string) => ({
  type: OFFER_TERMS_CHANGE as typeof OFFER_TERMS_CHANGE,
  offerTerms,
});

export type OfferFurtherInformationChangeAction = ReturnType<typeof offerFurtherInformationChangeAction>;
export const offerFurtherInformationChangeAction = (offerFurtherInformation: string) => ({
  type: OFFER_FURTHER_INFORMATION_CHANGE as typeof OFFER_FURTHER_INFORMATION_CHANGE,
  offerFurtherInformation,
});

export type OfferAddStayBetweenPrerequisiteAction = ReturnType<typeof offerAddStayBetweenPrerequisiteAction>;
export const offerAddStayBetweenPrerequisiteAction = () => ({
  type: OFFER_ADD_STAY_BETWEEN_PREREQUISITE as typeof OFFER_ADD_STAY_BETWEEN_PREREQUISITE,
});

export type OfferRemoveStayBetweenPrerequisiteAction = ReturnType<typeof offerRemoveStayBetweenPrerequisiteAction>;
export const offerRemoveStayBetweenPrerequisiteAction = (stayBetweenIndex: number) => ({
  type: OFFER_REMOVE_STAY_BETWEEN_PREREQUISITE as typeof OFFER_REMOVE_STAY_BETWEEN_PREREQUISITE,
  stayBetweenIndex,
});

export type OfferChangeStayBetweenPrerequisiteAction = ReturnType<typeof offerChangeStayBetweenPrerequisiteAction>;
export const offerChangeStayBetweenPrerequisiteAction = (datesArray: string[][]) => ({
  type: OFFER_CHANGE_STAY_BETWEEN_PREREQUISITE as typeof OFFER_CHANGE_STAY_BETWEEN_PREREQUISITE,
  datesArray,
});

export type OfferSetBooleanPrerequisiteAction = ReturnType<typeof offerSetBooleanPrerequisiteAction>;
export const offerSetBooleanPrerequisiteAction = (key: keyof IOfferPrerequisitesPayload, value: boolean | null) => ({
  type: OFFER_SET_BOOLEAN_PREREQUISITE as typeof OFFER_SET_BOOLEAN_PREREQUISITE,
  key,
  value,
});

export type OfferSetPreDiscountAction = ReturnType<typeof offerSetPreDiscountAction>;
export const offerSetPreDiscountAction = (value: boolean) => ({
  type: OFFER_SET_PRE_DISCOUNT as typeof OFFER_SET_PRE_DISCOUNT,
  value,
});

export type OfferSetCountryCodePrerequisiteAction = ReturnType<typeof offerSetCountryCodePrerequisiteAction>;
export const offerSetCountryCodePrerequisiteAction = (countryCode: string, value: boolean) => ({
  type: OFFER_SET_COUNTRY_CODE_PREREQUISITE as typeof OFFER_SET_COUNTRY_CODE_PREREQUISITE,
  countryCode,
  value,
});

export type OfferClearAllCountryCodePrerequisiteAction = ReturnType<typeof offerClearAllCountryCodePrerequisiteAction>;
export const offerClearAllCountryCodePrerequisiteAction = () => ({
  type: OFFER_CLEAR_ALL_COUNTRY_CODE_PREREQUISITE as typeof OFFER_CLEAR_ALL_COUNTRY_CODE_PREREQUISITE,
});

export type OfferSetAccommodationProductPrerequisiteAction = ReturnType<
  typeof offerSetAccommodationProductPrerequisiteAction
>;
export const offerSetAccommodationProductPrerequisiteAction = (accommodationProductUuid: string, value: boolean) => ({
  type: OFFER_SET_ACCOMMODATION_PRODUCT_PREREQUISITE as typeof OFFER_SET_ACCOMMODATION_PRODUCT_PREREQUISITE,
  accommodationProductUuid,
  value,
});

export type OfferClearAllAccommodationProductPrerequisiteAction = ReturnType<
  typeof offerClearAllAccommodationProductPrerequisiteAction
>;
export const offerClearAllAccommodationProductPrerequisiteAction = () => ({
  type: OFFER_CLEAR_ALL_ACCOMMODATION_PRODUCT_PREREQUISITE as typeof OFFER_CLEAR_ALL_ACCOMMODATION_PRODUCT_PREREQUISITE,
});

export type OfferSetAdvanceBookByPrerequisiteAction = ReturnType<typeof offerSetAdvanceBookByPrerequisiteAction>;
export const offerSetAdvanceBookByPrerequisiteAction = (value: string | undefined) => ({
  type: OFFER_SET_ADVANCE_BOOK_BY_PREREQUISITE as typeof OFFER_SET_ADVANCE_BOOK_BY_PREREQUISITE,
  value,
});

export type OfferSetAdvanceMinimumPrerequisiteAction = ReturnType<typeof offerSetAdvanceMinimumPrerequisiteAction>;
export const offerSetAdvanceMinimumPrerequisiteAction = (value: number | undefined) => ({
  type: OFFER_SET_ADVANCE_MINIMUM_PREREQUISITE as typeof OFFER_SET_ADVANCE_MINIMUM_PREREQUISITE,
  value,
});

export type OfferSetAdvanceMaximumPrerequisiteAction = ReturnType<typeof offerSetAdvanceMaximumPrerequisiteAction>;
export const offerSetAdvanceMaximumPrerequisiteAction = (value: number | undefined) => ({
  type: OFFER_SET_ADVANCE_MAXIMUM_PREREQUISITE as typeof OFFER_SET_ADVANCE_MAXIMUM_PREREQUISITE,
  value,
});

export type OfferClearAllAdvancePrerequisiteAction = ReturnType<typeof offerClearAllAdvancePrerequisiteAction>;
export const offerClearAllAdvancePrerequisiteAction = () => ({
  type: OFFER_CLEAR_ALL_ADVANCE_PREREQUISITE as typeof OFFER_CLEAR_ALL_ADVANCE_PREREQUISITE,
});

export type OfferSetMaxLodgingsPrerequisiteAction = ReturnType<typeof offerSetMaxLodgingsPrerequisiteAction>;
export const offerSetMaxLodgingsPrerequisiteAction = (value: number | undefined) => ({
  type: OFFER_SET_MAX_LODGINGS_PREREQUISITE as typeof OFFER_SET_MAX_LODGINGS_PREREQUISITE,
  value,
});

export type OfferSetStayLengthMinimumPrerequisiteAction = ReturnType<
  typeof offerSetStayLengthMinimumPrerequisiteAction
>;
export const offerSetStayLengthMinimumPrerequisiteAction = (value: number | undefined) => ({
  type: OFFER_SET_STAY_LENGTH_MINIMUM_PREREQUISITE as typeof OFFER_SET_STAY_LENGTH_MINIMUM_PREREQUISITE,
  value,
});

export type OfferSetStayLengthMaximumPrerequisiteAction = ReturnType<
  typeof offerSetStayLengthMaximumPrerequisiteAction
>;
export const offerSetStayLengthMaximumPrerequisiteAction = (value: number | undefined) => ({
  type: OFFER_SET_STAY_LENGTH_MAXIMUM_PREREQUISITE as typeof OFFER_SET_STAY_LENGTH_MAXIMUM_PREREQUISITE,
  value,
});

export type OfferSetStayLengthStrictPrerequisiteAction = ReturnType<typeof offerSetStayLengthStrictPrerequisiteAction>;
export const offerSetStayLengthStrictPrerequisiteAction = (value: boolean | undefined) => ({
  type: OFFER_SET_STAY_LENGTH_STRICT_PREREQUISITE as typeof OFFER_SET_STAY_LENGTH_STRICT_PREREQUISITE,
  value,
});

export type OfferClearAllStayLengthPrerequisiteAction = ReturnType<typeof offerClearAllStayLengthPrerequisiteAction>;
export const offerClearAllStayLengthPrerequisiteAction = () => ({
  type: OFFER_CLEAR_ALL_STAY_LENGTH_PREREQUISITE as typeof OFFER_CLEAR_ALL_STAY_LENGTH_PREREQUISITE,
});

export type OfferSetSteppingEveryXNightsApplicationAction = ReturnType<
  typeof offerSetSteppingEveryXNightsApplicationAction
>;
export const offerSetSteppingEveryXNightsApplicationAction = (value: number) => ({
  type: OFFER_SET_STEPPING_EVERY_X_NIGHTS_APPLICATION as typeof OFFER_SET_STEPPING_EVERY_X_NIGHTS_APPLICATION,
  value,
});

export type OfferSetSteppingApplyToApplicationAction = ReturnType<typeof offerSetSteppingApplyToApplicationAction>;
export const offerSetSteppingApplyToApplicationAction = (value: number) => ({
  type: OFFER_SET_STEPPING_APPLY_TO_APPLICATION as typeof OFFER_SET_STEPPING_APPLY_TO_APPLICATION,
  value,
});

export type OfferSetSteppingMaximumNightsApplicationAction = ReturnType<
  typeof offerSetSteppingMaximumNightsApplicationAction
>;
export const offerSetSteppingMaximumNightsApplicationAction = (value: number | undefined) => ({
  type: OFFER_SET_STEPPING_MAXIMUM_NIGHTS_APPLICATION as typeof OFFER_SET_STEPPING_MAXIMUM_NIGHTS_APPLICATION,
  value,
});

export type OfferSetSteppingDiscountCheapestApplicationAction = ReturnType<
  typeof offerSetSteppingDiscountCheapestApplicationAction
>;
export const offerSetSteppingDiscountCheapestApplicationAction = (value: boolean | undefined) => ({
  type: OFFER_SET_STEPPING_DISCOUNT_CHEAPEST_APPLICATION as typeof OFFER_SET_STEPPING_DISCOUNT_CHEAPEST_APPLICATION,
  value,
});

export type OfferClearAllSteppingApplicationAction = ReturnType<typeof offerClearAllSteppingApplicationAction>;
export const offerClearAllSteppingApplicationAction = () => ({
  type: OFFER_CLEAR_ALL_STEPPING_APPLICATION as typeof OFFER_CLEAR_ALL_STEPPING_APPLICATION,
});

export type OfferSetAccommodationDiscountDiscountPercentageAction = ReturnType<
  typeof offerSetAccommodationDiscountDiscountPercentageAction
>;
export const offerSetAccommodationDiscountDiscountPercentageAction = (value: number) => ({
  type: OFFER_SET_ACCOMMODATION_DISCOUNT_DISCOUNT_PERCENTAGE_APPLICATION as typeof OFFER_SET_ACCOMMODATION_DISCOUNT_DISCOUNT_PERCENTAGE_APPLICATION,
  value,
});

export type OfferSetAccommodationDiscountGreenTaxApproachAction = ReturnType<
  typeof offerSetAccommodationDiscountGreenTaxApproachAction
>;
export const offerSetAccommodationDiscountGreenTaxApproachAction = (value: string | undefined) => ({
  type: OFFER_SET_ACCOMMODATION_DISCOUNT_GREEN_TAX_APPROACH_APPLICATION as typeof OFFER_SET_ACCOMMODATION_DISCOUNT_GREEN_TAX_APPROACH_APPLICATION,
  value,
});

export type OfferClearAllAccommodationDiscountAction = ReturnType<typeof offerClearAllAccommodationDiscountAction>;
export const offerClearAllAccommodationDiscountAction = () => ({
  type: OFFER_CLEAR_ALL_ACCOMMODATION_DISCOUNT_APPLICATION as typeof OFFER_CLEAR_ALL_ACCOMMODATION_DISCOUNT_APPLICATION,
});

// Product Discounts
export type OfferAddProductDiscountAction = ReturnType<typeof offerAddProductDiscountAction>;
export const offerAddProductDiscountAction = (
  discountType: keyof IOfferProductDiscounts<IOfferProductDiscountInstance>
) => ({
  type: OFFER_ADD_PRODUCT_DISCOUNT as typeof OFFER_ADD_PRODUCT_DISCOUNT,
  discountType,
});

export type EditableProductDiscountField = keyof Omit<IUIOfferProductDiscountInstance, 'uuid' | 'products'>;
export type OfferUpdateProductDiscountAction = ReturnType<typeof offerUpdateProductDiscountAction>;
export const offerUpdateProductDiscountAction = (
  discountType: keyof IOfferProductDiscounts<IOfferProductDiscountInstance>,
  uuid: string,
  key: EditableProductDiscountField,
  newValue: string | boolean,
  currentValue: number | string | boolean | undefined
) => ({
  type: OFFER_UPDATE_PRODUCT_DISCOUNT as typeof OFFER_UPDATE_PRODUCT_DISCOUNT,
  discountType,
  uuid,
  key,
  newValue,
  currentValue,
});

export type OfferRemoveProductDiscountAction = ReturnType<typeof offerRemoveProductDiscountAction>;
export const offerRemoveProductDiscountAction = (
  discountType: keyof IOfferProductDiscounts<IOfferProductDiscountInstance>,
  uuid: string
) => ({
  type: OFFER_REMOVE_PRODUCT_DISCOUNT as typeof OFFER_REMOVE_PRODUCT_DISCOUNT,
  discountType,
  uuid,
});

export type OfferAddProductToProductDiscountAction = ReturnType<typeof offerAddProductToProductDiscountAction>;
export const offerAddProductToProductDiscountAction = (
  discountType: keyof IOfferProductDiscounts<IOfferProductDiscountInstance>,
  discountUuid: string,
  product: IDiscountProduct
) => ({
  type: OFFER_ADD_PRODUCT_TO_PRODUCT_DISCOUNT as typeof OFFER_ADD_PRODUCT_TO_PRODUCT_DISCOUNT,
  discountType,
  discountUuid: discountUuid,
  product,
});

export type OfferRemoveProductFromProductDiscountAction = ReturnType<
  typeof offerRemoveProductFromProductDiscountAction
>;
export const offerRemoveProductFromProductDiscountAction = (
  discountType: keyof IOfferProductDiscounts<IOfferProductDiscountInstance>,
  discountUuid: string,
  productUuid: string
) => ({
  type: OFFER_REMOVE_PRODUCT_FROM_PRODUCT_DISCOUNT as typeof OFFER_REMOVE_PRODUCT_FROM_PRODUCT_DISCOUNT,
  discountType,
  discountUuid,
  productUuid,
});

export type OfferToggleProductDiscountAgeNameAction = ReturnType<typeof offerToggleProductDiscountAgeNameAction>;
export const offerToggleProductDiscountAgeNameAction = (
  discountType: keyof IOfferProductDiscounts<IOfferProductDiscountInstance>,
  discountUuid: string,
  productUuid: string,
  ageName: string
) => ({
  type: OFFER_TOGGLE_PRODUCT_DISCOUNT_AGENAME as typeof OFFER_TOGGLE_PRODUCT_DISCOUNT_AGENAME,
  discountUuid,
  discountType,
  productUuid,
  ageName,
});

// Sub Product Discounts
export type OfferAddSubProductDiscountAction = ReturnType<typeof offerAddSubProductDiscountAction>;
export const offerAddSubProductDiscountAction = (
  discountType: keyof IOfferSubProductDiscounts<IOfferProductDiscountInstance>,
  productUuid?: string
) => ({
  type: OFFER_ADD_SUB_PRODUCT_DISCOUNT as typeof OFFER_ADD_SUB_PRODUCT_DISCOUNT,
  discountType,
  productUuid,
});

export type OfferUpdateSubProductDiscountAction = ReturnType<typeof offerUpdateSubProductDiscountAction>;
export const offerUpdateSubProductDiscountAction = (
  discountType: keyof IOfferSubProductDiscounts<IOfferProductDiscountInstance>,
  uuid: string,
  key: keyof Omit<IUIOfferProductDiscountInstance, 'uuid' | 'products'>,
  newValue: string | boolean,
  currentValue: number | string | boolean | undefined
) => ({
  type: OFFER_UPDATE_SUB_PRODUCT_DISCOUNT as typeof OFFER_UPDATE_SUB_PRODUCT_DISCOUNT,
  discountType,
  uuid,
  key,
  newValue,
  currentValue,
});

export type OfferRemoveSubProductDiscountAction = ReturnType<typeof offerRemoveSubProductDiscountAction>;
export const offerRemoveSubProductDiscountAction = (
  discountType: keyof IOfferSubProductDiscounts<IOfferProductDiscountInstance>,
  uuid: string
) => ({
  type: OFFER_REMOVE_SUB_PRODUCT_DISCOUNT as typeof OFFER_REMOVE_SUB_PRODUCT_DISCOUNT,
  discountType,
  uuid,
});

export type OfferAddProductToSubProductDiscountAction = ReturnType<typeof offerAddProductToSubProductDiscountAction>;
export const offerAddProductToSubProductDiscountAction = (
  discountType: keyof IOfferProductDiscounts<IOfferProductDiscountInstance>,
  discountUuid: string,
  product: IDiscountProduct
) => ({
  type: OFFER_ADD_PRODUCT_TO_SUB_PRODUCT_DISCOUNT as typeof OFFER_ADD_PRODUCT_TO_SUB_PRODUCT_DISCOUNT,
  discountType,
  discountUuid: discountUuid,
  product,
});

export type OfferRemoveProductFromSubProductDiscountAction = ReturnType<
  typeof offerRemoveProductFromSubProductDiscountAction
>;
export const offerRemoveProductFromSubProductDiscountAction = (
  discountType: keyof IOfferProductDiscounts<IOfferProductDiscountInstance>,
  discountUuid: string,
  productUuid: string
) => ({
  type: OFFER_REMOVE_PRODUCT_FROM_SUB_PRODUCT_DISCOUNT as typeof OFFER_REMOVE_PRODUCT_FROM_SUB_PRODUCT_DISCOUNT,
  discountType,
  discountUuid,
  productUuid,
});

export type OfferToggleSubProductDiscountAgeNameAction = ReturnType<typeof offerToggleSubProductDiscountAgeNameAction>;
export const offerToggleSubProductDiscountAgeNameAction = (
  discountType: keyof IOfferSubProductDiscounts<IOfferProductDiscountInstance>,
  discountUuid: string,
  productUuid: string,
  ageName: string
) => ({
  type: OFFER_TOGGLE_SUB_PRODUCT_DISCOUNT_AGENAME as typeof OFFER_TOGGLE_SUB_PRODUCT_DISCOUNT_AGENAME,
  discountType,
  discountUuid,
  productUuid,
  ageName,
});

export type OfferToggleProductOnProductDiscountAction = ReturnType<typeof offerToggleProductOnProductDiscountAction>;
export const offerToggleProductOnProductDiscountAction = (
  discountType: keyof IOfferProductDiscounts<IOfferProductDiscountInstance>,
  discountUuid: string,
  productUuid: string
) => ({
  type: OFFER_TOGGLE_PRODUCT_ON_PRODUCT_DISCOUNT as typeof OFFER_TOGGLE_PRODUCT_ON_PRODUCT_DISCOUNT,
  discountType,
  discountUuid,
  productUuid,
});

export type OfferToggleProductOnSubProductDiscountAction = ReturnType<
  typeof offerToggleProductOnSubProductDiscountAction
>;
export const offerToggleProductOnSubProductDiscountAction = (
  discountType: keyof IOfferSubProductDiscounts<IOfferProductDiscountInstance>,
  discountUuid: string,
  productUuid: string
) => ({
  type: OFFER_TOGGLE_PRODUCT_ON_SUB_PRODUCT_DISCOUNT as typeof OFFER_TOGGLE_PRODUCT_ON_SUB_PRODUCT_DISCOUNT,
  discountType,
  discountUuid,
  productUuid,
});

export type OfferAction =
  | OfferHotelUuidChangeAction
  | OfferHotelUuidChangeSuccessAction
  | OfferNameChangeAction
  | OfferTermsChangeAction
  | OfferFurtherInformationChangeAction
  | OfferAddStayBetweenPrerequisiteAction
  | OfferRemoveStayBetweenPrerequisiteAction
  | OfferChangeStayBetweenPrerequisiteAction
  | OfferSetBooleanPrerequisiteAction
  | OfferSetPreDiscountAction
  | OfferSetCountryCodePrerequisiteAction
  | OfferClearAllCountryCodePrerequisiteAction
  | OfferSetAccommodationProductPrerequisiteAction
  | OfferClearAllAccommodationProductPrerequisiteAction
  | OfferSetAdvanceBookByPrerequisiteAction
  | OfferSetAdvanceMinimumPrerequisiteAction
  | OfferSetAdvanceMaximumPrerequisiteAction
  | OfferClearAllAdvancePrerequisiteAction
  | OfferSetMaxLodgingsPrerequisiteAction
  | OfferSetStayLengthMinimumPrerequisiteAction
  | OfferSetStayLengthMaximumPrerequisiteAction
  | OfferSetStayLengthStrictPrerequisiteAction
  | OfferClearAllStayLengthPrerequisiteAction
  | OfferSetSteppingEveryXNightsApplicationAction
  | OfferSetSteppingApplyToApplicationAction
  | OfferSetSteppingMaximumNightsApplicationAction
  | OfferSetSteppingDiscountCheapestApplicationAction
  | OfferClearAllSteppingApplicationAction
  | OfferSetAccommodationDiscountDiscountPercentageAction
  | OfferSetAccommodationDiscountGreenTaxApproachAction
  | OfferClearAllAccommodationDiscountAction
  | OfferAddProductDiscountAction
  | OfferUpdateProductDiscountAction
  | OfferRemoveProductDiscountAction
  | OfferAddProductToProductDiscountAction
  | OfferRemoveProductFromProductDiscountAction
  | OfferAddSubProductDiscountAction
  | OfferUpdateSubProductDiscountAction
  | OfferRemoveSubProductDiscountAction
  | OfferAddProductToSubProductDiscountAction
  | OfferRemoveProductFromSubProductDiscountAction
  | OfferToggleProductDiscountAgeNameAction
  | OfferToggleSubProductDiscountAgeNameAction
  | OfferToggleProductOnProductDiscountAction
  | OfferToggleProductOnSubProductDiscountAction;
