import { IGenericStatus, IGenericStatusResponse } from './GenericStatusResponse';

export interface IImportErrorItem {
  ref: string;
  messages: Array<string>;
};

export interface IImportReportItem {
  key: string;
  total: number;
  warnings: Array<IImportErrorItem>;
  errors: Array<IImportErrorItem>;
};

export interface IImportData {
  success: boolean;
  error?: string;
  report?: Array<IImportReportItem>
}

export interface IImportStatus extends IGenericStatus<IImportData> {}
export interface IImportResponse extends IGenericStatusResponse<IImportData> {
  meta: {
    workbookId: string;
  }
}