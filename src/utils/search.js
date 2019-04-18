import { join, curry } from 'ramda';

export const IndexTypes = Object.freeze({
  COUNTRIES: 'countries',
  HOTELS: 'hotels',
});

export const RegionSelectTypes = Object.freeze({
  ALL: 'all',
  SPECIFY: 'specify',
});

export const MealPlanSelectTypes = Object.freeze({
  BB: 'bb',
  HB: 'hb',
  FB: 'fb',
  AI: 'ai',
});

export const searchByQueries = curry((index, queries = []) => index.search(join(' ', queries)));
