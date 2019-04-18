import { prop } from 'ramda';
import { schema } from 'normalizr';

import { schemaOpts } from 'store/common';
import countriesSchema from 'store/modules/countries/schema';
import hotelSchema from 'store/modules/hotel/schema';

import { setHotels } from 'store/modules/hotels/actions';
import { setCountries } from 'store/modules/countries/actions';

export default {
  relationships: {
    hotel: {
      setter: setHotels,
    },
    countries: {
      setter: setCountries,
    },
  },
  schema: new schema.Entity(
    'results',
    {
      countries: [prop('schema', countriesSchema)],
      hotels: [prop('schema', hotelSchema)],
    },
    schemaOpts
  ),
};
