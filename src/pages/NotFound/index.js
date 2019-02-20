// Libraries
import React from 'react';

// Components
import { Header, Styled } from 'components';

const Container = Styled.View.extend`
`;

const Content = Styled.View.extend`
  margin-top: 40px;
`;

const Title = Styled.H6.extend`
  text-align: center;
`;

const NotFound = () => (
  <Container>
    <Header />
    <Content>
      <Title>Page Not Found</Title>
    </Content>
  </Container>
);

export default NotFound;
