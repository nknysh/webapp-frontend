import { IImportModel } from '../importer/model';
import * as selectors from '../importer/selectors';

export const ratesImportDomainSelector = (state: any): IImportModel =>
  state.ratesImport as IImportModel;

export const importRatesRequestIsPendingSelector = 
  selectors.importRequestIsPendingSelectorFactory(ratesImportDomainSelector);

export const errorSelector = selectors.errorSelectorFactory(ratesImportDomainSelector);

export const latestStatusSelector = selectors.latestStatusSelectorFactory(ratesImportDomainSelector);

export const workbookIdSelector = selectors.workbookIdSelectorFactory(ratesImportDomainSelector);

export const uiStateSelector = selectors.uiStateSelectorFactory(ratesImportDomainSelector);

export const confirmationModalOpenSelector = selectors.confirmationModalOpenSelectorFactory(ratesImportDomainSelector);
