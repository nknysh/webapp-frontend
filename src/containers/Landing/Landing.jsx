import React from 'react';
import { compose, isNil } from 'ramda';

import { Loader } from 'components';
import { SearchBar, LatestOffers } from 'containers';
import { useFetchData } from 'effects';
import { isEmptyOrNil } from 'utils';

import { Container } from 'styles/elements';

import heroData from 'config/pages/search/hero.md';
import heroImage from 'config/pages/search/assets/hero-image.png';

import connect from './Landing.state';
import { propTypes, defaultProps } from './Landing.props';
import { StyledSearch, SearchHero, SearchMarkdown } from './Landing.styles';

export const Landing = ({ offers, fetchLatestOffers, fetchHotels, hotels, countries, requesting }) => {
  useFetchData(fetchHotels, hotels);
  useFetchData(() => fetchLatestOffers({ limit: 3 }), offers);

  const isLoading = requesting || isEmptyOrNil(hotels) || isEmptyOrNil(countries) || isNil(offers);

  return (
    <Loader isLoading={isLoading}>
      <StyledSearch>
        <SearchHero mask media={{ image: heroImage }}>
          <SearchMarkdown>{heroData}</SearchMarkdown>
          <Container>
            <SearchBar hotels={hotels} countries={countries} />
          </Container>
        </SearchHero>
        <LatestOffers offers={offers} />
      </StyledSearch>
    </Loader>
  );
};

Landing.propTypes = propTypes;
Landing.defaultProps = defaultProps;

export default compose(connect)(Landing);
