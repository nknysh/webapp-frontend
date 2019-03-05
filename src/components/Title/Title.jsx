import React from 'react';

import peLogo from 'public/img/PE_logo.png';

import { propTypes, defaultProps } from './Title.props';
import { StyledTitle } from './Title.styles';

export const Title = ({ children }) => (
  <StyledTitle>
    <img src={peLogo} />
    {children}
  </StyledTitle>
);

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default Title;
