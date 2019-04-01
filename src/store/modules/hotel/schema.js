import { prop } from 'ramda';
import { schema } from 'normalizr';

import countrySchema from 'store/modules/countries/schema';

const id = 'uuid';

export const roomSchema = new schema.Entity('rooms', {}, { idAttribute: id });

export default {
  id,
  schema: new schema.Entity(
    'hotel',
    {
      countryCode: prop('schema', countrySchema),
      rooms: [roomSchema],
    },
    { idAttribute: id }
  ),
};
