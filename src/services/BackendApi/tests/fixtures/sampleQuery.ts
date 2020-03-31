import { ISearchQuery, MealPlanNames, Filters, StarRating } from '../../types/SearchQuery';

export const sampleQuery: ISearchQuery = {
  name: 'Amilla Fushi',
  lodgings: [
    {
      numberOfAdults: 1,
      agesOfAllChildren: [],
      repeatCustomer: false,
      honeymoon: true,
    },
  ],
  mealPlanCategories: ['Any' as MealPlanNames],
  regions: [],
  filters: [Filters.SEAPLANE_TRANSFER],
  starRatings: [StarRating.FiveStarPlus],
  startDate: '2020-01-01',
  endDate: '2020-01-07',
  priceRange: { min: 1, max: 100000 },
};
