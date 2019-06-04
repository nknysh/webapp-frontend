import { equals } from 'ramda';

export const API_BASE_URL = process.env.API_BASE_URL;
export const ADMIN_BASE_URL = process.env.ADMIN_BASE_URL;
export const APP_ENV = process.env.NODE_ENV;
export const PAYMENT_ENABLED = equals('true', process.env.PAYMENT_ENABLED);
export const BOOKINGS_ON_REQUEST = equals('true', process.env.BOOKINGS_ON_REQUEST);

export const isDev = equals('development', APP_ENV);

export default {
  defaults: {
    dateFormat: 'YYYY-MM-DD',
    priceRange: [1000, 10000],
  },
};
