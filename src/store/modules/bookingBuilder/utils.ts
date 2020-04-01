import { IHotel, BookingBuilder } from 'services/BackendApi';
import { getDefaultSearchAndBookingStartDate, getDefaultSearchAndBookingEndDate } from '../../utils';

export const makeBookingBuilderStub = (hotelResponse): BookingBuilder => {
  const hotel: IHotel = hotelResponse.data.data;

  return {
    response: {
      displayTotals: {
        blocks: [
          {
            header: 'Beach Villa',
            items: [
              {
                title: '2019-12-12 - 2019-12-26',
                labels: ['2 Guests', '2 x Adult'],
                isOnRequestOrPartiallyOnRequest: true,
                total: null,
                totalBeforeDiscount: null,
                offers: [
                  'Reethi Island Indulgence 30% discount for stays 7 nights with Free Half Board and return transfers',
                ],
              },
              {
                title: 'Meal Plan',
                labels: ['Breakfast Board'],
                isOnRequestOrPartiallyOnRequest: true,
                total: null,
                totalBeforeDiscount: null,
                offers: [],
              },
            ],
            blockType: 'Accommodations',
          },
          {
            header: 'Transfers',
            items: [
              {
                title: 'Return',
                labels: ['Shared Return Luxury Boat transfer'],
                isOnRequestOrPartiallyOnRequest: false,
                total: '0.00',
                totalBeforeDiscount: '1500.00',
                offers: [
                  'Reethi Island Indulgence 30% discount for stays 7 nights with Free Half Board and return transfers',
                ],
              },
            ],
            blockType: 'Transfers',
          },
          {
            header: 'Ground Services',
            items: [],
            blockType: 'Ground Services',
          },
          {
            header: 'Other Items',
            items: [],
            blockType: 'Addons',
          },
        ],
        appliedOfferNames: [
          'Reethi Island Indulgence 30% discount for stays 7 nights with Free Half Board and return transfers',
        ],
        totals: {
          oneOrMoreItemsOnRequest: true,
          totalForPricedItemsCents: 664700,
          totalBeforeDiscountForPricedItemsCents: 1097000,
          totalForPricedItems: '6647.00',
          totalBeforeDiscountForPricedItems: '10970.00',
          total: null,
          totalBeforeDiscount: null,
        },
      },
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
      customItems: []
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
