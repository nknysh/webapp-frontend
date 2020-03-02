import { IOffersListItem } from 'services/BackendApi/types/OffersListResponse';

export interface IOffersListDomain {
  requestPending: boolean;
  error: any | null;
  offers: IOffersListItem[] | null;
  filter: string;
  itemsPerPage: number;
  currentPage: number;
  totalResults: number;
  sortBy: keyof IOffersListItem;
  sortOrder: 'asc' | 'desc';
  filterFields: string[];
  travelAgentUuid: string | null;
  bulkActionSelectedUuids: string[];
  isBulkDeleteConfirmOpen: boolean;
}

export const initialState: IOffersListDomain = {
  requestPending: true,
  error: null,
  offers: null,
  filter: '',
  itemsPerPage: 10,
  currentPage: 0,
  sortBy: 'createdAt',
  sortOrder: 'asc',
  totalResults: 0,
  filterFields: ['uuid', 'name'],
  travelAgentUuid: null,
  bulkActionSelectedUuids: [],
  isBulkDeleteConfirmOpen: false,
};
