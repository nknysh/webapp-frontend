export interface CountryNameResponse {
  code: string;
  name: string;
}

export interface HotelNameResponse {
  name: string;
  score: number;
  uuid: string;
}

export interface NameSearchResponseData {
  countries: CountryNameResponse[];
  hotels: HotelNameResponse[];
}

export interface NameSearchResponse {
  meta: {
    type: string;
  };
  data: NameSearchResponseData;
}
