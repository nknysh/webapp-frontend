export interface IHotelNamesResponseMeta {
  type: 'hotel';
  total: number;
  associations: string[];
}

export interface IHotelNameItem {
  uuid: string;
  name: string;
}

export interface IHotelNamesResponse {
  meta: IHotelNamesResponseMeta;
  data: IHotelNameItem[];
}
