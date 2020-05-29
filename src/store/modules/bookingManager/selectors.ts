import { createSelector } from 'reselect';

import { IBookingManagerDomain, IBookingManagerDomainNetworkRequests } from './model';
import { IBooking } from 'services/BackendApi';
import { IBookingLeadGuestInformation } from './model';

const bookingManagerDomain = (state: any) => state.bookingManager;

export const bookingSelector = createSelector(
  bookingManagerDomain,
  (domain: IBookingManagerDomain): IBookingManagerDomain['booking'] => domain.booking
);

export const networkRequestsSelector = createSelector(
  bookingManagerDomain,
  (domain: IBookingManagerDomain): IBookingManagerDomainNetworkRequests => domain.networkRequests
);

export const bookingLoadSelector = createSelector(
  networkRequestsSelector,
  (networkRequests: IBookingManagerDomainNetworkRequests): IBookingManagerDomainNetworkRequests['bookingLoad'] =>
    networkRequests.bookingLoad
);

export const requestToBookSelector = createSelector(
  networkRequestsSelector,
  (networkRequests: IBookingManagerDomainNetworkRequests): IBookingManagerDomainNetworkRequests['requestToBook'] =>
    networkRequests.requestToBook
);

export const confirmSelector = createSelector(
  networkRequestsSelector,
  (networkRequests: IBookingManagerDomainNetworkRequests): IBookingManagerDomainNetworkRequests['confirm'] =>
    networkRequests.confirm
);

export const cancelSelector = createSelector(
  networkRequestsSelector,
  (networkRequests: IBookingManagerDomainNetworkRequests): IBookingManagerDomainNetworkRequests['cancel'] =>
    networkRequests.cancel
);

// OWA-1553 note
// good candidate for a "mapping function" to be put into the BMS
// titleCase function left inline to allow easy migration
export const leadGuestInformationSelector = createSelector(
  bookingSelector,
  (booking: IBooking): IBookingLeadGuestInformation => {
    const titleCase = str => {
      return str.replace(/\w\S*/g, txt => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };
    const { guestEmail, guestFirstName, guestLastName, guestTitle } = booking;

    return {
      guestTitle: guestTitle ? titleCase(guestTitle) : guestTitle,
      guestFirstName,
      guestLastName,
      guestEmail,
    };
  }
);
