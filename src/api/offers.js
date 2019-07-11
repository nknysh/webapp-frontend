import client from './index';

export const getLatestOffers = (params, ...opts) => client.get('/offers/latest', { params, ...opts });

export default { getLatestOffers };
