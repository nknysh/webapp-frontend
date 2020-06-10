import { initialState, BookingBuilderDomain } from './model';
import { removeLodgingAction } from './actions';
import reducer from './reducer';
import { formatDate } from 'utils';

describe('booking builder reducer', () => {
  describe('removing a lodging', () => {
    it('returning a lodging that doesnt exist, just return the state', () => {
      const action = removeLodgingAction('a', 0);

      const fixture: BookingBuilderDomain = {
        ...initialState,
      };

      const reducedState = reducer(fixture, action);

      expect(reducedState).toMatchObject(initialState);
    });

    it('remove a lodging at the specified position', () => {
      const action = removeLodgingAction('a', 1);

      const fixture: BookingBuilderDomain = {
        ...initialState,
        currentBookingBuilder: {
          ...initialState.currentBookingBuilder,
          request: {
            Accommodation: [
              {
                uuid: 'a1',
                guestAges: {},
                repeatCustomer: false,
                startDate: new Date(2020, 1, 1),
                endDate: new Date(2020, 1, 4),
                subProducts: [],
              },
              {
                uuid: 'a2',
                guestAges: {},
                repeatCustomer: false,
                startDate: new Date(2020, 1, 4),
                endDate: new Date(2020, 1, 8),
                subProducts: [],
              },
              {
                uuid: 'a3',
                guestAges: {},
                repeatCustomer: false,
                startDate: new Date(2020, 1, 8),
                endDate: new Date(2020, 1, 15),
                subProducts: [],
              },
            ],
          },
        },
      };

      const reducedState = reducer(fixture, action);

      expect(reducedState.currentBookingBuilder.request.Accommodation).toMatchObject([
        {
          uuid: 'a1',
          guestAges: {},
          repeatCustomer: false,
          startDate: new Date(2020, 1, 1),
          endDate: new Date(2020, 1, 4),
          subProducts: [],
        },
        {
          uuid: 'a3',
          guestAges: {},
          repeatCustomer: false,
          startDate: new Date(2020, 1, 8),
          endDate: new Date(2020, 1, 15),
          subProducts: [],
        },
      ]);
    });

    it('doesnt crash if we remove the last lodging, and resets can be booked', () => {
      const action = removeLodgingAction('a', 0);

      const fixture: BookingBuilderDomain = {
        ...initialState,
        currentBookingBuilder: {
          ...initialState.currentBookingBuilder,
          request: {
            Accommodation: [
              {
                uuid: 'a1',
                guestAges: {},
                repeatCustomer: false,
                startDate: new Date(2020, 1, 1),
                endDate: new Date(2020, 1, 4),
                subProducts: [],
              },
            ],
          },
          response: {
            canBeBooked: true,
          },
        },
      };

      const reducedState = reducer(fixture, action);

      expect(reducedState.currentBookingBuilder.request.Accommodation.length).toEqual(0);
      expect(reducedState.currentBookingBuilder.response.canBeBooked).toEqual(false);
    });

    it('resets the overall dates (removing last lodging)', () => {
      const action = removeLodgingAction('a', 1);

      const fixture: BookingBuilderDomain = {
        ...initialState,
        currentBookingBuilder: {
          ...initialState.currentBookingBuilder,
          request: {
            startDate: formatDate(new Date(2020, 0, 1)),
            endDate: formatDate(new Date(2020, 0, 10)),
            Accommodation: [
              {
                uuid: 'a1',
                guestAges: {},
                repeatCustomer: false,
                startDate: new Date(2020, 0, 1),
                endDate: new Date(2020, 0, 4),
                subProducts: [],
              },
              {
                uuid: 'a2',
                guestAges: {},
                repeatCustomer: false,
                startDate: new Date(2020, 0, 4),
                endDate: new Date(2020, 0, 10),
                subProducts: [],
              },
            ],
          },
          response: {
            canBeBooked: true,
          },
        },
      };

      const reducedState = reducer(fixture, action);

      expect(reducedState.currentBookingBuilder.request.startDate).toEqual('2020-01-01');
      expect(reducedState.currentBookingBuilder.request.endDate).toEqual('2020-01-04');
    });

    it('resets the overall dates (removing first lodging)', () => {
      const action = removeLodgingAction('a', 0);

      const fixture: BookingBuilderDomain = {
        ...initialState,
        currentBookingBuilder: {
          ...initialState.currentBookingBuilder,
          request: {
            startDate: formatDate(new Date(2020, 0, 1)),
            endDate: formatDate(new Date(2020, 0, 10)),
            Accommodation: [
              {
                uuid: 'a1',
                guestAges: {},
                repeatCustomer: false,
                startDate: new Date(2020, 0, 1),
                endDate: new Date(2020, 0, 4),
                subProducts: [],
              },
              {
                uuid: 'a2',
                guestAges: {},
                repeatCustomer: false,
                startDate: new Date(2020, 0, 4),
                endDate: new Date(2020, 0, 10),
                subProducts: [],
              },
            ],
          },
          response: {
            canBeBooked: true,
          },
        },
      };

      const reducedState = reducer(fixture, action);

      expect(reducedState.currentBookingBuilder.request.startDate).toEqual('2020-01-04');
      expect(reducedState.currentBookingBuilder.request.endDate).toEqual('2020-01-10');
    });

    it('resets the overall dates (removing first lodging)', () => {
      const action = removeLodgingAction('a', 1);

      const fixture: BookingBuilderDomain = {
        ...initialState,
        currentBookingBuilder: {
          ...initialState.currentBookingBuilder,
          request: {
            startDate: formatDate(new Date(2020, 0, 1)),
            endDate: formatDate(new Date(2020, 0, 10)),
            Accommodation: [
              {
                uuid: 'a1',
                guestAges: {},
                repeatCustomer: false,
                startDate: new Date(2020, 0, 1),
                endDate: new Date(2020, 0, 4),
                subProducts: [],
              },
              {
                uuid: 'a2',
                guestAges: {},
                repeatCustomer: false,
                startDate: new Date(2020, 0, 4),
                endDate: new Date(2020, 0, 10),
                subProducts: [],
              },
              {
                uuid: 'a2',
                guestAges: {},
                repeatCustomer: false,
                startDate: new Date(2020, 0, 10),
                endDate: new Date(2020, 0, 21),
                subProducts: [],
              },
            ],
          },
          response: {
            canBeBooked: true,
          },
        },
      };

      const reducedState = reducer(fixture, action);

      expect(reducedState.currentBookingBuilder.request.startDate).toEqual('2020-01-01');
      expect(reducedState.currentBookingBuilder.request.endDate).toEqual('2020-01-21');
    });
  });
});
