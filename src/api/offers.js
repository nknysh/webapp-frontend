import client from './index';

export const getLatestOffers = params => client.get('/offers/latest-offers', { params });

export default { getLatestOffers };
