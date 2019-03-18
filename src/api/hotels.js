import client from './index';

export const getHotels = params => client.get('/hotels', { params });

export default { getHotels };
