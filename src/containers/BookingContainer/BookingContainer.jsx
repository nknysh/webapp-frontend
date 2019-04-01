import React, { memo } from 'react';
import { compose } from 'ramda';

import connect from './BookingContainer.state';
// import { propTypes, defaultProps } from './BookingContainer.props';
// import { } from './BookingContainer.styles';

export const BookingContainer = ({ Component, ...props }) => {
  return (Component && <Component {...props} />) || null;
};

// BookingContainer.propTypes = propTypes;
// BookingContainer.defaultProps = defaultProps;

export default compose(
  connect,
  memo
)(BookingContainer);
