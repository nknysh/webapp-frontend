import React from 'react';

import { SearchBar, LatestOffers } from 'containers';
import { Container } from 'styles/elements';

import heroData from 'config/pages/search/hero.md';
import heroImage from 'config/pages/search/assets/hero-image.png';

import { StyledSearch, SearchHero, SearchMarkdown } from './HomeAuthenticated.styles';

export const HomeAuthenticated = () => {
  return (
    <StyledSearch>
      <SearchHero mask media={{ image: heroImage }}>
        <SearchMarkdown>{heroData}</SearchMarkdown>
        <Container>
          <SearchBar />
        </Container>
      </SearchHero>
      <LatestOffers />
    </StyledSearch>
  );
};

export default HomeAuthenticated;
