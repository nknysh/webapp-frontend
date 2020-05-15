import { IImportModel } from './model';
import { createSelector } from 'reselect';

type ImportDomainSelector = (state: any) => IImportModel;

export const importRequestIsPendingSelectorFactory = (domainSelector: ImportDomainSelector) =>
  createSelector(
    domainSelector,
    domain => domain.importRequestIsPending
  );

export const errorSelectorFactory = (domainSelector: ImportDomainSelector) =>
  createSelector(
    domainSelector,
    domain => domain.error
  );

export const latestStatusSelectorFactory = (domainSelector: ImportDomainSelector) =>
  createSelector(
    domainSelector,
    domain => domain.latestStatus
  );

export const workbookIdSelectorFactory = (domainSelector: ImportDomainSelector) =>
  createSelector(
    domainSelector,
    domain => domain.workbookId
  );

export const uiStateSelectorFactory = (domainSelector: ImportDomainSelector) =>
  createSelector(
    domainSelector,
    domain => domain.uiState
  );

export const confirmationModalOpenSelectorFactory = (domainSelector: ImportDomainSelector) =>
  createSelector(
    uiStateSelectorFactory(domainSelector),
    uiState => uiState.confirmationModalOpen
  );

