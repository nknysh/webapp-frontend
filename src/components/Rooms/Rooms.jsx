import React, { useState } from 'react';
import {
  __,
  any,
  always,
  complement,
  contains,
  filter,
  flatten,
  ifElse,
  join,
  map,
  mergeAll,
  pipe,
  prop,
  uniq,
  propOr,
  memoizeWith,
  identity,
  path,
} from 'ramda';
import hash from 'object-hash';

import { Slider } from 'components';
import { useCurrentWidth } from 'effects';
import { isEmptyOrNil, isMobile } from 'utils';

import uiConfig from 'config/ui';

import { propTypes, defaultProps } from './Rooms.props';
import { StyledRooms, Title, Columns, Column, RoomsWrapper, AmenitiesSelect, StyledRoom } from './Rooms.styles';

const toOption = value => ({ [value]: value });

const getAmenities = memoizeWith(
  identity,
  pipe(
    map(prop('amenities')),
    flatten,
    uniq,
    filter(complement(isEmptyOrNil)),
    map(toOption),
    mergeAll
  )
);

const filterRoomsByAmenities = (rooms, selected) => {
  if (isEmptyOrNil(selected)) return rooms;

  const containsAmenities = any(contains(__, selected));
  const byAmenities = pipe(
    propOr([], 'amenities'),
    containsAmenities
  );

  return filter(byAmenities, rooms);
};

const renderValue = ifElse(
  isEmptyOrNil,
  always(<span>{path(['labels', 'filterByAmenities'], uiConfig)}</span>),
  join(', ')
);

export const Rooms = ({ className, rooms, selectedRooms, onRoomSelect }) => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const currentWidth = useCurrentWidth();

  const amenities = getAmenities(rooms);
  const filteredRooms = filterRoomsByAmenities(rooms, selectedAmenities);

  const renderRoom = room => (
    <StyledRoom
      className={className}
      key={hash(room)}
      onChange={onRoomSelect}
      selectedCount={propOr(0, prop('uuid', room), selectedRooms)}
      {...room}
    />
  );
  const renderRoomsWrapper = children =>
    isMobile(currentWidth) ? <Slider infinite={false}>{children}</Slider> : children;
  const renderRooms = () =>
    isEmptyOrNil(filteredRooms)
      ? path(['labels', 'noRooms'], uiConfig)
      : renderRoomsWrapper(map(renderRoom, filteredRooms));

  return (
    <StyledRooms>
      <Columns>
        <Column>
          <Title>Select Available Accomodations</Title>
        </Column>
        <Column>
          {!isEmptyOrNil(amenities) && (
            <AmenitiesSelect
              multiple
              displayEmpty
              onSelected={setSelectedAmenities}
              options={amenities}
              renderValue={renderValue}
              value={selectedAmenities}
            />
          )}
        </Column>
      </Columns>
      <RoomsWrapper>{renderRooms()}</RoomsWrapper>
    </StyledRooms>
  );
};

Rooms.propTypes = propTypes;
Rooms.defaultProps = defaultProps;

export default Rooms;
