import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { keys, omit, pick } from 'ramda';

import { propTypes, defaultProps } from './Link.props';
import { Link as StyledLink } from './Link.styles';

export const Link = props => {
  const styleProps = keys(propTypes, props);

  return (
    <StyledLink {...pick(styleProps, props)}>
      <RouterLink {...omit(styleProps, props)} />
    </StyledLink>
  );
};

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
