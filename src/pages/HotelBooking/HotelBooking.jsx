import React from 'react';
import { equals } from 'ramda';

import { HotelBookingContainer } from 'containers';

import { propTypes, defaultProps } from './HotelBooking.props';

export const Hotel = ({
  match: {
    params: { id, stage },
  },
}) => {
  const props = {
    id,
    holdOnly: equals('hold', stage),
  };

  return <HotelBookingContainer {...props} />;
};

Hotel.propTypes = propTypes;
Hotel.defaultProps = defaultProps;

export default Hotel;
