import { filterRoomsByCategoryType } from './Rooms';

describe('Rooms', () => {
  describe('filterRoomsByCategoryType', () => {
    it('should filter the rooms by meta.categoryType', () => {
      const rooms = {
        1: {
          uuid: 1,
          meta: {
            categoryType: 'X',
          },
        },
        2: {
          uuid: 2,
          meta: {
            categoryType: 'Y',
          },
        },
      };

      const filteredRooms = filterRoomsByCategoryType(rooms, 'X');

      expect(filteredRooms[1].uuid).toEqual(1);
      expect(filteredRooms[2]).toEqual(undefined);
    });
  });
});
