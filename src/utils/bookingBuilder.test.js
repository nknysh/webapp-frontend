import React from 'react';

import {
  getTitleForAccommodationUuid,
  getNightsBreakdownForDates,
  getOccupancyBreakdownForAccommodation,
  getOccassionsBreakdownForLodging,
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

  // TODO investigate better method of testing DOM nodes
  describe.skip('getNightsBreakdownForDates', () => {
    it('should calculate nights and dates', () => {
      console.log(
        JSON.stringify(
          (
            <span>
              <strong>7 nights</strong> | 6th Dec 2019 - 13th Dec 2019
            </span>
          ).toString()
        )
      );
      // expect(getNightsBreakdownForDates('2019-12-06', '2019-12-13')).toEqual(
      //   // '7 nights | 6th Dec 2019 - 13th Dec 2019'
      //   console.log(JSON.stringify(<span>
      //     <strong>7 nights</strong> | 6th Dec 2019 - 13th Dec 2019
      //   </span>)
      // );
    });

    it('should work for 1 night', () => {
      expect(getNightsBreakdownForDates('2019-12-01', '2019-12-02')).toEqual(
        <span>
          <strong>1 night</strong> | 1st Dec 2019 - 2nd Dec 2019
        </span>
      );
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

  describe('getOccassionsBreakdownForLodging', () => {
    it('0 applied gives null', () => {
      const lodging = {};

      expect(getOccassionsBreakdownForLodging(lodging)).toEqual(null);
    });

    it('1 applied gives single string', () => {
      const lodging = {
        honeymoon: true,
      };

      expect(getOccassionsBreakdownForLodging(lodging)).toEqual('honeymoon');
    });

    it('2 applied gives ampersand joined string', () => {
      const lodging = {
        honeymoon: true,
        birthday: true,
      };

      expect(getOccassionsBreakdownForLodging(lodging)).toEqual('honeymoon & birthday');
    });

    it('3 applied gives comma separated ampersand joined string', () => {
      const lodging = {
        honeymoon: true,
        wedding: true,
        birthday: true,
      };

      expect(getOccassionsBreakdownForLodging(lodging)).toEqual('honeymoon, birthday & wedding');
    });

    it('4 applied gives comma separated ampersand joined string', () => {
      const lodging = {
        honeymoon: true,
        wedding: true,
        birthday: true,
        anniversary: true,
      };

      expect(getOccassionsBreakdownForLodging(lodging)).toEqual('honeymoon, birthday, anniversary & wedding');
    });
  });
});
