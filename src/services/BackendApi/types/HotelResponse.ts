import { IAgeName, IOccupancy, IOffer } from './OfferResponse';

export interface IHotel {
  uuid: string;
  name: string;
  description: string;
  email: string;
  phoneNumber: string;
  address: string;
  countryCode: string;
  region: string;
  starRating: string;
  defaultCurrency: string;
  amenities: string[];
  highlights: string[];
  additionalInfo: string | null;
  policiesAndRestrictions: string | null;
  suitableForHoneymooners: true;
  preferred: boolean;
  overview: string[];
  filters: string[];
  inLoveWith: string | null;
  createdAt: string;
  updatedAt: string;

  // Add associations here as optional properties
  accommodationProducts?: IProduct<IAccomodationProductOptions>[];
  fineProducts?: IProduct<{}>[];
  transferProducts?: IProduct<ITransferProductOptions>[];
  groundServiceProducts?: IProduct<{}>[];
  mealPlanProducts?: IProduct<IMealPlanProductOptions>[];
  supplementProducts?: IProduct<any>[];
  offers?: IOffer<any>[];
}

export interface IProduct<T> {
  uuid: string;
  name: string;
  type: string;
  category: string;
  options: T;
  isOneWay: true;
  capacity: number;
  meta: any;
  ownerType: string;
  ownerUuid: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITransferProductOptions {
  isOneWay: boolean;
  capacity: number;
}

export interface IMealPlanProductOptions {
  ages: IAgeName[];
}

export interface IAccomodationProductOptions {
  ages: IAgeName[];
  occupancy: IOccupancy[];
}
