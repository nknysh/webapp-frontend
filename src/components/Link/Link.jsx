import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { keys, omit, pick, prop } from 'ramda';

import { propTypes, defaultProps } from './Link.props';
import { StyledLink, PlainLink } from './Link.styles';

export const Link = ({ children, ...props }) => {
  const styleProps = keys(propTypes, props);
  const linkProps = omit(styleProps, props);

  return (
    <StyledLink {...pick(styleProps, props)}>
      {prop('to', props) ? (
        <RouterLink {...linkProps}>{children}</RouterLink>
      ) : (
        <PlainLink {...linkProps}>{children}</PlainLink>
      )}
    </StyledLink>
  );
};

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
