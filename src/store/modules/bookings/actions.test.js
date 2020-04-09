import {
  updateBooking,
  getAllErrorsFromCheckResponses,
  buildOccupancyCheckUrlForAccommodationProduct,
} from './actions';

describe('booking actions', () => {
  describe('updateBooking', () => {
    it('calls dispatch thunks', () => {
      const dispatch = jest.fn();

      updateBooking()(dispatch, () => {});

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });

  describe('getAllErrorsFromCheckResponses', () => {
    it('should return an empty error for no responses', () => {
      const allErrors = getAllErrorsFromCheckResponses([]);

      expect(allErrors).toMatchObject([]);
    });

    it('should return nested error arrays for multiple rooms with multiple errors', () => {
      const response1 = {
        data: {
          data: {
            errors: ['1', '2'],
          },
        },
      };

      const response2 = {
        data: {
          data: {
            errors: ['3', '4'],
          },
        },
      };

      const allErrors = getAllErrorsFromCheckResponses([response1, response2]);

      expect(allErrors).toMatchObject([
        ['1', '2'],
        ['3', '4'],
      ]);
    });

    it('should return an array with a nested array only for the responses that had errors', () => {
      const response1 = {
        data: {
          data: {
            errors: ['1', '2'],
          },
        },
      };

      const response2 = {
        data: {
          data: {
            x: 1,
          },
        },
      };

      const allErrors = getAllErrorsFromCheckResponses([response1, response2]);

      expect(allErrors).toMatchObject([['1', '2']]);
    });
  });

  describe('buildOccupancyCheckUrlForAccommodationProduct', () => {
    it('if accommodationRecord is not set, return null', () => {
      const url = buildOccupancyCheckUrlForAccommodationProduct(null, 1);

      expect(url).toEqual(null);
    });

    it('if accommodationProductUuid is not set, return null', () => {
      const url = buildOccupancyCheckUrlForAccommodationProduct({ guestAges: {} }, null);

      expect(url).toEqual(null);
    });

    it('if accommodationRecord.guestAges is not set, return null', () => {
      const url = buildOccupancyCheckUrlForAccommodationProduct({}, null);

      expect(url).toEqual(null);
    });

    it('include numberOfAdults', () => {
      const url = buildOccupancyCheckUrlForAccommodationProduct({ guestAges: { numberOfAdults: 2 } }, 1);
      expect(url).toEqual('/accommodation-products/1/occupancy-check/ages?numberOfAdults=2');
    });

    it('if agesOfAllChildren is empty array, dont include it', () => {
      const url = buildOccupancyCheckUrlForAccommodationProduct(
        { guestAges: { numberOfAdults: 3, agesOfAllChildren: [] } },
        1
      );
      expect(url).toEqual('/accommodation-products/1/occupancy-check/ages?numberOfAdults=3');
    });

    it('if agesOfAllChildren is not empty array, add child age each as array', () => {
      const url = buildOccupancyCheckUrlForAccommodationProduct(
        { guestAges: { numberOfAdults: 3, agesOfAllChildren: [5, 6] } },
        1
      );
      expect(url).toEqual(
        '/accommodation-products/1/occupancy-check/ages?numberOfAdults=3&agesOfAllChildren[]=5&agesOfAllChildren[]=6'
      );
    });
  });
});
