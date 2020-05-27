import { defaultTo, equals, split } from 'ramda';

export const APP_ENV = process.env.NODE_ENV;
export const APP_VERBOSE_ERRORS = equals('true', process.env.APP_VERBOSE_ERRORS);

export const API_BASE_URL = defaultTo('/api', process.env.API_BASE_URL);
export const ADMIN_BASE_URL = process.env.ADMIN_BASE_URL;

export const PAYMENT_ENABLED = equals('true', process.env.PAYMENT_ENABLED);
export const BOOKINGS_ON_REQUEST = equals('true', process.env.BOOKINGS_ON_REQUEST);

export const DRIFT_APP_ID = process.env.DRIFT_APP_ID;
export const DRIFT_ENABLED_ROLES = process.env.DRIFT_ENABLED_ROLES
  ? split(',', process.env.DRIFT_ENABLED_ROLES)
  : ['all'];

export const isDev = equals('development', APP_ENV);

const DISPLAY_DATE_FORMAT = 'dd MMM yy';
const DISPLAY_TIME_FORMAT = 'HH:mm';

export const BOOKING_TERMS_URL = defaultTo(
  'https://static-pure-escapes-com.s3-eu-west-1.amazonaws.com/booking-terms-and-conditions.pdf',
  process.env.BOOKING_TERMS_URL
);

export const SENTRY_DSN = process.env.SENTRY_DSN;
export const SENTRY_ENV = process.env.SENTRY_ENV || process.env.NODE_ENV || 'developer-no-env-set';

export const CIRCLE_BUILD_NUM = process.env.CIRCLE_BUILD_NUM || '0.0.0';
export const CHECK_APP_VERSION_TIME_INTERVAL = parseInt(process.env.CHECK_APP_VERSION_TIME_INTERVAL, 10) || 5000;
export const LOCAL_DEPLOY_URL = 'http://localhost:8080';
export const CURR_DEPLOY_BASE_URL = process.env.CURR_DEPLOY_BASE_URL || LOCAL_DEPLOY_URL;

export default {
  defaults: {
    dateFormat: 'yyyy-MM-dd',
    displayDateFormat: DISPLAY_DATE_FORMAT,
    displayTimeFormat: DISPLAY_TIME_FORMAT,
    displayDateTimeFormat: `${DISPLAY_DATE_FORMAT}, ${DISPLAY_TIME_FORMAT}`,
    priceRange: [1000, 10000],
  },
};
