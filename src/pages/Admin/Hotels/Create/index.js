// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Header, Styled } from 'components';
import { HotelCreateForm } from './components';

const Container = Styled.View.extend`
`;

const Content = Styled.View.extend`
  align-self: center;
  width: 1160px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: ${colors.gray14};
`;

const HotelCreate = () => (
  <Container>
    <Header />
    <Content>
      <HotelCreateForm />
    </Content>
  </Container>
);

export default HotelCreate;
