import { IBooking } from './OffersSearchResponse';

export interface IGetBookingResponse {
  meta: {
    type: string;
    id: string;
    associations: string[];
  };
  data: IBooking;
}
