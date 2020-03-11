export const SET_OFFER_IS_TEXT_ONLY = 'offer/SET_OFFER_IS_TEXT_ONLY';

export type SetOfferIsTextOnly = ReturnType<typeof setOfferIsTextOnly>;
export const setOfferIsTextOnly = (value: boolean) => ({
  type: SET_OFFER_IS_TEXT_ONLY as typeof SET_OFFER_IS_TEXT_ONLY,
  value,
});

export type OfferUiStateAction = SetOfferIsTextOnly;
