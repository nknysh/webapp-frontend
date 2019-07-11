import React, { memo } from 'react';
import { compose, pipe, map, values, when, complement, isNil } from 'ramda';
import { useTranslation } from 'react-i18next';

import { Loader, Slider } from 'components';
import { useFetchData, useCurrentWidth } from 'effects';

import Offer from 'containers/Offer';

import connect from './LatestOffers.state';
import { propTypes, defaultProps } from './LatestOffers.props';
import { StyledLatestOffers, Title, Offers } from './LatestOffers.styles';

const renderOffer = (offer, i) => <Offer key={i} id={offer} />;

const renderOffers = when(
  complement(isNil),
  pipe(
    map(renderOffer),
    values
  )
);

const renderOfferContainer = ({ offers, isMobile }) =>
  !isMobile ? <Offers>{renderOffers(offers)}</Offers> : <Slider>{renderOffers(offers)}</Slider>;

export const LatestOffers = ({ fetchLatestOffers, offers, offersStatus }) => {
  const { t } = useTranslation();

  const offersFetched = useFetchData(offersStatus, fetchLatestOffers, []);
  const { isMobile } = useCurrentWidth();

  return (
    <StyledLatestOffers>
      <Title>{t('sections.latestOffers')}</Title>
      <Loader isLoading={!offersFetched}>{renderOfferContainer({ offers, isMobile })}</Loader>
    </StyledLatestOffers>
  );
};

LatestOffers.propTypes = propTypes;
LatestOffers.defaultProps = defaultProps;

export default compose(
  connect,
  memo
)(LatestOffers);
