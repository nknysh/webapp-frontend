import { prop } from 'ramda';
import { schema } from 'normalizr';

import countriesSchema from 'store/modules/countries/schema';
import hotelSchema from 'store/modules/hotel/schema';

import { fetchHotelsSuccess } from 'store/modules/hotels/actions';
import { setCountries } from 'store/modules/countries/actions';

export default {
  relationships: {
    hotel: {
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
      hotels: [prop('schema', hotelSchema)],
    },
    { idAttribute: 'id' }
  ),
};
