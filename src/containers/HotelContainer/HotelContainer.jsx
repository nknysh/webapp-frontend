import React from 'react';

import { propTypes, defaultProps } from './HotelContainer.props';
import {} from './HotelContainer.styles';

export const HotelContainer = ({ id }) => {
  return <h1>{id}</h1>;
};

HotelContainer.propTypes = propTypes;
HotelContainer.defaultProps = defaultProps;

export default HotelContainer;
