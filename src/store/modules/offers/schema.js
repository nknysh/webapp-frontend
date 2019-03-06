import { getHotel } from 'store/modules/hotels/selectors';

export default {
  relationships: {
    hotels: {
      path: ['hotelUuid'],
      resolver: getHotel,
    },
  },
};
