import React from 'react';
import { Helmet } from 'react-helmet';

import { ErrorBoundary } from 'hoc/ErrorBoundary';

import { Hero, Markdown } from 'components';

import heroData from 'config/data/home/hero.md';

import tempHeroImage from './assets/temp-hero-image.jpg';

import { propTypes } from './Home.props';
import { StyledHome } from './Home.styles';

export const Home = () => (
  <StyledHome>
    <Helmet>
      <title>Pure Escapes</title>
    </Helmet>
    <Hero full offsetBy={120} image={tempHeroImage}>
      <Markdown>{heroData}</Markdown>
    </Hero>
  </StyledHome>
);

Home.propTypes = propTypes;

export default ErrorBoundary(Home);
