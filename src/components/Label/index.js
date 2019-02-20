// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import Styled from '../Styled';

const Text = Styled.H8.extend`
  color: ${colors.gold10};
`;

const Label = ({ children, ...props }) => (
  <label {...props}><Text>{children}</Text></label>
);

export default Label;
