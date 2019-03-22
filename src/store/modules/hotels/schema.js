import { prop } from 'ramda';
import { schema } from 'normalizr';

import hotelSchema from 'store/modules/hotel/schema';

const id = 'uuid';

export default {
  id,
  index: [
    'name',
    'countryCode',
    'suitableForHoneymooners',
    'availableForOnlineBooking',
    'preferred',
    'region',
    'starRating',
  ],
  schema: new schema.Array(prop('schema', hotelSchema)),
};
