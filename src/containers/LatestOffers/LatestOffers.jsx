import React from 'react';
import { compose, pipe, path, map, values, when, complement, isNil } from 'ramda';
import hash from 'object-hash';

import uiConfig from 'config/ui';
import theme from 'styles/theme';

import { Loader, Offer, Slider } from 'components';
import { useFetchData, useCurrentWidth } from 'effects';

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

export const LatestOffers = ({ fetchLatestOffers, offers }) => {
  useFetchData(() => fetchLatestOffers({ limit: 3 }), offers);
  const currentWidth = useCurrentWidth();

  const isMobile = currentWidth <= path(['breakpoints', 'tablet'], theme);
  const renderedOffers = renderOffers(offers);

  const offerContainer = !isMobile ? <Offers>{renderedOffers}</Offers> : <Slider>{renderedOffers}</Slider>;

  return (
    <StyledLatestOffers>
      <Title>{path(['sections', 'latestOffers'], uiConfig)}</Title>
      <Loader isLoading={!renderedOffers}>{offerContainer}</Loader>
    </StyledLatestOffers>
  );
};

LatestOffers.propTypes = propTypes;
LatestOffers.defaultProps = defaultProps;

export default compose(connect)(LatestOffers);
