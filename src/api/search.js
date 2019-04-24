import client from './index';

export const getSearch = params => client.get('/search', { params });

export const getSearchByName = (name, params) => client.get(`/search/names/${encodeURI(name)}`, { params });

export default { getSearch, getSearchByName };
