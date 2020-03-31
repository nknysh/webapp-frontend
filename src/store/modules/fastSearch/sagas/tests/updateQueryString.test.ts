import { updateQueryStringSaga } from '../updateQueryStringSaga';
import { select, call } from 'redux-saga/effects';
import { ISearchQuery } from 'services/BackendApi/types/SearchQuery';
import { offersQuerySelector } from '../../selectors';

const sampleQuery: ISearchQuery = {
  name: 'Test',
  lodgings: [],
  startDate: '2020-02-07T15:49:35.191Z',
  endDate: '2020-02-08T15:49:35.191Z',
  mealPlanCategories: [],
  regions: [],
  starRatings: [],
  filters: [],
  priceRange: {
    min: undefined,
    max: undefined,
  },
};

const sanitizedQuery = {
  name: 'Test',
  startDate: '2020-02-07',
  endDate: '2020-02-08',
  filters: [],
  lodgings: [],
  mealPlanCategories: [],
  priceRange: {
    max: undefined,
    min: undefined,
  },
  regions: [],
  starRatings: [],
};

const queryString = 'name=Test&startDate=2020-02-07&endDate=2020-02-08';

describe('updateQueryStringSaga', () => {
  const saga = updateQueryStringSaga();

  it('gets the query off the store', () => {
    expect(saga.next(sampleQuery).value).toEqual(select(offersQuerySelector));
  });

  it('sanitises the query', () => {
    expect(saga.next(sampleQuery).value).toEqual(sanitizedQuery);
  });

  it('Creates a query string', () => {
    expect(saga.next(sanitizedQuery).value).toEqual(queryString);
  });

  it('Creates a query string', () => {
    const callEffect = call(
      window.history.replaceState,
      {},
      '',
      decodeURIComponent(`${location.pathname}?${queryString}`)
    );
    expect(saga.next(queryString).value).toEqual(callEffect);
  });
});
