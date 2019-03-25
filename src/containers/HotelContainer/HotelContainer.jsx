import React, { Fragment } from 'react';
import { __, pipe, lensProp, set, compose, prop, path, allPass, has, complement, curry, view } from 'ramda';

import { Loader, Tabs, Hotel } from 'components';
import { useFetchData, useCurrentWidth } from 'effects';
import { isMobile } from 'utils';

import uiConfig from 'config/ui';

import connect from './HotelContainer.state';
import { propTypes, defaultProps } from './HotelContainer.props';
import { Back, StyledBreadcrumbs, HotelWrapper } from './HotelContainer.styles';

const roomsLens = lensProp('rooms');

const reloadIfMissing = complement(allPass([has('photos'), has('rooms')]));

const renderBackButton = () => <Back to="/search">{path(['labels', 'backToSearch'], uiConfig)}</Back>;

export const HotelContainer = ({ hotel, id, fetchHotel, hotelStatus, getBooking, updateBooking }) => {
  const loaded = useFetchData(hotelStatus, fetchHotel, id, reloadIfMissing(hotel));
  const currentWidth = useCurrentWidth();

  const booking = getBooking(id);

  const setBooking = set(__, __, booking);
  const viewBooking = view(__, booking);

  const setSelectedRooms = pipe(
    setBooking(roomsLens),
    curry(updateBooking)(id)
  );

  const renderBreadcrumbs = () => (
    <StyledBreadcrumbs links={[{ label: renderBackButton() }, { label: prop('name', hotel), to: `/hotels/${id}` }]} />
  );

  const renderHotel = () => <Hotel onRoomSelect={setSelectedRooms} selectedRooms={viewBooking(roomsLens)} {...hotel} />;

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
