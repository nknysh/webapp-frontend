import { createSelector } from 'reselect';
import { FastSearchDomain } from './model';
import { SearchQuery, SearchOptions } from 'services/BackendApi/types';
import { ErrorResponse } from '../../../services/BackendApi/types/ErrorResponse';

const fastSearchDomain = (state: any): FastSearchDomain => state.fastSearch;

export const offersQuerySelector = createSelector(
  fastSearchDomain,
  (domain): SearchQuery | null => domain.query
);

export const searchOptionsPendingSelector = createSelector(
  fastSearchDomain,
  (domain: FastSearchDomain): boolean => domain.optionsRequestPending
);

export const searchOptionsErrorSelector = createSelector(
  fastSearchDomain,
  (domain: FastSearchDomain): ErrorResponse | null => domain.optionsRequestError
);

export const searchOptionsSelector = createSelector(
  fastSearchDomain,
  (domain: FastSearchDomain): SearchOptions | null => domain.options
);
