export const SET_OFFER_IS_TEXT_ONLY = 'offer/SET_OFFER_IS_TEXT_ONLY';
export const TOGGLE_TA_COUNTRY_ACCORDIAN = 'offer/TOGGLE_TA_COUNTRY_ACCORDIAN';

export type SetOfferIsTextOnly = ReturnType<typeof setOfferIsTextOnly>;
export const setOfferIsTextOnly = (value: boolean) => ({
  type: SET_OFFER_IS_TEXT_ONLY as typeof SET_OFFER_IS_TEXT_ONLY,
  value,
});

export type OfferToggleTaCountryAccodian = ReturnType<typeof offerToggleTaCountryAccodian>;
export const offerToggleTaCountryAccodian = (key: string) => ({
  type: TOGGLE_TA_COUNTRY_ACCORDIAN as typeof TOGGLE_TA_COUNTRY_ACCORDIAN,
  key,
});

export type OfferUiStateAction = SetOfferIsTextOnly | OfferToggleTaCountryAccodian;
