import { schema } from 'normalizr';

import { schemaOpts } from 'store/common';

const id = 'code';

export default {
  id,
  index: ['name'],
  schema: new schema.Entity('countries', {}, schemaOpts),
};
