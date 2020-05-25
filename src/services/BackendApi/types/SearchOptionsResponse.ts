import { StarRating, Filters } from './SearchQuery';

export interface IFilterOption {
  filterTitle: string;
  filterEnumName: Filters;
  filterEnumKey: string;
}

export interface IFiltersCategory {
  categoryKey: string;
  categoryTitle: string;
  filters: IFilterOption[]
}

export interface SearchOptions {
  starRatings: StarRating[];
  filtersCategories: IFiltersCategory[];
  regions: string[];
}
export interface SearchOptionsResponse {
  meta: {
    type: string;
  };
  data: SearchOptions;
}
