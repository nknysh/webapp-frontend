import React from 'react';
import { compose } from 'ramda';

import connect from './BookingContainer.state';
// import { propTypes, defaultProps } from './BookingContainer.props';
// import { } from './BookingContainer.styles';

export const BookingContainer = ({ hotel, booking, Component }) => {
  return (Component && <Component {...booking} />) || null;
};

// BookingContainer.propTypes = propTypes;
// BookingContainer.defaultProps = defaultProps;

export default compose(connect)(BookingContainer);
