import React from 'react';
import { compose, path } from 'ramda';

import uiConfig from 'config/ui';

import { Loader } from 'components';
import { useFetchData } from 'effects';

import connect from './LatestOffers.state';
import { propTypes, defaultProps } from './LatestOffers.props';
import { StyledLatestOffers, Title } from './LatestOffers.styles';

export const LatestOffers = ({ fetchOffers, offers }) => {
  useFetchData(fetchOffers, offers);

  return (
    <StyledLatestOffers>
      <Title>{path(['sections', 'latestOffers'], uiConfig)}</Title>
      <Loader isLoading={!offers} />
    </StyledLatestOffers>
  );
};

LatestOffers.propTypes = propTypes;
LatestOffers.defaultProps = defaultProps;

export default compose(connect)(LatestOffers);
