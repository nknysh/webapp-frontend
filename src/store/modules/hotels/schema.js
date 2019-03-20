import { prop } from 'ramda';
import { schema } from 'normalizr';

import countrySchema from 'store/modules/countries/schema';

const id = 'uuid';

const hotelSchema = new schema.Entity(
  'hotel',
  {
    countryCode: prop('schema', countrySchema),
  },
  { idAttribute: id }
);

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
  schema: new schema.Entity('hotels', { data: [hotelSchema] }, { idAttribute: id }),
};
