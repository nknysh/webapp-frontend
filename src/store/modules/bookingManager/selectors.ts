import { createSelector } from 'reselect';

import { IBookingManagerDomain, IBookingManagerDomainNetworkRequests } from './model';
import { IBooking, EBookingStatus } from 'services/BackendApi';
import { IBookingLeadGuestInformation } from './model';
import { IProgressBarStage } from 'containers/BookingManager/ProgressBar';

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

export const progressBarDataSelector = createSelector(bookingSelector, (booking: IBooking): any => {
  const { status, stateHistory = [] } = booking;

  // if booking has not loaded yet, exit out
  if (!status) {
    return {
      stages: [],
    };
  }

  const mostRecentState = stateHistory[stateHistory.length - 1].status;

  let stages: IProgressBarStage[] = [
    {
      key: EBookingStatus.POTENTIAL,
      label: 'Enquiry',
      isComplete: Boolean(
        stateHistory.find(sh => sh.status === EBookingStatus.POTENTIAL || sh.status === EBookingStatus.REQUESTED)
      ),
      isCurrent: false,
      isCancelled: false,
      timestamp: stateHistory.find(
        sh => sh.status === EBookingStatus.POTENTIAL || sh.status === EBookingStatus.REQUESTED
      )?.timestamp,
    },
    {
      key: EBookingStatus.REQUESTED,
      label: 'Requested',
      isComplete: Boolean(stateHistory.find(sh => sh.status === EBookingStatus.REQUESTED)),
      isCurrent: EBookingStatus.POTENTIAL === mostRecentState,
      isCancelled: false,
      timestamp: stateHistory.find(sh => sh.status === EBookingStatus.REQUESTED)?.timestamp,
    },
    {
      key: EBookingStatus.CONFIRMED,
      label: 'Confirmed',
      isComplete: Boolean(stateHistory.find(sh => sh.status === EBookingStatus.CONFIRMED)),
      isCurrent: EBookingStatus.REQUESTED === mostRecentState,
      isCancelled: false,
      timestamp: stateHistory.find(sh => sh.status === EBookingStatus.CONFIRMED)?.timestamp,
    },
    {
      key: EBookingStatus.PAYMENT,
      label: 'Payment',
      isComplete: Boolean(stateHistory.find(sh => sh.status === EBookingStatus.PAYMENT)),
      isCurrent: EBookingStatus.CONFIRMED === mostRecentState,
      isCancelled: false,
      timestamp: stateHistory.find(sh => sh.status === EBookingStatus.PAYMENT)?.timestamp,
    },
    {
      key: EBookingStatus.COMPLETE,
      label: 'Complete',
      isComplete: Boolean(stateHistory.find(sh => sh.status === EBookingStatus.COMPLETE)),
      isCurrent: EBookingStatus.PAYMENT === mostRecentState,
      isCancelled: false,
      timestamp: stateHistory.find(sh => sh.status === EBookingStatus.COMPLETE)?.timestamp,
    },
  ];

  // if the booking status is cancelled, remove every state from stages that doesn't have a timestamp
  // manually add in a new state for cancelled
  if (status === EBookingStatus.CANCELLED) {
    stages = stages.filter(stage => stage.timestamp);
    stages.push({
      key: EBookingStatus.CANCELLED,
      label: 'Cancelled',
      isComplete: false,
      isCurrent: false,
      isCancelled: true,
      timestamp: stateHistory.find(sh => sh.status === EBookingStatus.CANCELLED)?.timestamp,
    });
  }

  return {
    stages,
  };
});

export const compactGuestBreakdownSelector = createSelector(bookingSelector, booking => {
  const numberOfAdults = booking.numAdults || 0;
  const agesOfAllChildren = booking.agesOfAllChildren || [];

  let formattedBreakdown = `${numberOfAdults + agesOfAllChildren.length}`;

  if (agesOfAllChildren.length) {
    formattedBreakdown += ` (${numberOfAdults}x Adults, ${agesOfAllChildren.length}x Children)`;
  } else {
    formattedBreakdown += ` (${numberOfAdults}x Adults)`;
  }

  return formattedBreakdown;
});
