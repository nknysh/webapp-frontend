import React from 'react';
import { compose, pipe, path, map, values, when, complement, isNil } from 'ramda';
import hash from 'object-hash';

import uiConfig from 'config/ui';

import { Loader, Offer } from 'components';
import { useFetchData } from 'effects';

import connect from './LatestOffers.state';
import { propTypes, defaultProps } from './LatestOffers.props';
import { StyledLatestOffers, Title, Offers } from './LatestOffers.styles';

const renderOffer = offer => <Offer key={hash(offer)} offer={offer} />;

const renderOffers = when(
  complement(isNil),
  pipe(
    map(renderOffer),
    values
  )
);

export const LatestOffers = ({ fetchOffers, offers }) => {
  useFetchData(fetchOffers, offers);

  const renderedOffers = renderOffers(offers);

  return (
    <StyledLatestOffers>
      <Title>{path(['sections', 'latestOffers'], uiConfig)}</Title>
      <Loader isLoading={!renderedOffers}>
        <Offers>{renderedOffers}</Offers>
      </Loader>
    </StyledLatestOffers>
  );
};

LatestOffers.propTypes = propTypes;
LatestOffers.defaultProps = defaultProps;

export default compose(connect)(LatestOffers);
