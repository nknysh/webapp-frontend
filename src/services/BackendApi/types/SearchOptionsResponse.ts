import { StarRating, Filters } from './SearchQuery';
import { AxiosResponse } from 'axios';

export interface SearchOptions {
  starRatings: StarRating[];
  filters: Filters[];
  regions: string[];
}
export interface SearchOptionsResponse {
  meta: {
    type: string;
  };
  data: SearchOptions;
}
