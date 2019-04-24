import React, { memo } from 'react';
import { compose, pipe, path, map, values, when, complement, isNil, prop } from 'ramda';
import hash from 'object-hash';

import { Loader, Offer, Slider } from 'components';
import { useFetchData, useCurrentWidth } from 'effects';
import { isMobile } from 'utils';

import uiConfig from 'config/ui';

import connect from './LatestOffers.state';
import { propTypes, defaultProps } from './LatestOffers.props';
import { StyledLatestOffers, Title, Offers } from './LatestOffers.styles';

export const LatestOffers = ({
  fetchLatestOffers,
  offers,
  offersStatus,
  getHotel,
  getOffer,
  getHotelFeaturedPhoto,
}) => {
  const offersFetched = useFetchData(offersStatus, fetchLatestOffers, [{ limit: 3 }]);
  const currentWidth = useCurrentWidth();

  const renderOffer = offerResult => {
    const offer = getOffer(prop('offer', offerResult));
    const hotel = getHotel(prop('hotel', offerResult));
    const featuredPhoto = getHotelFeaturedPhoto(prop('hotel', offerResult));

    return <Offer key={hash(offer)} featuredPhoto={featuredPhoto} hotel={hotel} {...offer} />;
  };

  const renderOffers = when(
    complement(isNil),
    pipe(
      map(renderOffer),
      values
    )
  );
  const renderAllOffers = () => renderOffers(offers);

  const renderOfferContainer = () =>
    !isMobile(currentWidth) ? <Offers>{renderAllOffers()}</Offers> : <Slider>{renderAllOffers()}</Slider>;

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
