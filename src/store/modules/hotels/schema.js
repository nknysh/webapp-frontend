import { getDestination } from 'store/modules/destinations/selectors';

export default {
  id: 'uuid',
  index: ['name', 'destinationUuid:title'],
  relationships: {
    destinations: {
      path: ['destinationUuid'],
      resolver: getDestination,
    },
  },
};
