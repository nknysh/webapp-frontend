import React from 'react';
import { compose } from 'ramda';

import { Loader } from 'components';
import { SearchBar, LatestOffers } from 'containers';
import { useFetchDataMultiple } from 'effects';

import { Container } from 'styles/elements';

import heroData from 'config/pages/search/hero.md';
import heroImage from 'config/pages/search/assets/hero-image.png';

import connect from './Landing.state';
import { propTypes, defaultProps } from './Landing.props';
import { StyledSearch, SearchHero, SearchMarkdown } from './Landing.styles';

export const Landing = ({ fetchLatestOffers, fetchHotels, hotelsStatus, offersStatus, hotels, countries, offers }) => {
  const loaded = useFetchDataMultiple([[hotelsStatus, fetchHotels], [offersStatus, fetchLatestOffers, { limit: 3 }]]);

  return (
    <Loader isLoading={!loaded}>
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
