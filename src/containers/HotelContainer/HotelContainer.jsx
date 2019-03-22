import React, { Fragment } from 'react';
import { compose, prop, path, allPass, has, complement } from 'ramda';

import { Loader, Tabs, Breadcrumbs, Hotel } from 'components';
import { useFetchData, useCurrentWidth } from 'effects';
import { isMobile } from 'utils';

import uiConfig from 'config/ui';

import connect from './HotelContainer.state';
import { propTypes, defaultProps } from './HotelContainer.props';
import { Back, HotelWrapper } from './HotelContainer.styles';

const reloadIfMissing = complement(allPass([has('photos')]));

const renderBackButton = () => <Back to="/search">{path(['labels', 'backToSearch'], uiConfig)}</Back>;

export const HotelContainer = ({ hotel, id, fetchHotel, hotelStatus }) => {
  const loaded = useFetchData(hotelStatus, fetchHotel, id, reloadIfMissing(hotel));

  const currentWidth = useCurrentWidth();

  const renderBreadcrumbs = () => (
    <Breadcrumbs links={[{ label: renderBackButton() }, { label: prop('name', hotel), to: `/hotels/${id}` }]} />
  );

  const renderHotel = () => <Hotel {...hotel} />;

  const renderTabs = () => (
    <Fragment>
      {renderBackButton()}
      <Tabs centered labels={['Hotel Details']}>
        {renderHotel()}
      </Tabs>
    </Fragment>
  );

  const renderFull = () => (
    <HotelWrapper>
      {renderBreadcrumbs()}
      {renderHotel()}
    </HotelWrapper>
  );

  return (
    <Loader isLoading={!loaded} text={path(['messages', 'gettingHotel'], uiConfig)}>
      {isMobile(currentWidth) ? renderTabs() : renderFull()}
    </Loader>
  );
};

HotelContainer.propTypes = propTypes;
HotelContainer.defaultProps = defaultProps;

export default compose(connect)(HotelContainer);
