import React from 'react';

import { ErrorBoundary } from 'hoc/ErrorBoundary';

import { Hero } from 'components/Hero';

import { StyledHome } from './Home.styles';
import tempHeroImage from './assets/temp-hero-image.jpg';

export const Home = () => (
  <StyledHome>
    <Hero full offsetBy={120} image={tempHeroImage}>
      <p>FOR YOUR HIGHLY-DISCERNING</p>
      <p>INDIAN OCEAN TRAVELLERS,</p>
      <p>THE ADVANTAGES ARE CLEAR</p>
    </Hero>
  </StyledHome>
);

export default ErrorBoundary(Home);
