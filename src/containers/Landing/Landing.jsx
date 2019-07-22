import React from 'react';
import { compose } from 'ramda';

import { Loader, Container } from 'components';
import LatestOffers from 'containers/LatestOffers';
import SearchBar from 'containers/SearchBar';
import { useFetchData } from 'effects';

import heroData from 'config/pages/search/hero.md';
import heroImage from 'config/pages/search/assets/hero-image.png';

import connect from './Landing.state';
import { propTypes, defaultProps } from './Landing.props';
import { StyledLanding, LandingHero, LandingMarkdown } from './Landing.styles';

export const Landing = ({ fetchLatestOffers, offersStatus, offers }) => {
  const loaded = useFetchData(offersStatus, fetchLatestOffers, [{ limit: 3 }]);

  return (
    <Loader isLoading={!loaded}>
      <StyledLanding>
        <LandingHero mask media={{ image: heroImage }}>
          <LandingMarkdown>{heroData}</LandingMarkdown>
          <Container>
            <SearchBar />
          </Container>
        </LandingHero>
        <LatestOffers offers={offers} />
      </StyledLanding>
    </Loader>
  );
};

Landing.propTypes = propTypes;
Landing.defaultProps = defaultProps;

export default compose(connect)(Landing);
