import React from 'react';

import { HotelBookingContainer } from 'containers';

import { propTypes, defaultProps } from './HotelBooking.props';

export const Hotel = ({
  match: {
    params: { id },
  },
}) => <HotelBookingContainer id={id} />;

Hotel.propTypes = propTypes;
Hotel.defaultProps = defaultProps;

export default Hotel;
