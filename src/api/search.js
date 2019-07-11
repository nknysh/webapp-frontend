import { buildQueryString } from 'utils';

import client from './index';

export const getSearch = (query, params, opts) => client.get(`/search?${buildQueryString(query)}`, { params, ...opts });

export const getSearchByName = (term, params, opts) =>
  client.get(`/search/names/${encodeURI(term)}`, { params, ...opts });

export default { getSearch, getSearchByName };
