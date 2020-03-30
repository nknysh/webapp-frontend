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

export const customItemNameValidationSelector = createSelector(
  customItemPayloadSelector,
  payload => !payload || payload.name 
    ? []
    : ['Required']
);

export const customItemTotalValidationSelector = createSelector(
  customItemPayloadSelector,
  payload => !payload || payload.total 
    ? []
    : ['Required']
);

export const customItemValidationSelector = createSelector(
  customItemNameValidationSelector,
  customItemTotalValidationSelector,
  (name, total) => ({ name, total })
);
