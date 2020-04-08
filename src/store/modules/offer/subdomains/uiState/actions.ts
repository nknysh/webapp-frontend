import { ECombinationMode, OrderedOffer } from '../../model';
import { toOrderedOffer } from '../../utils';

export const SET_OFFER_IS_TEXT_ONLY = 'offer/SET_OFFER_IS_TEXT_ONLY';
export const TOGGLE_TA_COUNTRY_ACCORDIAN = 'offer/TOGGLE_TA_COUNTRY_ACCORDIAN';

// combination UI state
export const SET_COMBINATION_MODE = 'offer/SET_COMBINATION_MODE';
export const TOGGLE_OFFER_IN_COMBINATION_LIST = 'offer/TOGGLE_OFFER_IN_COMBINATION_LIST';

export const TOGGEL_AGE_NAME_ACCORDIAN_KEY = 'offer/TOGGEL_AGE_NAME_ACCORDIAN_KEY';

// Sorting
export const SET_ORDERED_OFFERS_LIST = 'offer/SET_OFFERS_ORDERED_LIST';

export const SET_OFFER_IS_PRISTINE = 'offer/SET_OFFER_IS_PRISTINE';

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
export const offerSetCombinationMode = (combinationMode: ECombinationMode) => ({
  type: SET_COMBINATION_MODE as typeof SET_COMBINATION_MODE,
  combinationMode,
});

export type OfferToggleOfferInCombinationList = ReturnType<typeof offerToggleOfferInCombinationList>;
export const offerToggleOfferInCombinationList = (offerUuid: string, isChecked: boolean) => ({
  type: TOGGLE_OFFER_IN_COMBINATION_LIST as typeof TOGGLE_OFFER_IN_COMBINATION_LIST,
  offerUuid,
  isChecked,
});

export type SetOrderedOffersListAction = ReturnType<typeof setOrderedOffersListAction>;
export const setOrderedOffersListAction = (list: OrderedOffer[]) => ({
  type: SET_ORDERED_OFFERS_LIST as typeof SET_ORDERED_OFFERS_LIST,
  list: list.map(item => toOrderedOffer(item)),
});

export type SetOfferIsPristineAction = ReturnType<typeof setOfferIsPristineAction>;
export const setOfferIsPristineAction = (value: boolean) => ({
  type: SET_OFFER_IS_PRISTINE as typeof SET_OFFER_IS_PRISTINE,
  value,
});

export type ToggleAgeNameAccoridanKey = ReturnType<typeof toggleAgeNameAccordianKey>;
export const toggleAgeNameAccordianKey = (ageNamekey: string) => ({
  type: TOGGEL_AGE_NAME_ACCORDIAN_KEY as typeof TOGGEL_AGE_NAME_ACCORDIAN_KEY,
  ageNamekey,
});

export type OfferUiStateAction =
  | SetOfferIsTextOnly
  | OfferToggleTaCountryAccodian
  | OfferSetCombinationMode
  | OfferToggleOfferInCombinationList
  | SetOrderedOffersListAction
  | SetOfferIsPristineAction
  | SetOrderedOffersListAction
  | ToggleAgeNameAccoridanKey;
