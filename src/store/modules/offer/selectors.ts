import { IOfferModel } from './model';
import { createSelector } from 'reselect';

export const offerDomainSelector = (state: any): IOfferModel => state.offer as IOfferModel;

export const getOfferRequestPendingSelector = createSelector(
  offerDomainSelector,
  domain => domain.getOfferRequestIsPending
);

export const offerErrorSelector = createSelector(
  offerDomainSelector,
  domain => domain.error
);

export const offerSelector = createSelector(
  offerDomainSelector,
  domain => domain.offer
);
