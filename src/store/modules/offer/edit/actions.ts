export const EDIT_OFFER_HOTEL_UUID_CHANGE = 'offer/EDIT_OFFER_HOTEL_UUID_CHANGE';
export const EDIT_OFFER_NAME_CHANGE = 'offer/EDIT_OFFER_NAME_CHANGE';
export const EDIT_OFFER_TERMS_CHANGE = 'offer/EDIT_OFFER_TERMS_CHANGE';
export const EDIT_OFFER_FURTHER_INFORMATION_CHANGE = 'offer/EDIT_OFFER_FURTHER_INFORMATION_CHANGE';

export type EditOfferHotelUuidChangeAction = ReturnType<typeof editOfferHotelUuidChangeAction>;
export const editOfferHotelUuidChangeAction = (hotelUuid: string) => ({
  type: EDIT_OFFER_HOTEL_UUID_CHANGE as typeof EDIT_OFFER_HOTEL_UUID_CHANGE,
  hotelUuid,
});

export type EditOfferNameChangeAction = ReturnType<typeof editOfferNameChangeAction>;
export const editOfferNameChangeAction = (offerName: string) => ({
  type: EDIT_OFFER_NAME_CHANGE as typeof EDIT_OFFER_NAME_CHANGE,
  offerName,
});

export type EditOfferTermsChangeAction = ReturnType<typeof editOfferTermsChangeAction>;
export const editOfferTermsChangeAction = (offerTerms: string) => ({
  type: EDIT_OFFER_TERMS_CHANGE as typeof EDIT_OFFER_TERMS_CHANGE,
  offerTerms,
});

export type EditOfferFurtherInformationChangeAction = ReturnType<typeof editOfferFurtherInformationChangeAction>;
export const editOfferFurtherInformationChangeAction = (offerFurtherInformation: string) => ({
  type: EDIT_OFFER_FURTHER_INFORMATION_CHANGE as typeof EDIT_OFFER_FURTHER_INFORMATION_CHANGE,
  offerFurtherInformation,
});
