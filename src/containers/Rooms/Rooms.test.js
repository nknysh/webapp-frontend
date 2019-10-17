import { filterRoomsByCategoryType } from './Rooms';

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
});
