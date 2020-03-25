import { IOfferPrerequisitesPayload, IUIOfferProductDiscountInstance } from 'services/BackendApi';

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

// Sub product discounts > Supplements
export const OFFER_ADD_SUB_PRODUCT_DISCOUNT_SUPPLEMENT = 'offer/OFFER_ADD_SUB_PRODUCT_DISCOUNT_SUPPLEMENT';
export const OFFER_PUT_SUB_PRODUCT_DISCOUNT_SUPPLEMENT = 'offer/OFFER_PUT_SUB_PRODUCT_DISCOUNT_SUPPLEMENT';
export const OFFER_DELETE_SUB_PRODUCT_DISCOUNT_SUPPLEMENT = 'offer/OFFER_DELETE_SUB_PRODUCT_DISCOUNT_SUPPLEMENT';

// Sub product discounts > Supplements
export const OFFER_ADD_SUB_PRODUCT_DISCOUNT_MEAL_PLAN = 'offer/OFFER_ADD_SUB_PRODUCT_DISCOUNT_MEAL_PLAN';
export const OFFER_PUT_SUB_PRODUCT_DISCOUNT_MEAL_PLAN = 'offer/OFFER_PUT_SUB_PRODUCT_DISCOUNT_MEAL_PLAN';
export const OFFER_DELETE_SUB_PRODUCT_DISCOUNT_MEAL_PLAN = 'offer/OFFER_DELETE_SUB_PRODUCT_DISCOUNT_MEAL_PLAN';

// Product discounts > Fine
export const OFFER_ADD_PRODUCT_DISCOUNT_FINE = 'offer/OFFER_ADD_PRODUCT_DISCOUNT_FINE';
export const OFFER_PUT_PRODUCT_DISCOUNT_FINE = 'offer/OFFER_PUT_PRODUCT_DISCOUNT_FINE';
export const OFFER_DELETE_PRODUCT_DISCOUNT_FINE = 'offer/OFFER_DELETE_PRODUCT_DISCOUNT_FINE';

// Product discounts > Meal Plan
export const OFFER_ADD_PRODUCT_DISCOUNT_GROUND_SERVICE = 'offer/OFFER_ADD_PRODUCT_DISCOUNT_GROUND_SERVICE';
export const OFFER_PUT_PRODUCT_DISCOUNT_GROUND_SERVICE = 'offer/OFFER_PUT_PRODUCT_DISCOUNT_GROUND_SERVICE';
export const OFFER_DELETE_PRODUCT_DISCOUNT_GROUND_SERVICE = 'offer/OFFER_DELETE_PRODUCT_DISCOUNT_GROUND_SERVICE';

// Product discounts > Transfer
export const OFFER_ADD_PRODUCT_DISCOUNT_TRANSFER = 'offer/OFFER_ADD_PRODUCT_DISCOUNT_TRANSFER';
export const OFFER_PUT_PRODUCT_DISCOUNT_TRANSFER = 'offer/OFFER_PUT_PRODUCT_DISCOUNT_TRANSFER';
export const OFFER_DELETE_PRODUCT_DISCOUNT_TRANSFER = 'offer/OFFER_DELETE_PRODUCT_DISCOUNT_TRANSFER';

// Product discounts > Supplement
export const OFFER_ADD_PRODUCT_DISCOUNT_SUPPLEMENT = 'offer/OFFER_ADD_PRODUCT_DISCOUNT_SUPPLEMENT';
export const OFFER_PUT_PRODUCT_DISCOUNT_SUPPLEMENT = 'offer/OFFER_PUT_PRODUCT_DISCOUNT_SUPPLEMENT';
export const OFFER_DELETE_PRODUCT_DISCOUNT_SUPPLEMENT = 'offer/OFFER_DELETE_PRODUCT_DISCOUNT_SUPPLEMENT';

export type OfferHotelUuidChangeAction = ReturnType<typeof offerHotelUuidChangeAction>;
export const offerHotelUuidChangeAction = (hotelUuid: string) => ({
  type: OFFER_HOTEL_UUID_CHANGE as typeof OFFER_HOTEL_UUID_CHANGE,
  hotelUuid,
});

