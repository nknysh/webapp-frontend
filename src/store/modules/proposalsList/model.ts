import { IProposalsListItem } from 'services/BackendApi/types/ProposalsListResponse';

export interface IProposalsListDomain {
  requestPending: boolean;
  error: any | null;
  proposals: IProposalsListItem[] | null;
  filter: string;
  itemsPerPage: number;
  currentPage: number;
  totalResults: number;
  sortBy: keyof IProposalsListItem;
  sortOrder: 'asc' | 'desc';
  filterFields: string[];
  bookingFields: string[];
  travelAgentUuid: string | null;
}

export const initialState: IProposalsListDomain = {
  requestPending: true,
  error: null,
  proposals: null,
  filter: '',
  itemsPerPage: 10,
  currentPage: 0,
  sortBy: 'createdAt',
  sortOrder: 'asc',
  totalResults: 0,
  filterFields: ['uuid', 'guestFirstName', 'guestLastName', 'name'],
  bookingFields: ['hotelUuid', 'checkInDate', 'checkOutDate'],
  travelAgentUuid: null,
};
