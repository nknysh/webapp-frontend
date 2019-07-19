import booking from './md/booking.md';
import bookingOnRequest from './md/booking--on-request.md';
import bookingCC from './md/booking--bt.md';
import bookingBT from './md/booking--cc.md';

import bookingConfirmed from './md/booking-confirmed.md';
import bookingConfirmedOnRequest from './md/booking-confirmed--on-request.md';
import bookingConfirmedCC from './md/booking-confirmed--cc.md';
import bookingConfirmedBT from './md/booking-confirmed--bt.md';
import bookingConfirmedHold from './md/booking-confirmed--hold.md';

import editGuard from './md/edit-guard.md';
import amendBooking from './md/booking-amend.md';
import cancelBooking from './md/booking-cancel.md';
import requestBooking from './md/booking-request.md';

import holdConfirm from './md/hold-confirm.md';
import holdRelease from './md/hold-release.md';

import searchRequired from './md/search-required.md';

import createAccountInfo from './md/create-account--info.md';
import createAccountComplete from './md/create-account--complete.md';
import createAccountErrorExists from './md/create-account--error--exists.md';
import createAccountErrorUnknown from './md/create-account--error--unknown.md';

import loginErrorUnauthorized from './md/login--error--unauthorized.md';
import loginErrorUnknown from './md/login--error--unknown.md';
import loginErrorUnverified from './md/login--error--unverified.md';

import passwordResetDescription from './md/password-reset--description.md';
import passwordResetComplete from './md/password-reset--complete.md';
import passwordResetErrorUnknown from './md/password-reset--error--unknown.md';

import setPasswordErrorUnknown from './md/set-password--error--unknown.md';
import setPasswordErrorExpired from './md/set-password--error--expired.md';

export default {
  setPassword: {
    error: {
      unknown: setPasswordErrorUnknown,
      expired: setPasswordErrorExpired,
    },
  },
  passwordReset: {
    description: passwordResetDescription,
    complete: passwordResetComplete,
    error: {
      unknown: passwordResetErrorUnknown,
    },
  },
  login: {
    error: {
      unauthorized: loginErrorUnauthorized,
      unknown: loginErrorUnknown,
      unverified: loginErrorUnverified,
    },
  },
  createAccount: {
    info: createAccountInfo,
    complete: createAccountComplete,
    error: {
      exists: createAccountErrorExists,
      unknown: createAccountErrorUnknown,
    },
  },
  amendBooking,
  editGuard,
  holdConfirm,
  holdRelease,
  searchRequired,
  booking: {
    cancel: cancelBooking,
    request: requestBooking,
    default: booking,
    onRequest: bookingOnRequest,
    cc: bookingCC,
    bt: bookingBT,
    confirmed: {
      default: bookingConfirmed,
      hold: bookingConfirmedHold,
      onRequest: bookingConfirmedOnRequest,
      cc: bookingConfirmedCC,
      bt: bookingConfirmedBT,
    },
  },
};
