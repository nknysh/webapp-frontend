import { prop } from 'ramda';
import { schema } from 'normalizr';

import countriesSchema from 'store/modules/countries/schema';
import hotelsSchema from 'store/modules/hotels/schema';

import { fetchHotelsSuccess } from 'store/modules/hotels/actions';
import { setCountries } from 'store/modules/countries/actions';

export default {
  relationships: {
    hotels: {
      setter: fetchHotelsSuccess,
    },
    countries: {
      setter: setCountries,
    },
  },
  schema: new schema.Entity(
    'results',
    {
      countries: [prop('schema', countriesSchema)],
      hotels: [prop('schema', hotelsSchema)],
    },
    { idAttribute: 'id' }
  ),
};
