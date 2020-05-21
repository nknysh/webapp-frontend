import { IGenericStatus, IGenericStatusResponse } from './GenericStatusResponse';

export enum EImportReportItemKey {
  REGIONS = 'regions',
  SEASONS = 'seasons',
  ACCOMMODATION_RATES = 'accommodationRates',
  MEAL_PLAN_RATES = 'mealPlanRates',
  TRANSFER_RATES_PER_PERSON = 'transferRatesPerPerson',
  TRANSFER_RATES_PER_BOOKING = 'transferRatesPerBooking',
  SUPPLEMENT_RATES = 'supplementRates',
  GROUND_SERVICE_RATES_PER_PERSON = 'groundServiceRatesPerPerson',
  GROUND_SERVICE_RATES_PER_BOOKING = 'groundServiceRatesPerBooking',
  FINE_RATES = 'fineRates',
  ALLOTMENTS = 'allotments'
}

export interface IImportErrorItem {
  ref: string;
  messages: Array<string>;
};

export interface IImportReportItem {
  key: EImportReportItemKey;
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