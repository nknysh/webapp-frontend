import { createSelector } from 'reselect';
import { IProposalsListDomain } from './model';
import { travelAgentUserUuidSelector } from '../bookingBuilder';

import { isSR } from 'store/modules/auth';

const proposalsListDomain = (state: any) => state.proposalsList;

export const requestPendingSelector = createSelector(
  proposalsListDomain,
  (domain: IProposalsListDomain): IProposalsListDomain['requestPending'] => domain.requestPending
);

export const errorSelector = createSelector(
  proposalsListDomain,
  (domain: IProposalsListDomain): IProposalsListDomain['error'] => domain.error
);

export const proposalsSelector = createSelector(
  proposalsListDomain,
  (domain: IProposalsListDomain): IProposalsListDomain['proposals'] => {
    return domain.proposals;
  }
);

export const filterSelector = createSelector(
  proposalsListDomain,
  (domain: IProposalsListDomain): IProposalsListDomain['filter'] => domain.filter
);

export const itemsPerPageSelector = createSelector(
  proposalsListDomain,
  (domain: IProposalsListDomain): IProposalsListDomain['itemsPerPage'] => domain.itemsPerPage
);

export const currentPageSelector = createSelector(
  proposalsListDomain,
  (domain: IProposalsListDomain): IProposalsListDomain['currentPage'] => domain.currentPage
);

export const totalResultsSelector = createSelector(
  proposalsListDomain,
  (domain: IProposalsListDomain): IProposalsListDomain['totalResults'] => domain.totalResults
);

export const filterFieldsSelector = createSelector(
  proposalsListDomain,
  (domain: IProposalsListDomain): IProposalsListDomain['filterFields'] => domain.filterFields
);

export const bookingFieldsSelector = createSelector(
  proposalsListDomain,
  (domain: IProposalsListDomain): IProposalsListDomain['bookingFields'] => domain.bookingFields
);

export const sortBySelector = createSelector(
  proposalsListDomain,
  (domain: IProposalsListDomain): IProposalsListDomain['sortBy'] => domain.sortBy
);

export const sortOrderSelector = createSelector(
  proposalsListDomain,
  (domain: IProposalsListDomain): IProposalsListDomain['sortOrder'] => domain.sortOrder
);

export const pageCountSelector = createSelector(
  itemsPerPageSelector,
  totalResultsSelector,
  (itemsPerPage, totalResults): number => {
    return itemsPerPage && totalResults ? Math.ceil(totalResults / itemsPerPage) : 0;
  }
);

export const selectedTravelAgentUuidSelector = createSelector(
  proposalsListDomain,
  (domain: IProposalsListDomain): IProposalsListDomain['travelAgentUuid'] => domain.travelAgentUuid
);

export const proposalsListQuerySelector = createSelector(
  sortBySelector,
  filterSelector,
  bookingFieldsSelector,
  currentPageSelector,
  itemsPerPageSelector,
  sortOrderSelector,
  filterFieldsSelector,
  travelAgentUserUuidSelector,
  isSR,
  (sortBy, filter, bookingFields, currentPage, itemsPerPage, sortOrder, filterFields, travelAgentUuid, isSr) => {
    const associations = ['bookings'];
    const fields = {
      bookings: bookingFields.join(','),
    };

    if (isSr) {
      associations.push('user');
      fields['user'] = 'uuid,title,firstName,lastName';
    }

    console.log('filter', filter);
    let filterParam = {
      proposal: {},
    };

    if (filter != '') {
      filterParam = {
        proposal: {
          [`${filterFields.join(',')}:ilike`]: filter,
        },
      };
    }

    if (travelAgentUuid) {
      filterParam['proposal']['travelAgentUuid'] = travelAgentUuid;
    }

    return {
      sort: sortOrder === 'asc' ? `proposal.${sortBy}` : `-proposal.${sortBy}`,
      page: {
        offset: currentPage * itemsPerPage,
        limit: itemsPerPage,
      },
      associations: associations.join(','),
      fields,
      filter: filterParam,
    };
  }
);
