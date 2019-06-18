import { buildQueryString } from 'utils';

import client from './index';

export const getSearch = params => client.get(`/search?${buildQueryString(params)}`);

export const getSearchByName = (name, params) => client.get(`/search/names/${encodeURI(name)}`, { params });

export default { getSearch, getSearchByName };
