import React from 'react';
import { prop, omit } from 'ramda';

import { propTypes, defaultProps } from './Link.props';
import { StyledLink, Link as PlainLink } from './Link.styles';

const omitProps = omit(['hard', 'onLinkClick']);

export const Link = ({ children, inverse, spaced, bold, ...props }) =>
  prop('to', props) ? (
    <StyledLink data-inverse={inverse} data-spaced={spaced} data-bold={bold} {...omitProps(props)}>
      {children}
    </StyledLink>
  ) : (
    <PlainLink data-inverse={inverse} data-spaced={spaced} data-bold={bold} {...omitProps(props)}>
      {children}
    </PlainLink>
  );

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
