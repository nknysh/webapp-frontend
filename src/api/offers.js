import client from './index';

export const getLatestOffers = params => client.get('/offers/latest', { params });

export default { getLatestOffers };
