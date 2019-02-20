// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Styled } from 'components';

const Container = Styled.View.extend`
  padding-vertical: 30px;
  padding-horizontal: 20px;
  background-color: ${colors.gray16};
`;

const Title = Styled.H7.extend`
  color: ${colors.gold10};
`;

const Line = Styled.View.extend`
  margin-top: 10px;
  height: 1px;
  background-color: ${colors.gray14};
`;

const SidebarSection = ({ title, children, style }) => (
  <Container style={style}>
    <Title>{title}</Title>
    <Line />
    {children}
  </Container>
);

export default SidebarSection;
