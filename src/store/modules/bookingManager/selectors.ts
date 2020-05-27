import { createSelector } from 'reselect';

import { IBookingManagerDomain } from './model';
import { IBooking } from 'services/BackendApi';
import { IBookingLeadGuestInformation } from './model';

const bookingManagerDomain = (state: any) => state.bookingManager;

export const bookingSelector = createSelector(
  bookingManagerDomain,
  (domain: IBookingManagerDomain): IBookingManagerDomain['booking'] => domain.booking
);

export const statusSelector = createSelector(
  bookingManagerDomain,
  (domain: IBookingManagerDomain): IBookingManagerDomain['status'] => domain.status
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
