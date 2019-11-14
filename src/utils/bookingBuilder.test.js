import {
  getTitleForAccommodationUuid,
  getNightsBreakdownForDates,
  getOccupancyBreakdownForAccommodation,
  getAvailableMealPlansForAccommodation,
  getAvailableProductSetAccommodationForUuid,
} from './bookingBuilder.tsx';

describe('bookingBuilder utils', () => {
  describe('getTitleForAccommodationUuid', () => {
    it('should loop over the products to get the title for the uuid', () => {
      const availableProductSets = {
        Accommodation: [
          {
            products: [
              {
                uuid: 1,
                name: 'test',
              },
            ],
          },
        ],
      };

      const title = getTitleForAccommodationUuid(1, availableProductSets);

      expect(title).toEqual('test');
    });

    it('should loop over 2 accommodations and get the correct title for each', () => {
      const availableProductSets = {
        Accommodation: [
          {
            products: [
              {
                uuid: 1,
                name: 'A',
              },
            ],
          },
          {
            products: [
              {
                uuid: 2,
                name: 'B',
              },
            ],
          },
        ],
      };

      expect(getTitleForAccommodationUuid(1, availableProductSets)).toEqual('A');
      expect(getTitleForAccommodationUuid(2, availableProductSets)).toEqual('B');
    });

    it('should loop over 2 accommodations that have the same products but treat each individually', () => {
      const availableProductSets = {
        Accommodation: [
          {
            products: [
              {
                uuid: 1,
                name: 'A',
              },
            ],
          },
          {
            products: [
              {
                uuid: 1,
                name: 'A',
              },
            ],
          },
        ],
      };

      expect(getTitleForAccommodationUuid(1, availableProductSets)).toEqual('A');
      expect(getTitleForAccommodationUuid(1, availableProductSets)).toEqual('A');
    });
  });

  describe('getNightsBreakdownForDates', () => {
    it('should calculate nights and dates', () => {
      expect(getNightsBreakdownForDates('2019-12-06', '2019-12-13')).toEqual('7 nights | 6th Dec 2019 - 13th Dec 2019');
    });

    it('should work for 1 night', () => {
      expect(getNightsBreakdownForDates('2019-12-01', '2019-12-02')).toEqual('1 night | 1st Dec 2019 - 2nd Dec 2019');
    });

    it('should work for over 10 nights', () => {
      expect(getNightsBreakdownForDates('2019-12-01', '2019-12-20')).toEqual(
        '19 nights | 1st Dec 2019 - 20th Dec 2019'
      );
    });

    it('should work for over multiple months', () => {
      expect(getNightsBreakdownForDates('2019-10-15', '2019-11-02')).toEqual(
        '18 nights | 15th Oct 2019 - 2nd Nov 2019'
      );
    });
  });

  describe('getOccupancyBreakdownForAccommodation', () => {
    it('1 adult, no children', () => {
      expect(getOccupancyBreakdownForAccommodation({ guestAges: { numberOfAdults: 1 } })).toEqual('1 Guest (1 Adult)');
    });
    it('2 adults, no children', () => {
      expect(getOccupancyBreakdownForAccommodation({ guestAges: { numberOfAdults: 2 } })).toEqual(
        '2 Guests (2 Adults)'
      );
    });

    it('1 adult, 1 child', () => {
      expect(
        getOccupancyBreakdownForAccommodation({
          guestAges: { numberOfAdults: 1, agesOfAllChildren: [10] },
        })
      ).toEqual('2 Guests (1 Adult, 1 Child)');
    });
    it('1 adult, 2 children', () => {
      expect(
        getOccupancyBreakdownForAccommodation({
          guestAges: { numberOfAdults: 1, agesOfAllChildren: [10, 14] },
        })
      ).toEqual('3 Guests (1 Adult, 2 Children)');
    });
    it('2 adults, 2 children', () => {
      expect(
        getOccupancyBreakdownForAccommodation({
          guestAges: { numberOfAdults: 2, agesOfAllChildren: [10, 14] },
        })
      ).toEqual('4 Guests (2 Adults, 2 Children)');
    });
  });

  describe.skip('getMealPlanBreakdownForAccommodation', () => {
    it('should get a meal plan breakdown for 1 mealplan product', () => {});
  });

  describe.skip('getAvailableProductSetAccommodationForUuid', () => {
    it('get the accommodation with the matching uuid', () => {
      const availableProductSets = {
        Accommodation: [
          {
            products: [
              {
                uuid: 1,
              },
            ],
            total: '10',
          },
          {
            products: [
              {
                uuid: 2,
              },
            ],
            total: '20',
          },
          {
            products: [
              {
                uuid: 3,
              },
            ],
            total: '30',
          },
        ],
      };

      const found = getAvailableProductSetAccommodationForUuid(2, availableProductSets);

      expect(found).toMatchObject({
        products: [
          {
            uuid: 2,
          },
        ],
        total: '20',
      });
    });

    it('if no accommodation with matching uuid, return undefined', () => {
      const availableProductSets = {
        Accommodation: [
          {
            products: [
              {
                uuid: 1,
              },
            ],
            total: '10',
          },
          {
            products: [
              {
                uuid: 2,
              },
            ],
            total: '20',
          },
          {
            products: [
              {
                uuid: 3,
              },
            ],
            total: '30',
          },
        ],
      };

      const found = getAvailableProductSetAccommodationForUuid(4, availableProductSets);

      expect(found).toEqual(undefined);
    });
  });

  describe.skip('getAvailableMealPlansForAccommodation', () => {
    it('error state - 1 accommodation with 1 product, no available product sets. return empty object', () => {
      const lodgingSummary = {
        startDate: '2019-12-13',
        endDate: '2019-12-20',
        uuid: '1eb88f1d-6239-495f-a905-68e894ee3f2b',
        subProducts: {
          'Meal Plan': [
            {
              uuid: '6831e9c0-7e00-4d0c-a4c9-c92f43c893cd',
            },
          ],
        },
        guestAges: {
          numberOfAdults: 4,
          agesOfAllChildren: [],
        },
      };

      const availableProductSets = {
        Accommodation: [],
      };

      const result = getAvailableMealPlansForAccommodation(lodgingSummary, availableProductSets);

      expect(result).toMatchObject({});
    });
    it('1 accommodation with 1 product, 3 meal plans each with 1 product', () => {
      const lodging = {
        uuid: 1,
        subProducts: {
          'Meal Plan': [
            {
              uuid: 'b',
            },
          ],
        },
      };

      const availableProductSets = {
        Accommodation: [
          {
            products: [
              {
                uuid: 1,
              },
            ],
            availableSubProductSets: {
              'Meal Plan': [
                {
                  products: [
                    {
                      name: 'Meal Plan A',
                      uuid: 'a',
                    },
                  ],
                  selected: false,
                },
                {
                  products: [
                    {
                      name: 'Meal Plan B',
                      uuid: 'b',
                    },
                  ],
                  selected: true,
                },
                {
                  products: [
                    {
                      name: 'Meal Plan C',
                      uuid: 'c',
                    },
                  ],
                  selected: false,
                },
              ],
            },
          },
        ],
      };

      const availableMealPlans = getAvailableMealPlansForAccommodation(lodging, availableProductSets);

      // expect(availableMealPlans).toMatchObject({ 'Meal Plan A': false, 'Meal Plan B': true, 'Meal Plan C': false });
    });

    // it('1 accommodation with 1 product, ')
  });
});
