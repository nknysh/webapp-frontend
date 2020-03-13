import { IOfferPrerequisitesPayload } from 'services/BackendApi';

export const OFFER_HOTEL_UUID_CHANGE = 'offer/OFFER_HOTEL_UUID_CHANGE';
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

export type OfferHotelUuidChangeAction = ReturnType<typeof offerHotelUuidChangeAction>;
export const offerHotelUuidChangeAction = (hotelUuid: string) => ({
  type: OFFER_HOTEL_UUID_CHANGE as typeof OFFER_HOTEL_UUID_CHANGE,
  hotelUuid,
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

export type OfferSetAccommodationProductPrerequisite = ReturnType<typeof offerSetAccommodationProductPrerequisite>;
export const offerSetAccommodationProductPrerequisite = (accommodationProductUuid: string, value: boolean) => ({
  type: OFFER_SET_ACCOMMODATION_PRODUCT_PREREQUISITE as typeof OFFER_SET_ACCOMMODATION_PRODUCT_PREREQUISITE,
  accommodationProductUuid,
  value,
});

export type OfferAction =
  | OfferHotelUuidChangeAction
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
  | OfferSetAccommodationProductPrerequisite;
