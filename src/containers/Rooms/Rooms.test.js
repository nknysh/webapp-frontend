import { filterRoomsByCategoryType, doGuestAgesFitInsideLodging, numbersInArrayBetweenRange } from './Rooms';

describe('Rooms', () => {
  describe('filterRoomsByCategoryType', () => {
    it('should filter the rooms by meta.categoryType', () => {
      const rooms = [
        {
          uuid: 1,
          categoryType: 'X',
        },
        {
          uuid: 2,
          categoryType: 'Y',
        },
      ];

      const filteredRooms = filterRoomsByCategoryType(rooms, 'X');

      expect(filteredRooms[0].uuid).toEqual(1);
      expect(filteredRooms[1]).toEqual(undefined);
    });
  });

  describe('numbersInArrayBetweenRange', () => {
    it('count numbers from 0 to 10 including 10', () => {
      const nums = [1, 5, 8, 11, 10];
      expect(numbersInArrayBetweenRange(nums, 0, 10)).toEqual(4);
    });
  });

  describe('doGuestAgesFitInsideLodging', () => {
    it('2 adults (passing)', () => {
      const guestAges = {
        numberOfAdults: 2,
        agesOfAllChildren: [],
      };

      const occupancy = {
        standardOccupancy: 2,
        maximumPeople: 4,
        limits: [
          {
            name: 'default',
            minimum: 1,
            maximum: 2,
          },
        ],
      };

      const ages = [
        {
          name: 'Infant',
          ageFrom: 0,
          ageTo: 4,
        },
      ];

      expect(doGuestAgesFitInsideLodging(guestAges, occupancy, ages)).toEqual(true);
    });

    it('2 adults with too many infants', () => {
      const guestAges = {
        numberOfAdults: 2,
        agesOfAllChildren: [1, 1, 3, 4],
      };

      const occupancy = {
        standardOccupancy: 2,
        maximumPeople: 4,
        limits: [
          {
            name: 'default',
            minimum: 1,
            maximum: 2,
          },
          {
            name: 'Infant',
            minimum: 1,
            maximum: 2,
          },
        ],
      };

      const ages = [
        {
          name: 'Infant',
          ageFrom: 0,
          ageTo: 4,
        },
      ];

      expect(doGuestAgesFitInsideLodging(guestAges, occupancy, ages)).toEqual(false);
    });

    it('2 adults with infants, too many in total', () => {
      const guestAges = {
        numberOfAdults: 2,
        agesOfAllChildren: [1, 1, 3],
      };

      const occupancy = {
        standardOccupancy: 2,
        maximumPeople: 4,
        limits: [
          {
            name: 'default',
            minimum: 1,
            maximum: 2,
          },
          {
            name: 'Infant',
            minimum: 0,
            maximum: 3,
          },
        ],
      };

      const ages = [
        {
          name: 'Infant',
          ageFrom: 0,
          ageTo: 4,
        },
      ];

      expect(doGuestAgesFitInsideLodging(guestAges, occupancy, ages)).toEqual(false);
    });

    it('not enough adults', () => {
      const guestAges = {
        numberOfAdults: 1,
        agesOfAllChildren: [],
      };

      const occupancy = {
        standardOccupancy: 2,
        maximumPeople: 4,
        limits: [
          {
            name: 'default',
            minimum: 2,
            maximum: 3,
          },
          {
            name: 'Infant',
            minimum: 0,
            maximum: 3,
          },
        ],
      };

      const ages = [
        {
          name: 'Infant',
          ageFrom: 0,
          ageTo: 4,
        },
      ];

      expect(doGuestAgesFitInsideLodging(guestAges, occupancy, ages)).toEqual(false);
    });

    it('not enough Children', () => {
      const guestAges = {
        numberOfAdults: 1,
        agesOfAllChildren: [7],
      };

      const occupancy = {
        standardOccupancy: 2,
        maximumPeople: 4,
        limits: [
          {
            name: 'default',
            minimum: 1,
            maximum: 3,
          },
          {
            name: 'Infant',
            minimum: 0,
            maximum: 3,
          },
          {
            name: 'Child',
            minimum: 2,
            maximum: 3,
          },
        ],
      };

      const ages = [
        {
          name: 'Infant',
          ageFrom: 0,
          ageTo: 4,
        },
        {
          name: 'Child',
          ageFrom: 5,
          ageTo: 11,
        },
      ];

      expect(doGuestAgesFitInsideLodging(guestAges, occupancy, ages)).toEqual(false);
    });
  });
});
