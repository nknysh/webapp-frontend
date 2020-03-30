import { IAccommodationProductForHotelItem } from './OfferResponse';

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
  accommodationProducts?: IAccommodationProductForHotelItem[];
}
