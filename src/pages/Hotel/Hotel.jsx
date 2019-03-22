import React from 'react';

import { HotelContainer } from 'containers';

import { propTypes, defaultProps } from './Hotel.props';

export const Hotel = ({
  match: {
    params: { id },
  },
}) => <HotelContainer id={id} />;

Hotel.propTypes = propTypes;
Hotel.defaultProps = defaultProps;

export default Hotel;
