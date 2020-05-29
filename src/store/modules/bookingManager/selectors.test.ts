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
} from './selectors';

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
        bookingLoad: 'LOADED',
        requestToBook: 'IDLE',
        cancel: 'IDLE',
        confirm: 'IDLE',
      };

      const result = bookingLoadSelector.resultFunc(fixture);

      expect(result).toEqual('LOADED');
    });

    it('should select the request to book network request status', () => {
      const fixture: IBookingManagerDomainNetworkRequests = {
        bookingLoad: 'IDLE',
        requestToBook: 'LOADING',
        cancel: 'IDLE',
        confirm: 'IDLE',
      };

      const result = requestToBookSelector.resultFunc(fixture);

      expect(result).toEqual('LOADING');
    });

    it('should select the confirm network request status', () => {
      const fixture: IBookingManagerDomainNetworkRequests = {
        bookingLoad: 'IDLE',
        requestToBook: 'LOADING',
        cancel: 'IDLE',
        confirm: 'A',
      };

      const result = confirmSelector.resultFunc(fixture);

      expect(result).toEqual('A');
    });

    it('should select the cancel network request status', () => {
      const fixture: IBookingManagerDomainNetworkRequests = {
        bookingLoad: 'IDLE',
        requestToBook: 'LOADING',
        cancel: 'B',
        confirm: 'A',
      };

      const result = cancelSelector.resultFunc(fixture);

      expect(result).toEqual('B');
    });
  });
});
