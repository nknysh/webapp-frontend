export interface IProposalBooking {
  uuid: string;
  hotelUuid: string;
}

export interface IProposalsListItem {
  uuid: string;
  name: string;
  guestFirstName: string;
  guestLastName: string;
  guestTitle: string;
  comments: string;
  userUuid: string;
  attachedUploads: any[];
  isLocked: boolean;
  createdAt: string;
  updatedAt: string;
  bookings: Partial<IProposalBooking>[];
}

export interface IProposalsListResponseMeta {
  type: 'proposal';
  total: number;
  associations: string[];
}

export interface IProposalsListResponse {
  meta: IProposalsListResponseMeta;
  data: IProposalsListItem[];
}