export type OfferHotelUuidChangeSuccessAction = ReturnType<typeof offerHotelUuidChangeSuccessAction>;
export const offerHotelUuidChangeSuccessAction = (data: any) => ({
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

// Sub Product Discounts > Supplements
export type OfferAddSubProductDiscountSupplementAction = ReturnType<typeof offerAddSubProductDiscountSupplementAction>;
export const offerAddSubProductDiscountSupplementAction = () => ({
  type: OFFER_ADD_SUB_PRODUCT_DISCOUNT_SUPPLEMENT as typeof OFFER_ADD_SUB_PRODUCT_DISCOUNT_SUPPLEMENT,
});

export type OfferPutSubProductDiscountSupplementAction = ReturnType<typeof offerPutSubProductDiscountSupplementAction>;
export const offerPutSubProductDiscountSupplementAction = (
  subProductDiscountSupplement: IUIOfferProductDiscountInstance
) => ({
  type: OFFER_PUT_SUB_PRODUCT_DISCOUNT_SUPPLEMENT as typeof OFFER_PUT_SUB_PRODUCT_DISCOUNT_SUPPLEMENT,
  subProductDiscountSupplement,
});

export type OfferDeleteSubProductDiscountSupplementAction = ReturnType<
  typeof offerDeleteSubProductDiscountSupplementAction
>;
export const offerDeleteSubProductDiscountSupplementAction = (index: number) => ({
  type: OFFER_DELETE_SUB_PRODUCT_DISCOUNT_SUPPLEMENT as typeof OFFER_DELETE_SUB_PRODUCT_DISCOUNT_SUPPLEMENT,
  index,
});

// Product Discounts > Fines
export type OfferAddProductDiscountFineAction = ReturnType<typeof offerAddProductDiscountFineAction>;
export const offerAddProductDiscountFineAction = () => ({
  type: OFFER_ADD_PRODUCT_DISCOUNT_FINE as typeof OFFER_ADD_PRODUCT_DISCOUNT_FINE,
});

export type OfferPutProductDiscountFineAction = ReturnType<typeof offerPutProductDiscountFineAction>;
export const offerPutProductDiscountFineAction = (fineDiscount: IUIOfferProductDiscountInstance) => ({
  type: OFFER_PUT_PRODUCT_DISCOUNT_FINE as typeof OFFER_PUT_PRODUCT_DISCOUNT_FINE,
  fineDiscount,
});

export type OfferDeleteProductDiscountFineAction = ReturnType<typeof offerDeleteProductDiscountFineAction>;
export const offerDeleteProductDiscountFineAction = (index: number) => ({
  type: OFFER_DELETE_PRODUCT_DISCOUNT_FINE as typeof OFFER_DELETE_PRODUCT_DISCOUNT_FINE,
  index,
});

// Product Discounts > Ground Services
export type OfferAddProductDiscountGroundServiceAction = ReturnType<typeof offerAddProductDiscountGroundServiceAction>;
export const offerAddProductDiscountGroundServiceAction = () => ({
  type: OFFER_ADD_PRODUCT_DISCOUNT_GROUND_SERVICE as typeof OFFER_ADD_PRODUCT_DISCOUNT_GROUND_SERVICE,
});

export type OfferPutProductDiscountGroundServiceAction = ReturnType<typeof offerPutProductDiscountGroundServiceAction>;
export const offerPutProductDiscountGroundServiceAction = (groundServiceDiscount: IUIOfferProductDiscountInstance) => ({
  type: OFFER_PUT_PRODUCT_DISCOUNT_GROUND_SERVICE as typeof OFFER_PUT_PRODUCT_DISCOUNT_GROUND_SERVICE,
  groundServiceDiscount,
});

export type OfferDeleteProductDiscountGroundServiceAction = ReturnType<
  typeof offerDeleteProductDiscountGroundServiceAction
>;
export const offerDeleteProductDiscountGroundServiceAction = (index: number) => ({
  type: OFFER_DELETE_PRODUCT_DISCOUNT_GROUND_SERVICE as typeof OFFER_DELETE_PRODUCT_DISCOUNT_GROUND_SERVICE,
  index,
});

// Sub Product Discounts > Meal Plans
export type OfferAddSubProductDiscountMealPlanAction = ReturnType<typeof offerAddSubProductDiscountMealPlanAction>;
export const offerAddSubProductDiscountMealPlanAction = () => ({
  type: OFFER_ADD_SUB_PRODUCT_DISCOUNT_MEAL_PLAN as typeof OFFER_ADD_SUB_PRODUCT_DISCOUNT_MEAL_PLAN,
});

export type OfferPutSubProductDiscountMealPlanAction = ReturnType<typeof offerPutSubProductDiscountMealPlanAction>;
export const offerPutSubProductDiscountMealPlanAction = (
  subProductDiscountMealPlan: IUIOfferProductDiscountInstance
) => ({
  type: OFFER_PUT_SUB_PRODUCT_DISCOUNT_MEAL_PLAN as typeof OFFER_PUT_SUB_PRODUCT_DISCOUNT_MEAL_PLAN,
  subProductDiscountMealPlan,
});

export type OfferDeleteSubProductDiscountMealPlanAction = ReturnType<
  typeof offerDeleteSubProductDiscountMealPlanAction
>;
export const offerDeleteSubProductDiscountMealPlanAction = (index: number) => ({
  type: OFFER_DELETE_SUB_PRODUCT_DISCOUNT_MEAL_PLAN as typeof OFFER_DELETE_SUB_PRODUCT_DISCOUNT_MEAL_PLAN,
  index,
});

// Product Discounts > Transfer
export type OfferAddProductDiscountTransferAction = ReturnType<typeof offerAddProductDiscountTransferAction>;
export const offerAddProductDiscountTransferAction = () => ({
  type: OFFER_ADD_PRODUCT_DISCOUNT_TRANSFER as typeof OFFER_ADD_PRODUCT_DISCOUNT_TRANSFER,
});

export type OfferPutProductDiscountTransferAction = ReturnType<typeof offerPutProductDiscountTransferAction>;
export const offerPutProductDiscountTransferAction = (transferDiscount: IUIOfferProductDiscountInstance) => ({
  type: OFFER_PUT_PRODUCT_DISCOUNT_TRANSFER as typeof OFFER_PUT_PRODUCT_DISCOUNT_TRANSFER,
  transferDiscount,
});

export type OfferDeleteProductDiscountTransferAction = ReturnType<typeof offerDeleteProductDiscountTransferAction>;
export const offerDeleteProductDiscountTransferAction = (index: number) => ({
  type: OFFER_DELETE_PRODUCT_DISCOUNT_TRANSFER as typeof OFFER_DELETE_PRODUCT_DISCOUNT_TRANSFER,
  index,
});

// Product Discounts > Supplement
export type OfferAddProductDiscountSupplementAction = ReturnType<typeof offerAddProductDiscountSupplementAction>;
export const offerAddProductDiscountSupplementAction = () => ({
  type: OFFER_ADD_PRODUCT_DISCOUNT_SUPPLEMENT as typeof OFFER_ADD_PRODUCT_DISCOUNT_SUPPLEMENT,
});

export type OfferPutProductDiscountSupplementAction = ReturnType<typeof offerPutProductDiscountSupplementAction>;
export const offerPutProductDiscountSupplementAction = (supplementDiscount: IUIOfferProductDiscountInstance) => ({
  type: OFFER_PUT_PRODUCT_DISCOUNT_SUPPLEMENT as typeof OFFER_PUT_PRODUCT_DISCOUNT_SUPPLEMENT,
  supplementDiscount: supplementDiscount,
});

export type OfferDeleteProductDiscountSupplementAction = ReturnType<typeof offerDeleteProductDiscountSupplementAction>;
export const offerDeleteProductDiscountSupplementAction = (index: number) => ({
  type: OFFER_DELETE_PRODUCT_DISCOUNT_SUPPLEMENT as typeof OFFER_DELETE_PRODUCT_DISCOUNT_SUPPLEMENT,
  index,
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
  | OfferAddSubProductDiscountSupplementAction
  | OfferPutSubProductDiscountSupplementAction
  | OfferDeleteSubProductDiscountSupplementAction
  | OfferAddProductDiscountFineAction
  | OfferPutProductDiscountFineAction
  | OfferDeleteProductDiscountFineAction
  | OfferAddProductDiscountGroundServiceAction
  | OfferPutProductDiscountGroundServiceAction
  | OfferDeleteProductDiscountGroundServiceAction
  | OfferAddSubProductDiscountMealPlanAction
  | OfferPutSubProductDiscountMealPlanAction
  | OfferDeleteSubProductDiscountMealPlanAction
  | OfferAddProductDiscountTransferAction
  | OfferPutProductDiscountTransferAction
  | OfferDeleteProductDiscountTransferAction
  | OfferAddProductDiscountSupplementAction
  | OfferPutProductDiscountSupplementAction
  | OfferDeleteProductDiscountSupplementAction;
