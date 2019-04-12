import React from 'react';
import { equals } from 'ramda';

import { HotelBookingContainer } from 'containers';

import { propTypes, defaultProps } from './HotelBooking.props';

export const Hotel = ({
  match: {
    params: { id, complete },
  },
}) => <HotelBookingContainer id={id} isComplete={equals('complete', complete)} />;

Hotel.propTypes = propTypes;
Hotel.defaultProps = defaultProps;

export default Hotel;
