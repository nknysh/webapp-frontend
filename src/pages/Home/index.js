// Libraries
import React from 'react';

// Components
import { Footer, Styled } from 'components';
import { HeroSection } from './components';

const Container = Styled.View.extend`
`;

const Content = Styled.View.extend`
`;

const Home = () => (
  <Container>
    <Content>
      <HeroSection />
      <Footer />
    </Content>
  </Container>
);

export default Home;
