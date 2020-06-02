import {
  IBookingManagerDomain,
  initialState,
  IBookingLeadGuestInformation,
  IBookingManagerDomainNetworkRequests,
} from './model';
import {
  bookingSelector,
  leadGuestInformationSelector,
  bookingLoadSelector,
  requestToBookSelector,
  confirmSelector,
  cancelSelector,
  progressBarDataSelector,
} from './selectors';
import { ENetworkRequestStatus, EBookingStatus, IBooking } from 'services/BackendApi';

describe('Booking manager selectors', () => {
  describe('booking selector', () => {
    it('booking selector', () => {
      const fixture: IBookingManagerDomain = {
        ...initialState,
        booking: {
          guestFirstName: 'test',
        },
      };

      const result = bookingSelector.resultFunc(fixture);

      expect(result).toMatchObject({
        guestFirstName: 'test',
      });
    });
  });

  describe('lead guest information', () => {
    it('lead guest information selector', () => {
      const fixture: IBookingLeadGuestInformation = {
        guestFirstName: 'test',
        guestEmail: 'test email',
      };

      const result = leadGuestInformationSelector.resultFunc(fixture);

      expect(result).toMatchObject({
        guestFirstName: 'test',
        guestEmail: 'test email',
      });
    });

    it('lead guest info title cases the title', () => {
      const fixture: IBookingLeadGuestInformation = {
        guestTitle: 'test',
        guestFirstName: 'test',
        guestEmail: 'test email',
      };

      const result = leadGuestInformationSelector.resultFunc(fixture);

      expect(result).toMatchObject({
        guestTitle: 'Test',
        guestFirstName: 'test',
        guestEmail: 'test email',
      });
    });
  });

  describe('network request selectors', () => {
    it('should select the booking loading network request status', () => {
      const fixture: IBookingManagerDomainNetworkRequests = {
        bookingLoad: ENetworkRequestStatus.SUCCESS,
        requestToBook: ENetworkRequestStatus.IDLE,
        cancel: ENetworkRequestStatus.IDLE,
        confirm: ENetworkRequestStatus.IDLE,
      };

      const result = bookingLoadSelector.resultFunc(fixture);

      expect(result).toEqual(ENetworkRequestStatus.SUCCESS);
    });

    it('should select the request to book network request status', () => {
      const fixture: IBookingManagerDomainNetworkRequests = {
        bookingLoad: ENetworkRequestStatus.IDLE,
        requestToBook: ENetworkRequestStatus.PENDING,
        cancel: ENetworkRequestStatus.IDLE,
        confirm: ENetworkRequestStatus.IDLE,
      };

      const result = requestToBookSelector.resultFunc(fixture);

      expect(result).toEqual(ENetworkRequestStatus.PENDING);
    });

    it('should select the confirm network request status', () => {
      const fixture: IBookingManagerDomainNetworkRequests = {
        bookingLoad: ENetworkRequestStatus.IDLE,
        requestToBook: ENetworkRequestStatus.PENDING,
        cancel: ENetworkRequestStatus.IDLE,
        confirm: ENetworkRequestStatus.ERROR,
      };

      const result = confirmSelector.resultFunc(fixture);

      expect(result).toEqual(ENetworkRequestStatus.ERROR);
    });

    it('should select the cancel network request status', () => {
      const fixture: IBookingManagerDomainNetworkRequests = {
        bookingLoad: ENetworkRequestStatus.IDLE,
        requestToBook: ENetworkRequestStatus.PENDING,
        cancel: ENetworkRequestStatus.SUCCESS,
        confirm: ENetworkRequestStatus.ERROR,
      };

      const result = cancelSelector.resultFunc(fixture);

      expect(result).toEqual(ENetworkRequestStatus.SUCCESS);
    });
  });

  describe('progress bar data', () => {
    it('builds data for a booking on request', () => {
      const fixture: IBooking = {
        status: EBookingStatus.REQUESTED,
        stateHistory: [
          {
            status: EBookingStatus.POTENTIAL,
            timestamp: '2020-01-01T15:38:31.456Z',
          },
          {
            status: EBookingStatus.REQUESTED,
            timestamp: '2020-02-02T09:42:34.051Z',
          },
        ],
      };

      const result = progressBarDataSelector.resultFunc(fixture);

      expect(result).toMatchObject({
        stages: [
          {
            key: 'potential',
            label: 'Enquiry',
            isComplete: true,
            isCurrent: false,
            isCancelled: false,
            timestamp: '2020-01-01T15:38:31.456Z',
          },
          {
            key: 'requested',
            label: 'Requested',
            isComplete: true,
            isCurrent: false,
            isCancelled: false,
            timestamp: '2020-02-02T09:42:34.051Z',
          },
          {
            key: 'confirmed',
            label: 'Confirmed',
            isComplete: false,
            isCurrent: true,
            isCancelled: false,
          },
          {
            key: 'payment',
            label: 'Payment',
            isComplete: false,
            isCurrent: false,
            isCancelled: false,
          },
          {
            key: 'complete',
            label: 'Complete',
            isComplete: false,
            isCurrent: false,
            isCancelled: false,
          },
        ],
      });
    });

    it('booking with no status will always return no stages', () => {
      const fixture: IBooking = {
        status: undefined,
        stateHistory: [
          {
            status: EBookingStatus.POTENTIAL,
            timestamp: '2020-01-01T15:38:31.456Z',
          },
          {
            status: EBookingStatus.REQUESTED,
            timestamp: '2020-02-02T09:42:34.051Z',
          },
        ],
      };

      const result = progressBarDataSelector.resultFunc(fixture);

      expect(result).toMatchObject({
        stages: [],
      });
    });
  });
});
