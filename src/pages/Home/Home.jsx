import React, { useRef, Fragment } from 'react';
import { compose, prop, map } from 'ramda';
import hash from 'object-hash';

import { windowExists } from 'utils/window';

import { Hero, Markdown } from 'components';
import { ErrorBoundary } from 'hoc/ErrorBoundary';

import heroData from 'config/data/home/hero.md';
import section1 from 'config/data/home/section-1.md';
import section2 from 'config/data/home/section-2.md';
import section3 from 'config/data/home/section-3.md';
import section4 from 'config/data/home/section-4.md';
import section5 from 'config/data/home/section-5.md';

import homeVideo from 'config/data/home/assets/home-video.mp4';
import heroImage from 'config/data/home/assets/home-hero-image.jpg';
import section1Image from 'config/data/home/assets/section-1.jpg';
import section2Image from 'config/data/home/assets/section-2.jpg';
import section3Image from 'config/data/home/assets/section-3.jpg';

import { propTypes } from './Home.props';
import { StyledHome, MoveTo, HomeSection, HomeContainer, HomeHero } from './Home.styles';

const scrollTo = targetRef => {
  if (!targetRef.current || !windowExists.scrollTo) return;

  windowExists.scrollTo({
    top: targetRef.current.offsetTop,
    left: 0,
    behavior: 'smooth',
  });
};

// eslint-disable-next-line
const renderSection = ({ content, image, moveTo, ref }) => (
  <Fragment key={hash({ content, image })}>
    <HomeSection ref={ref}>
      {moveTo && <MoveTo onClick={() => scrollTo(moveTo)}>keyboard_arrow_down</MoveTo>}
      <HomeContainer>
        <Markdown>{content}</Markdown>
      </HomeContainer>
    </HomeSection>
    {image && <HomeHero media={{ image }} />}
  </Fragment>
);

const renderSections = map(renderSection);

export const Home = () => {
  const sectionRefs = {
    section1: useRef(undefined),
    section2: useRef(undefined),
    section3: useRef(undefined),
    section4: useRef(undefined),
    section5: useRef(undefined),
  };

  const sections = [
    {
      content: section1,
      image: section1Image,
      moveTo: prop('section1', sectionRefs),
      ref: sectionRefs.section1,
    },
    {
      content: section2,
      image: section2Image,
      ref: sectionRefs.section2,
    },
    {
      content: section3,
      image: section3Image,
      ref: sectionRefs.section3,
    },
    {
      content: section4,
      image: section1Image,
      ref: sectionRefs.section4,
    },

    {
      content: section5,
      ref: sectionRefs.section5,
    },
  ];

  return (
    <StyledHome>
      <Hero full media={{ image: heroImage, video: { path: homeVideo, type: 'mp4' } }}>
        <Markdown>{heroData}</Markdown>
      </Hero>
      {renderSections(sections)}
    </StyledHome>
  );
};

Home.propTypes = propTypes;

export default compose(ErrorBoundary)(Home);
