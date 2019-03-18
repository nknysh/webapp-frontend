import React, { memo } from 'react';
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

export const LatestOffers = ({ fetchLatestOffers, offers, offersStatus }) => {
  const offersFetched = useFetchData(offersStatus, fetchLatestOffers, { limit: 3 });
  const currentWidth = useCurrentWidth();

  const isMobile = currentWidth <= path(['breakpoints', 'tablet'], theme);
  const renderAllOffers = () => renderOffers(offers);

  const renderOfferContainer = () =>
    !isMobile ? <Offers>{renderAllOffers()}</Offers> : <Slider>{renderAllOffers()}</Slider>;

  return (
    <StyledLatestOffers>
      <Title>{path(['sections', 'latestOffers'], uiConfig)}</Title>
      <Loader isLoading={!offersFetched}>{renderOfferContainer()}</Loader>
    </StyledLatestOffers>
  );
};

LatestOffers.propTypes = propTypes;
LatestOffers.defaultProps = defaultProps;

export default compose(
  connect,
  memo
)(LatestOffers);
