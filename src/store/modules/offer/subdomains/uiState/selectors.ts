import { createSelector } from 'reselect';
import { IOfferModel } from '../../model';

// TODO: For some reason, I can't import the offerDomainSelector from
// the root selector file. This is a tmp fix. I guess there's some minconfiguration
// in webpack or babel?
const tmpOfferDomainSelector = (state: any): IOfferModel => state.offer;

export const uiStateSelector = createSelector(
  tmpOfferDomainSelector,
  domain => domain.uiState
);

export const getOfferRequestIsPendingSelector = createSelector(
  uiStateSelector,
  uiState => uiState.getOfferRequestIsPending
);

export const getOfferErrorSelector = createSelector(
  uiStateSelector,
  uiState => uiState.getError
);

export const putOfferErrorSelector = createSelector(
  uiStateSelector,
  uiState => uiState.putError
);

export const postOfferErrorSelector = createSelector(
  uiStateSelector,
  uiState => uiState.postError
);

export const offerDomainIsTextOnlySelector = createSelector(
  uiStateSelector,
  uiStateSelector => uiStateSelector.isTextOnly
);

export const taCountryAccordianKeysSelector = createSelector(
  uiStateSelector,
  uiStateSelector => uiStateSelector.taCountryAccordianKeys
);
