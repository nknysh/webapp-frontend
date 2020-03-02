export interface IOffersListItem {
  uuid: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  hotel: IOffersListItemHotel;
  prerequisites: {
    dates?: IOffersListItemPrerequisiteDates[];
    maximumLodgingsInBooking?: number;
    advance?: IOffersListItemPrerequisiteAdvance;
    stayLength?: IOffersListItemPrerequisiteStayLength;
    countryCodes?: string[];
    accommodationProducts?: string[]; // an array of UUIDs
  };
  'hotel.name': string;
  'hotel.countryCode': string;
}

export interface IOffersListItemPrerequisiteStayLength {
  minimum: number;
  strictMinMaxStay: boolean;
}

export interface IOffersListItemPrerequisiteAdvance {
  bookBy: string;
}

export interface IOffersListItemPrerequisiteDates {
  startDate: string;
  endDate: string;
}

export interface IOffersListItemHotel {
  uuid: string;
  name: string;
  countryCode: string;
}

export interface IOffersListResponseMeta {
  type: 'offers';
  total: number;
  associations: string[];
}

export interface IOffersListResponse {
  meta: IOffersListResponseMeta;
  data: IOffersListItem[];
}

export interface IOffersDeleteResponse {
  meta: {
    type: string;
    total: number;
  };
}
