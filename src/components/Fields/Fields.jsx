import React from 'react';

import { propTypes, defaultProps } from './Fields.props';
import { StyledFields } from './Fields.styles';

export const Fields = ({ children }) => <StyledFields>{children}</StyledFields>;

Fields.propTypes = propTypes;
Fields.defaultProps = defaultProps;

export default Fields;
