import { ICombinationMode } from '../../model';

export const SET_OFFER_IS_TEXT_ONLY = 'offer/SET_OFFER_IS_TEXT_ONLY';
export const TOGGLE_TA_COUNTRY_ACCORDIAN = 'offer/TOGGLE_TA_COUNTRY_ACCORDIAN';

// combination UI state
export const SET_COMBINATION_MODE = 'offer/SET_COMBINATION_MODE';
export const TOGGLE_OFFER_IN_COMBINATION_LIST = 'offer/TOGGLE_OFFER_IN_COMBINATION_LIST';

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

export type OfferSetCombinationMode = ReturnType<typeof offerSetCombinationMode>;
export const offerSetCombinationMode = (combinationMode: ICombinationMode) => ({
  type: SET_COMBINATION_MODE as typeof SET_COMBINATION_MODE,
  combinationMode,
});

export type OfferToggleOfferInCombinationList = ReturnType<typeof offerToggleOfferInCombinationList>;
export const offerToggleOfferInCombinationList = (offerUuid: string, isChecked: boolean) => ({
  type: TOGGLE_OFFER_IN_COMBINATION_LIST as typeof TOGGLE_OFFER_IN_COMBINATION_LIST,
  offerUuid,
  isChecked,
});

export type OfferUiStateAction =
  | SetOfferIsTextOnly
  | OfferToggleTaCountryAccodian
  | OfferSetCombinationMode
  | OfferToggleOfferInCombinationList;
