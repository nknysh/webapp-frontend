import { schema } from 'normalizr';

const id = 'code';

export default {
  id,
  index: ['name'],
  schema: new schema.Entity('countries', {}, { idAttribute: id }),
};
