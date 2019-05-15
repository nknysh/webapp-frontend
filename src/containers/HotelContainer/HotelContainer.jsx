import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { __, allPass, complement, compose, has, lensProp, path, prop, propOr, view } from 'ramda';

import { Loader, Tabs } from 'components';
import BookingContainer from 'containers/BookingContainer';
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

const roomsLens = lensProp('rooms');

const reloadIfMissing = complement(allPass([has('photos'), has('accommodationProducts')]));

const renderBackButton = () => <Back to="/search">{path(['labels', 'backToSearch'], uiConfig)}</Back>;

export const HotelContainer = ({
  hotel,
  id,
  fetchHotel,
  hotelStatus,
  getBooking,
  getHotelPhotos,
  accommodationProducts,
  history,
  removeRoom,
  addRoom,
  getRoomUploads,
}) => {
  const loaded = useFetchData(hotelStatus, fetchHotel, [id], undefined, reloadIfMissing(hotel));
  const currentWidth = useCurrentWidth();

  const booking = getBooking(id);
  const photos = getHotelPhotos(propOr([], 'photos', hotel));

  const viewBooking = view(__, booking);

  const onBook = () => history.push(`/hotels/${id}/booking`);

  const renderBreadcrumbs = () => (
    <StyledBreadcrumbs links={[{ label: renderBackButton() }, { label: prop('name', hotel), to: `/hotels/${id}` }]} />
  );

  const onRoomAdd = uuid => addRoom(id, uuid);
  const onRoomRemove = uuid => removeRoom(id, uuid);

  const renderHotel = () => (
    <StyledHotel
      {...hotel}
      accommodationProducts={accommodationProducts}
      onRoomAdd={onRoomAdd}
      onRoomRemove={onRoomRemove}
      photos={photos}
      selectedRooms={viewBooking(roomsLens)}
      getRoomUploads={getRoomUploads}
    />
  );

  const renderSummary = () => (
    <Aside>
      <BookingContainer Component={StyledSummary} hotelUuid={id} onBook={onBook} />
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

export default compose(
  connect,
  withRouter
)(HotelContainer);
