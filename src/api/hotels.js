import client from './index';

export const getHotels = params => client.get('/hotels', { params });

export const getHotel = (id, params) => client.get(`/hotels/${id}`, { params });

export default { getHotels, getHotel };
