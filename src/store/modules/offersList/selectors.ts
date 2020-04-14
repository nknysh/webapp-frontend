import { createSelector } from 'reselect';
import { IOffersListDomain } from './model';
import { getBootstrapHotelsAsValueLabelPairsSelector } from 'store/modules/bootstrap/selectors';
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

export const selectedHotelSelector = createSelector(
  offersListDomain,
  (domain: IOffersListDomain): IOffersListDomain['selectedHotel'] => domain.selectedHotel
);

export const hotelFilterSelector = createSelector(getBootstrapHotelsAsValueLabelPairsSelector, hotels => {
  return [
    {
      value: '',
      label: 'All hotels',
    },
    ...hotels,
  ];
});

export const offersListQuerySelector = createSelector(
  sortBySelector,
  filterSelector,
  currentPageSelector,
  itemsPerPageSelector,
  sortOrderSelector,
  filterFieldsSelector,
  selectedHotelSelector,
  (sortBy, filter, currentPage, itemsPerPage, sortOrder, filterFields, selectedHotel) => {
    const associations = ['hotel'];
    const fields = {
      hotel: 'uuid, name, countryCode',
    };

    let filterParam = {
      offer: {} as any,
    };

    if (filter != '') {
      filterParam = {
        offer: {
          [`${filterFields.join(',')}:ilike`]: filter,
        },
      };
    }

    if (selectedHotel !== '') {
      filterParam.offer.hotelUuid = selectedHotel;
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
