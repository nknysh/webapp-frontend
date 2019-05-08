import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {
  __,
  allPass,
  always,
  complement,
  compose,
  defaultTo,
  either,
  equals,
  has,
  isNil,
  lensPath,
  lensProp,
  map,
  path,
  prop,
  propOr,
  set,
  view,
  when,
} from 'ramda';

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

export const HotelContainer = ({
  hotel,
  id,
  fetchHotel,
  hotelStatus,
  getBooking,
  updateBooking,
  getHotelPhotos,
  getAccommodationProducts,
  history,
  removeRoom,
  getRoomUploads,
}) => {
  const loaded = useFetchData(hotelStatus, fetchHotel, [id], undefined, reloadIfMissing(hotel));
  const currentWidth = useCurrentWidth();

  const booking = getBooking(id);
  const photos = getHotelPhotos(propOr([], 'photos', hotel));
  const accommodationProducts = getAccommodationProducts(propOr([], 'accommodationProducts', hotel));

  const setBooking = set(__, __, booking);
  const viewBooking = view(__, booking);

  const setSelectedRooms = (uuid, quantity) => {
    const quantityLens = lensPath(['accommodationProducts', uuid, 'quantity']);
    let quantityData = defaultTo([], viewBooking(quantityLens));
    quantityData.length = quantity;
    quantityData = map(when(either(isNil, equals(undefined)), always({})), quantityData);

    equals(0, quantityData.length)
      ? removeRoom({ hotelUuid: id, id: uuid })
      : updateBooking(id, setBooking(quantityLens, quantityData));
  };

  const onBook = () => history.push(`/hotels/${id}/booking`);

  const renderBreadcrumbs = () => (
    <StyledBreadcrumbs links={[{ label: renderBackButton() }, { label: prop('name', hotel), to: `/hotels/${id}` }]} />
  );

  const renderHotel = () => (
    <StyledHotel
      {...hotel}
      accommodationProducts={accommodationProducts}
      onRoomSelect={setSelectedRooms}
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
