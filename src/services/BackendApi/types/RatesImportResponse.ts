import { IGenericStatus } from './GenericStatusResponse';
import { IImportResponse } from './ImportResponse';

export interface IRatesImportErrorItem {
  ref: string;
  messages: Array<string>;
};

export enum ERatesImportReportItemKey {
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
}

export interface IRatesImportReportItem {
  key: ERatesImportReportItemKey;
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
export interface IRatesImportResponse extends IImportResponse {
}
