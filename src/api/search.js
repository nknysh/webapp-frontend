import client from './index';

export const getSearch = params => client.get('/search', { params });

export default { getSearch };
