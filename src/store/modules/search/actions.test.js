import { getPayloadFromSearchQuery, subDaysFromPayload } from './actions';

describe('search actions', () => {
  const query = {
    lodging: [
      {
        numberOfAdults: '2',
      },
    ],
    destination: {
      value: '',
    },
    dates: {
      startDate: '2020-01-21T12:00:00.000Z',
      endDate: '2020-01-25T12:00:00.000Z',
    },
    occasions: {
      honeymoon: false,
      birthday: true,
    },
    filters: {
      regions: {},
    },
  };
  const actingCountryCode = 'GB';
  const repeatGuest = undefined;
  const occasions = { honeymoon: false, birthday: true };
  const expectedFullPayload = {
    actingCountryCode: 'GB',
    lodging: [
      {
        repeatCustomer: undefined,
        honeymoon: false,
        birthday: true,
        numberOfAdults: '2',
      },
    ],
    destination: { value: '' },
    dates: {
      startDate: '2020-01-21T12:00:00.000Z',
      endDate: '2020-01-25T12:00:00.000Z',
    },
    occasions: { honeymoon: false, birthday: true },
    filters: { regions: {} },
  };

  it('should build a payload from a search query & query data with an unmodified date', () => {
    const payload = getPayloadFromSearchQuery(query, actingCountryCode, repeatGuest, occasions);
    expect(payload).toEqual(expectedFullPayload);
  });

  it('should sub the days from a payload correctly', () => {
    const payload = getPayloadFromSearchQuery(query, actingCountryCode, repeatGuest, occasions);
    const modifiedPayload = subDaysFromPayload(payload);

    expect(modifiedPayload.dates.endDate).toEqual(new Date('2020-01-24T12:00:00.000Z'));
  });
});
