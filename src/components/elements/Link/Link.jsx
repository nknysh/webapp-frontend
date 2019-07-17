import React from 'react';
import { prop } from 'ramda';

import { propTypes, defaultProps } from './Link.props';
import { StyledLink, Link as PlainLink } from './Link.styles';

export const Link = ({ children, ...props }) =>
  prop('to', props) ? <StyledLink {...props}>{children}</StyledLink> : <PlainLink {...props}>{children}</PlainLink>;

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
