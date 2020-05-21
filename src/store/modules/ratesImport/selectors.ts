import { IImportModel } from '../importer/model';

export const ratesImportDomainSelector = (state: any): IImportModel =>
  state.ratesImport as IImportModel;
