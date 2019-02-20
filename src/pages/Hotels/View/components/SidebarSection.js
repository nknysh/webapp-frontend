// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Styled } from 'components';

const Container = Styled.View.extend`
  margin-bottom: 20px;
`;

const Line = Styled.View.extend`
  height: 1px;
  background-color: ${colors.gray14};
`;

const Title = Styled.H7.extend`
  margin-top: 20px;
  color: ${colors.gold10};
`;

const SidebarSection = ({ title, children, style }) => (
  <Container style={style}>
    <Line />
    <Title>{title}</Title>
    {children}
  </Container>
);

export default SidebarSection;
