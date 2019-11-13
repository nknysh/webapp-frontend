import { SearchQuery, MealPlanNames, Filters, StarRating } from './SearchQuery';

export const sampleQuery: SearchQuery = {
  name: 'Amilla Fushi',
  lodgings: [
    {
      numberOfAdults: 1,
      agesOfAllChildren: [],
      repeatCustomer: false,
      honeymoon: true,
    },
  ],
  mealPlanCategories: [MealPlanNames.BREAKFAST_BOARD],
  regions: [],
  filters: [Filters.SEAPLANE_TRANSFER],
  starRatings: [StarRating.FiveStarPlus],
  startDate: '2020-01-01',
  endDate: '2020-01-07',
  priceRange: { min: 1, max: 100000 },
};
