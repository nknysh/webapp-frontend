import { getHotel } from 'store/modules/hotels/selectors';

export default {
  id: 'uuid',
  relationships: {
    hotels: {
      path: ['hotelUuid'],
      resolver: getHotel,
    },
  },
};
