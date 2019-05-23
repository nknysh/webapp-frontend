import { prop } from 'ramda';
import { schema } from 'normalizr';

import { schemaOpts } from 'store/common';
import countriesSchema from 'store/modules/countries/schema';
import hotelSchema from 'store/modules/hotel/schema';

export default {
  schema: new schema.Entity(
    'results',
    {
      countries: [prop('schema', countriesSchema)],
      hotels: [prop('schema', hotelSchema)],
    },
    schemaOpts
  ),
};
