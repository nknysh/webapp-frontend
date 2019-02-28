import React from 'react';

import { Markdown } from 'components';

import heroData from 'config/data/search/hero.md';
import heroImage from 'config/data/search/assets/hero-image.png';

import { StyledSearch, SearchHero } from './Search.styles';

export const Search = () => {
  return (
    <StyledSearch>
      <SearchHero mask media={{ image: heroImage }}>
        <Markdown>{heroData}</Markdown>
      </SearchHero>
    </StyledSearch>
  );
};

export default Search;
