import React, { useState, useCallback } from 'react';
import {
  __,
  always,
  any,
  complement,
  compose,
  contains,
  filter,
  flatten,
  identity,
  ifElse,
  join,
  length,
  map,
  memoizeWith,
  mergeAll,
  partial,
  path,
  pathOr,
  pipe,
  prop,
  propEq,
  propSatisfies,
  uniq,
  values,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import hash from 'object-hash';
import { useTranslation } from 'react-i18next';
import { Slider } from '@pure-escapes/webapp-ui-components';

import { useCurrentWidth } from 'effects';

import connect from './Rooms.state';
import { propTypes, defaultProps } from './Rooms.props';
import {
  StyledRooms,
  Title,
  Columns,
  Column,
  RoomsWrapper,
  AmenitiesSelect,
  StyledRoom,
  NoResults,
} from './Rooms.styles';

const toOption = value => ({ [value]: value });

const getAmenities = memoizeWith(
  identity,
  pipe(
    map(path(['meta', 'amenities'])),
    flatten,
    uniq,
    filter(complement(isNilOrEmpty)),
    map(toOption),
    mergeAll
  )
);

const filterNoRate = filter(propSatisfies(complement(isNilOrEmpty), 'rates'));

const filterRoomsByAmenities = (rooms, selected) => {
  if (isNilOrEmpty(selected)) return rooms;

  const containsAmenities = any(contains(__, selected));
  const byAmenities = pipe(
    pathOr([], ['meta', 'amenities']),
    containsAmenities
  );

  return filter(byAmenities, rooms);
};

const renderValue = t => ifElse(isNilOrEmpty, always(<span>{t('labels.filterByAmenities')}</span>), join(', '));

const renderRoom = ({ requestedRooms, getRoomUploads, currencyCode, onRoomAdd, onRoomRemove }, room) => {
  const { uuid } = room;
  const selectedCount = length(filter(propEq('uuid', uuid), requestedRooms || []));

  return (
    <StyledRoom
      key={hash(room)}
      {...room}
      currencyCode={currencyCode}
      uploads={getRoomUploads(prop('uploads', room))}
      onRoomAdd={onRoomAdd}
      onRoomRemove={onRoomRemove}
      selectedCount={selectedCount}
    />
  );
};

const renderRoomsWrapper = ({ isMobile }, children) =>
  isMobile ? <Slider infinite={false}>{children}</Slider> : children;

const renderRooms = (t, { filteredRooms, ...props }) =>
  isNilOrEmpty(filteredRooms) ? (
    <NoResults>{t('labels.noRooms')}</NoResults>
  ) : (
    renderRoomsWrapper(props, values(map(partial(renderRoom, [props]), filteredRooms)))
  );

export const Rooms = props => {
  const { t } = useTranslation();
  const { hotelUuid, className, rooms, addRoom, removeRoom } = props;

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const { isMobile } = useCurrentWidth();

  const amenities = getAmenities(rooms);
  const filteredRooms = filterNoRate(filterRoomsByAmenities(rooms, selectedAmenities));

  const onRoomAdd = useCallback(uuid => addRoom(hotelUuid, uuid), [addRoom, hotelUuid]);
  const onRoomRemove = useCallback(uuid => removeRoom(hotelUuid, uuid), [removeRoom, hotelUuid]);

  return (
    <StyledRooms className={className}>
      <Columns>
        <Column>
          <Title>{t('labels.selectAvailableAccomodations')}</Title>
        </Column>
        <Column>
          {!isNilOrEmpty(amenities) && (
            <AmenitiesSelect
              multiple
              displayEmpty
              onSelected={setSelectedAmenities}
              options={amenities}
              renderValue={renderValue(t)}
              value={selectedAmenities}
            />
          )}
        </Column>
      </Columns>
      <RoomsWrapper>{renderRooms(t, { filteredRooms, onRoomAdd, onRoomRemove, isMobile, ...props })}</RoomsWrapper>
    </StyledRooms>
  );
};

Rooms.propTypes = propTypes;
Rooms.defaultProps = defaultProps;

export default compose(connect)(Rooms);
