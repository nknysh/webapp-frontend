import React, { memo } from 'react';
import { __, compose, prop, curry } from 'ramda';

import connect from './BookingContainer.state';
// import { propTypes, defaultProps } from './BookingContainer.props';
// import { } from './BookingContainer.styles';

export const BookingContainer = ({ Component, hotel, booking, updateBooking, ...props }) => {
  const bookingUpdate = curry(updateBooking)(prop('uuid', hotel));

  return (
    (Component && <Component onBookingChange={bookingUpdate} hotel={hotel} booking={booking} {...props} />) || null
  );
};

// BookingContainer.propTypes = propTypes;
// BookingContainer.defaultProps = defaultProps;

export default compose(
  connect,
  memo
)(BookingContainer);
