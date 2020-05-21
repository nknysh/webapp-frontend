import { IImportModel } from '../importer/model';

export const allotmentsImportDomainSelector = (state: any): IImportModel =>
  state.allotmentsImport as IImportModel;
