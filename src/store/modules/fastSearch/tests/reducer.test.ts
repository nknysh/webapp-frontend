import reducer from '../reducer';
import { clone } from 'ramda';
import { initialState, FastSearchDomain } from '../model';
import * as Actions from '../actions';
import { Filters } from 'services/BackendApi';

describe('FastSearch Reducer', () => {
  let testState: FastSearchDomain;

  beforeEach(() => {
    testState = clone(initialState);
  });

  // Filters
  describe('Toggles filters correctly', () => {
    const actionA = Actions.toggleFilterAction(Filters.BEST_FOR_FAMILIES);
    const actionB = Actions.toggleFilterAction(Filters.BEST_FOR_ROMANCE);

    it('toggles a filter on', () => {
      const nextState = reducer(testState, actionA);
      expect(nextState.query.filters).toEqual([Filters.BEST_FOR_FAMILIES]);
    });

    it('toggles a filter off', () => {
      const actionA = Actions.toggleFilterAction(Filters.BEST_FOR_FAMILIES);
      const firstState = reducer(testState, actionA);
      const secondState = reducer(firstState, actionA);
      expect(secondState.query.filters).toEqual([]);
    });

    it('does not affect other filters', () => {
      const firstState = reducer(testState, actionA);
      const secondState = reducer(firstState, actionB);
      expect(secondState.query.filters).toEqual([Filters.BEST_FOR_FAMILIES, Filters.BEST_FOR_ROMANCE]);

      const thirdState = reducer(secondState, actionA);
      expect(thirdState.query.filters).toEqual([Filters.BEST_FOR_ROMANCE]);

      const fourthState = reducer(thirdState, actionB);
      expect(fourthState.query.filters).toEqual([]);
    });
  });

  describe('setFilters action', () => {
    it('Sets filters correctly', () => {
      const setA = [Filters.BEST_FOR_NEW_RESORT, Filters.BEST_FOR_ROMANCE, Filters.BEST_FOR_SPA];
      const setB = [Filters.BEST_FOR_NEW_RESORT, Filters.BEST_FOR_ROMANCE];
      const actionA = Actions.setFiltersAction(setA, true);
      const firstState = reducer(testState, actionA);
      expect(firstState.query.filters).toEqual(setA);

      const actionB = Actions.setFiltersAction(setB, false);
      const secondState = reducer(firstState, actionB);
      expect(secondState.query.filters).toEqual([Filters.BEST_FOR_SPA]);
    });
  });

  describe('setAllFilters action', () => {
    it('Sets a filters correctly', () => {
      const allFilters = Object.keys(Filters).map(k => Filters[k]);
      const actionA = Actions.setAllFiltersAction(true);
      const firstState = reducer(testState, actionA);
      expect(firstState.query.filters).toEqual(allFilters);

      const actionB = Actions.setAllFiltersAction(false);
      const secondState = reducer(firstState, actionB);
      expect(secondState.query.filters).toEqual([]);
    });
  });

  describe('dateRangeChange action', () => {
    it('Removes 1 day from the endDate', () => {
      const action = Actions.dateRangeChangeAction(['2019-12-01T00:00:00.000Z', '2019-12-02T00:00:00.000Z']);
      const testState = reducer(initialState, action);
      expect(testState.query.endDate).toEqual('2019-12-01T00:00:00.000Z');
    });
  });
});
