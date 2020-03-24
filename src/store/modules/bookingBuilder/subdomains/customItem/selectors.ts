import { createSelector } from 'reselect';
import { bookingBuilderDomain } from '../../selectors';

export const customItemSubdomainSelector = createSelector(
  bookingBuilderDomain,
  domain => domain.customItem
);

export const customItemPayloadSelector = createSelector(
  customItemSubdomainSelector,
  domain => domain.payload
);
