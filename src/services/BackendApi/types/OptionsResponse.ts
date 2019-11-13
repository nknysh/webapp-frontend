import { StarRating, Filters } from './SearchQuery';

export interface OptionsResponse {
  meta: {
    type: string;
  };
  data: {
    starRatings: StarRating[];
    filters: Filters[];
    regions: string[];
  };
}
