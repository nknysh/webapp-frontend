import { Hotel, BookingBuilder } from 'services/BackendApi';
import { getDefaultSearchAndBookingStartDate, getDefaultSearchAndBookingEndDate } from '../../utils';

export const makeBookingBuilderStub = (hotelResponse): BookingBuilder => {
  const hotel: Hotel = hotelResponse.data.data;

  return {
    response: {
      canBeBooked: false,
      mustStop: true,
      errors: [],
      currency: hotel.defaultCurrency,
      bookingHash: undefined,
      availableToHold: false,
      potentialBooking: {
        Accommodation: [],
        Supplement: [],
        Transfer: [],
        'Ground Service': [],
        Fine: [],
      },
      availableProductSets: {
        Accommodation: [],
        Supplement: [],
        Transfer: [],
        'Ground Service': [],
        Fine: [],
      },
      textOnlyOffersPerLodging: [],
      appliedOfferNames: [],
      uploads: [],
      hotel,
      totals: {
        oneOrMoreItemsOnRequest: false,
        totalForPricedItemsCents: 0,
        totalBeforeDiscountForPricedItemsCents: 0,
        totalForPricedItems: '0.00',
        totalBeforeDiscountForPricedItems: '0.00',
        total: '0.00',
        totalBeforeDiscount: '0.00',
      },
      minimumNightsReview: false,
      aggregateTotals: {
        Total: makeStubAggregateRecord('Total'),
        Accommodation: makeStubAggregateRecord('Accommodation'),
        'Meal Plan': makeStubAggregateRecord('Meal Plan'),
        Supplement: makeStubAggregateRecord('Supplement'),
        Transfer: makeStubAggregateRecord('Transfer'),
      },
    },
    request: {
      startDate: getDefaultSearchAndBookingStartDate(),
      endDate: getDefaultSearchAndBookingEndDate(),
      guestAges: {
        numberOfAdults: 0,
        agesOfAllChildren: [],
      },
      hotelUuid: hotel.uuid,
      Accommodation: [],
      Transfer: [],
      'Ground Service': [],
      Fine: [],
      Supplement: [],
    },
  };
};

const makeStubAggregateRecord = (title: string) => ({
  title,
  quantity: 0,
  oneOrMoreItemsOnRequest: false,
  totalForPricedItemsCents: 0,
  totalBeforeDiscountForPricedItemsCents: 0,
  totalForPricedItems: '0.00',
  totalBeforeDiscountForPricedItems: '0.00',
  total: '0.00',
  totalBeforeDiscount: '0.00',
  offers: [],
  drilldown: [],
});
