import client from './index';

export const getHotels = (params, opts) => client.get('/hotels', { params, ...opts });

export const getHotel = (id, params, opts) => client.get(`/hotels/${id}`, { params, ...opts });

export const getHotelRoomRates = (id, params, opts) =>
  client.get(`/accommodation-products/${id}/best-rates`, { params, ...opts });

export default { getHotels, getHotel, getHotelRoomRates };
