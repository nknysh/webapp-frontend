import client from './index';

export const fetchHotels = params => client.get('/hotels', params);

export default { fetchHotels };
