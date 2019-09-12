import lunr from 'lunr';
import { map } from 'ramda';

import { successAction } from 'store/common';

export const INDEXING = 'INDEXING';

/**
 * Indexing action
 *
 * @param {object} payload
 * @returns {object}
 */
export const indexing = payload => ({
  type: INDEXING,
  payload,
});

/**
 * New index
 *
 * Creates a new lunr index instance for use
 *
 * @param {string} ref
 * @param {Array} fields
 * @param {Array} data
 * @returns {object}
 */
function newIndex(ref, fields = [], data = []) {
  return lunr(function() {
    this.ref(ref);

    const buildField = field => this.field(field);
    const addDoc = doc => this.add(doc);

    map(buildField, fields);
    map(addDoc, data);
  });
}

/**
 * Index
 *
 * Creates a new lunr index and stores it in redux
 *
 * @param {object} payload
 * @returns {Function}
 */
export const index = payload => dispatch => {
  const { index, ref, fields, data } = payload;

  dispatch(indexing(payload));

  const built = newIndex(ref, fields, data);

  dispatch(successAction(INDEXING, { [index]: built }));
};
