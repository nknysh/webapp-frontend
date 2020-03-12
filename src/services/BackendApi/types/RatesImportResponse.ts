import { IGenericStatus, IGenericStatusResponse } from './GenericStatusResponse';

export interface IRatesImportErrorItem {
  ref: string;
  messages: Array<string>;
};

export interface IRatesImportReportItem {
  key: string;
  total: number;
  warnings: Array<IRatesImportErrorItem>;
  errors: Array<IRatesImportErrorItem>;
};

export interface IRatesImportData {
  success: boolean;
  error?: string;
  report?: Array<IRatesImportReportItem>
}

export interface IRatesImportStatus extends IGenericStatus<IRatesImportData> {}
export interface IRatesImportResponse extends IGenericStatusResponse<IRatesImportData> {}
