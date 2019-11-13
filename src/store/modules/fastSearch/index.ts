import backendApi, { SearchQuery, MealPlanNames, Filters, StarRating } from 'services/BackendApi';
export const tsTest = (a: number, b: 'string'): string => a + b;

const testSearch: SearchQuery = {
  name: 'Amilla Fushi',
  lodgings: [
    {
      numberOfAdults: 1,
      agesOfAllChildren: [],
      repeatCustomer: false,
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

const test = async () => {
  try {
    const res = await backendApi.getOffersSearch(testSearch);
  } catch (e) {
    throw e;
  }
};

test();
