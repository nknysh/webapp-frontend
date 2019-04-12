import complete from './content/complete.md';
import completeBT from './content/completeBT.md';

export default {
  titles: {
    default: 'Booking Form',
    complete: 'Booking Confirmation',
    completeBT: 'Provisional Booking Confirmation',
  },
  content: {
    complete,
    completeBT,
  },
  sections: ['Lead Guest Info', 'Flight Information', 'Special Requests'],
};
