import { getDestination } from 'store/modules/destinations/selectors';

export default {
  relationships: {
    destinations: {
      path: ['destinationUuid'],
      resolver: getDestination,
    },
  },
};
