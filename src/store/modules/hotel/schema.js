import { prop } from 'ramda';
import { schema } from 'normalizr';

import { schemaOpts } from 'store/common';
import countrySchema from 'store/modules/countries/schema';

const id = 'uuid';

export const rateSchema = new schema.Entity('rate', {}, schemaOpts);

export default {
  id,
  schema: new schema.Entity(
    'hotel',
    {
      countryCode: prop('schema', countrySchema),
    },
    schemaOpts
  ),
};
