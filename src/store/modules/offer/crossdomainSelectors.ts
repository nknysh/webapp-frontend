import { createSelector } from 'reselect';
import { offerSelector } from './subdomains/offer/selectors';
import { orderedOffersListSelector } from './subdomains/uiState/selectors';

export const mergedOrderedOffersListSelector = createSelector(
  orderedOffersListSelector,
  offerSelector,
  (orderedOffersList, offer) => orderedOffersList.map(
    item => item.uuid === offer.uuid
      ? { uuid: offer.uuid, name: offer.name, selected: true }
      : item
  )
);

