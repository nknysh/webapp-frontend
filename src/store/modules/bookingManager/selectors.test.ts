import { IBookingManagerDomain, initialState, IBookingLeadGuestInformation } from './model';
import { bookingSelector, leadGuestInformationSelector } from './selectors';
import { IBooking } from 'services/BackendApi';

describe('Booking manager selectors', () => {
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

  it('lead guest information selector selector', () => {
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
