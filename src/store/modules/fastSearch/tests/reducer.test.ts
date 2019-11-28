import reducer from '../reducer';
import { clone } from 'ramda';
import { initialState, FastSearchDomain } from '../model';
import { toggleFilterAction, setFiltersAction, setAllFiltersAction } from '../actions';
import { Filters } from 'services/BackendApi';

describe('FastSearch Reducer', () => {
  let testState: FastSearchDomain;

  beforeEach(() => {
    testState = clone(initialState);
  });

  // Filters
  describe('Toggles filters correctly', () => {
    const actionA = toggleFilterAction(Filters.BEST_FOR_FAMILIES);
    const actionB = toggleFilterAction(Filters.BEST_FOR_ROMANCE);

    it('toggles a filter on', () => {
      const nextState = reducer(testState, actionA);
      expect(nextState.query.filters).toEqual([Filters.BEST_FOR_FAMILIES]);
    });

    it('toggles a filter off', () => {
      const actionA = toggleFilterAction(Filters.BEST_FOR_FAMILIES);
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
      const actionA = setFiltersAction(setA, true);
      const firstState = reducer(testState, actionA);
      expect(firstState.query.filters).toEqual(setA);

      const actionB = setFiltersAction(setB, false);
      const secondState = reducer(firstState, actionB);
      expect(secondState.query.filters).toEqual([Filters.BEST_FOR_SPA]);
    });
  });

  describe('setAllFilters action', () => {
    it('Sets a filters correctly', () => {
      const allFilters = Object.keys(Filters).map(k => Filters[k]);
      const actionA = setAllFiltersAction(true);
      const firstState = reducer(testState, actionA);
      expect(firstState.query.filters).toEqual(allFilters);

      const actionB = setAllFiltersAction(false);
      const secondState = reducer(firstState, actionB);
      expect(secondState.query.filters).toEqual([]);
    });
  });
});
