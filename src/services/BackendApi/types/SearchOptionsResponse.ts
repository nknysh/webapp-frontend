import { StarRating, Filters } from './SearchQuery';

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
