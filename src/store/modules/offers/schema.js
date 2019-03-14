import { getHotel } from 'store/modules/hotels/selectors';

export default {
  id: 'uuid',
  relationships: {
    hotels: {
      // Flat relationship path
      path: ['hotelUuid'],

      // Included relationship object
      included: ['hotel'],

      resolver: getHotel,
    },
  },
};
