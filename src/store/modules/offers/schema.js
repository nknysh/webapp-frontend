import { prop } from 'ramda';
import { schema } from 'normalizr';

import { schemaOpts } from 'store/common';
import { setHotels } from 'store/modules/hotels/actions';
import { default as hotelSchema, rateSchema } from 'store/modules/hotel/schema';

const id = 'uuid';

// Attach the rate directly to the offer
const processStrategy = value => ({
  ...value,
  offer: {
    ...prop('offer', value),
    rate: prop('rate', value),
  },
});

export const offerSchema = new schema.Entity('offer', {}, schemaOpts);
export const offersSchema = new schema.Entity(
  'offers',
  {
    offer: offerSchema,
    hotel: prop('schema', hotelSchema),
    rate: rateSchema,
  },
  { ...schemaOpts, ...{ processStrategy } }
);

export default {
  id,
  relationships: {
    hotel: {
      setter: setHotels,
    },
  },
  schema: new schema.Array(offersSchema),
};
