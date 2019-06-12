import booking from './md/booking.md';
import bookingOnRequest from './md/booking--on-request.md';
import bookingCC from './md/booking--bt.md';
import bookingBT from './md/booking--cc.md';

import bookingConfirmed from './md/booking-confirmed.md';
import bookingConfirmedOnRequest from './md/booking-confirmed--on-request.md';
import bookingConfirmedCC from './md/booking-confirmed--cc.md';
import bookingConfirmedBT from './md/booking-confirmed--bt.md';

import editGuard from './md/edit-guard.md';

export default {
  editGuard,
  booking: {
    default: booking,
    onRequest: bookingOnRequest,
    cc: bookingCC,
    bt: bookingBT,
    confirmed: {
      default: bookingConfirmed,
      onRequest: bookingConfirmedOnRequest,
      cc: bookingConfirmedCC,
      bt: bookingConfirmedBT,
    },
  },
};