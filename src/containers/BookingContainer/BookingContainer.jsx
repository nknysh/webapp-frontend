import React, { memo } from 'react';
import { compose, prop, curry } from 'ramda';

import connect from './BookingContainer.state';
import { propTypes, defaultProps } from './BookingContainer.props';

export const BookingContainer = ({ Component, hotel, booking, updateBooking, updateBookingExtras, ...props }) => {
  const bookingUpdate = curry(updateBooking)(prop('uuid', hotel));
  const bookingExtrasUpdate = curry(updateBookingExtras)(prop('uuid', hotel));

  return (
    (Component && (
      <Component
        onBookingChange={bookingUpdate}
        onBookingExtrasChange={bookingExtrasUpdate}
        hotel={hotel}
        booking={booking}
        {...props}
      />
    )) ||
    null
  );
};

BookingContainer.propTypes = propTypes;
BookingContainer.defaultProps = defaultProps;

export default compose(
  connect,
  memo
)(BookingContainer);
