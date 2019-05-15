import React from 'react';
import { prop } from 'ramda';

import config from 'config/ui';

import peLogo from 'public/assets/img/PE_logo.png';

import { propTypes, defaultProps } from './Title.props';
import { StyledTitle } from './Title.styles';

export const Title = ({ children }) => (
  <StyledTitle>
    <img src={peLogo} alt={prop('title', config)} />
    {children}
  </StyledTitle>
);

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default Title;
