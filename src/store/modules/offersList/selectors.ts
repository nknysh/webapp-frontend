import { createSelector } from 'reselect';
import { IOffersListDomain } from './model';

const offersListDomain = (state: any) => state.offersList;

export const requestPendingSelector = createSelector(
  offersListDomain,
  (domain: IOffersListDomain): IOffersListDomain['requestPending'] => domain.requestPending
);

export const errorSelector = createSelector(
  offersListDomain,
  (domain: IOffersListDomain): IOffersListDomain['error'] => domain.error
);

export const offersSelector = createSelector(
  offersListDomain,
  (domain: IOffersListDomain): IOffersListDomain['offers'] => {
    return domain.offers;
  }
);

export const filterSelector = createSelector(
  offersListDomain,
  (domain: IOffersListDomain): IOffersListDomain['filter'] => domain.filter
);

export const itemsPerPageSelector = createSelector(
  offersListDomain,
  (domain: IOffersListDomain): IOffersListDomain['itemsPerPage'] => domain.itemsPerPage
);

export const currentPageSelector = createSelector(
  offersListDomain,
  (domain: IOffersListDomain): IOffersListDomain['currentPage'] => domain.currentPage
);

export const totalResultsSelector = createSelector(
  offersListDomain,
  (domain: IOffersListDomain): IOffersListDomain['totalResults'] => domain.totalResults
);

export const filterFieldsSelector = createSelector(
  offersListDomain,
  (domain: IOffersListDomain): IOffersListDomain['filterFields'] => domain.filterFields
);

export const sortBySelector = createSelector(
  offersListDomain,
  (domain: IOffersListDomain): IOffersListDomain['sortBy'] => domain.sortBy
);

export const sortOrderSelector = createSelector(
  offersListDomain,
  (domain: IOffersListDomain): IOffersListDomain['sortOrder'] => domain.sortOrder
);

export const pageCountSelector = createSelector(
  itemsPerPageSelector,
  totalResultsSelector,
  (itemsPerPage, totalResults): number => {
    return itemsPerPage && totalResults ? Math.ceil(totalResults / itemsPerPage) : 0;
  }
);

export const bulkActionSelectedUuidsSelector = createSelector(
  offersListDomain,
  (domain: IOffersListDomain): IOffersListDomain['bulkActionSelectedUuids'] => domain.bulkActionSelectedUuids
);

export const isBulkDeleteConfirmOpenSelector = createSelector(
  offersListDomain,
  (domain: IOffersListDomain): IOffersListDomain['isBulkDeleteConfirmOpen'] => domain.isBulkDeleteConfirmOpen
);

export const offersListQuerySelector = createSelector(
  sortBySelector,
  filterSelector,
  currentPageSelector,
  itemsPerPageSelector,
  sortOrderSelector,
  filterFieldsSelector,
  (sortBy, filter, currentPage, itemsPerPage, sortOrder, filterFields) => {
    const associations = ['hotel'];
    const fields = {
      hotel: 'uuid, name, countryCode',
    };

    let filterParam = {
      offer: {},
    };

    if (filter != '') {
      filterParam = {
        offer: {
          [`${filterFields.join(',')}:ilike`]: filter,
        },
      };
    }

    return {
      sort: sortOrder === 'asc' ? `offer.${sortBy}` : `-offer.${sortBy}`,
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
