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

import holdConfirm from './md/hold-confirm.md';
import holdRelease from './md/hold-release.md';

import searchRequired from './md/search-required.md';

export default {
  amendBooking,
  editGuard,
  holdConfirm,
  holdRelease,
  searchRequired,
  booking: {
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
