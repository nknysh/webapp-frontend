import React from 'react';
import { compose } from 'ramda';

import { Loader } from 'components';
import { useFetchData } from 'effects';

import connect from './LatestOffers.state';
// import { propTypes, defaultProps } from './LatestOffers.props';
import { StyledLatestOffers, Title } from './LatestOffers.styles';

export const LatestOffers = ({ fetchOffers, offers }) => {
  useFetchData(fetchOffers, offers);

  console.log('offers', offers);

  return (
    <StyledLatestOffers>
      <Title>PURE ESCAPES LATEST OFFERS</Title>
      <Loader isLoading={!offers} />
    </StyledLatestOffers>
  );
};

// LatestOffers.propTypes = propTypes;
// LatestOffers.defaultProps = defaultProps;

export default compose(connect)(LatestOffers);
