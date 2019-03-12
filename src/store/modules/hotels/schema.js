import { getDestination } from 'store/modules/destinations/selectors';

export default {
  id: 'uuid',
  index: ['name', 'destinationUuid', 'suitableForHoneymooners', 'availableForOnlineBooking', 'preferred'],
  relationships: {
    destinations: {
      path: ['destinationUuid'],
      resolver: getDestination,
    },
  },
};