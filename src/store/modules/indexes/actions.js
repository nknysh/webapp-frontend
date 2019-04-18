import lunr from 'lunr';
import { map } from 'ramda';

import { successAction } from 'store/common';

export const INDEXING = 'INDEXING';

export const indexing = payload => ({
  type: INDEXING,
  payload,
});

function newIndex(ref, fields = [], data = []) {
  return lunr(function() {
    this.ref(ref);

    const buildField = field => this.field(field);
    const addDoc = doc => this.add(doc);

    map(buildField, fields);
    map(addDoc, data);
  });
}

export const index = payload => dispatch => {
  const { index, ref, fields, data } = payload;

  dispatch(indexing(payload));

  const built = newIndex(ref, fields, data);

  dispatch(successAction(INDEXING, { [index]: built }));
};
