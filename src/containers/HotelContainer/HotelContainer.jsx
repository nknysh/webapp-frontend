import React, { Fragment } from 'react';
import { __, propOr, lensProp, set, compose, prop, path, allPass, has, complement, view } from 'ramda';

import { Loader, Tabs } from 'components';
import { BookingContainer } from 'containers';
import { useFetchData, useCurrentWidth } from 'effects';
import { isMobile } from 'utils';

import uiConfig from 'config/ui';

import connect from './HotelContainer.state';
import { propTypes, defaultProps } from './HotelContainer.props';
import {
  StyledHotelContainer,
  Back,
  StyledBreadcrumbs,
  StyledHotel,
  StyledSummary,
  Full,
  Aside,
} from './HotelContainer.styles';

const roomsLens = lensProp('accommodationProducts');

const reloadIfMissing = complement(allPass([has('photos'), has('accommodationProducts')]));

const renderBackButton = () => <Back to="/search">{path(['labels', 'backToSearch'], uiConfig)}</Back>;

export const HotelContainer = ({ hotel, id, fetchHotel, hotelStatus, getBooking, updateBooking }) => {
  const loaded = useFetchData(hotelStatus, fetchHotel, id, reloadIfMissing(hotel));
  const currentWidth = useCurrentWidth();

  const booking = getBooking(id);

  const setBooking = set(__, __, booking);
  const viewBooking = view(__, booking);

  const setSelectedRooms = (uuid, quantity) => {
    const quantityData = propOr([], 'quantity', viewBooking(roomsLens));
    quantityData.length = quantity;

    updateBooking(id, setBooking(roomsLens, { [uuid]: { quantity: quantityData } }));
  };

  const renderBreadcrumbs = () => (
    <StyledBreadcrumbs links={[{ label: renderBackButton() }, { label: prop('name', hotel), to: `/hotels/${id}` }]} />
  );

  const renderHotel = () => (
    <StyledHotel onRoomSelect={setSelectedRooms} selectedRooms={viewBooking(roomsLens)} {...hotel} />
  );

  const renderSummary = () => (
    <Aside>
      <BookingContainer Component={StyledSummary} hotelUuid={id} />
    </Aside>
  );

  const renderTabs = () => (
    <Fragment>
      {renderBackButton()}
      <Tabs centered labels={[path(['labels', 'hotelDetails'], uiConfig), path(['labels', 'yourSelection'], uiConfig)]}>
        {renderHotel()}
        {renderSummary()}
      </Tabs>
    </Fragment>
  );

  const renderFull = () => (
    <Fragment>
      {renderBreadcrumbs()}
      <Full>
        {renderHotel()}
        {renderSummary()}
      </Full>
    </Fragment>
  );

  return (
    <Loader isLoading={!loaded} text={path(['messages', 'gettingHotel'], uiConfig)}>
      <StyledHotelContainer>{isMobile(currentWidth) ? renderTabs() : renderFull()}</StyledHotelContainer>
    </Loader>
  );
};

HotelContainer.propTypes = propTypes;
HotelContainer.defaultProps = defaultProps;

export default compose(connect)(HotelContainer);
