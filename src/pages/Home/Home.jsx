import React from 'react';

import { Hero, Markdown } from 'components';
import { ErrorBoundary } from 'hoc/ErrorBoundary';

import heroData from 'config/data/home/hero.md';

import tempHeroImage from './assets/temp-hero-image.jpg';
import homeVideo from './assets/home-video.mp4';

import { propTypes } from './Home.props';
import { StyledHome } from './Home.styles';

export const Home = () => {
  return (
    <StyledHome>
      <Hero full media={{ image: tempHeroImage, video: { path: homeVideo, type: 'mp4' } }}>
        <Markdown>{heroData}</Markdown>
      </Hero>
    </StyledHome>
  );
};

Home.propTypes = propTypes;

export default ErrorBoundary(Home);
