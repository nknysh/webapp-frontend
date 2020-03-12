import { IRatesImportModel } from './model';
import { createSelector } from 'reselect';

export const ratesImportDomainSelector = (state: any): IRatesImportModel =>
  state.ratesImport as IRatesImportModel;

export const importRatesRequestIsPendingSelector = createSelector(
  ratesImportDomainSelector,
  domain => domain.importRatesRequestIsPending
);

export const errorSelector = createSelector(
  ratesImportDomainSelector,
  domain => domain.error
);

export const latestStatusSelector = createSelector(
  ratesImportDomainSelector,
  domain => domain.latestStatus
);
