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
  memoizeWith,
  identity,
  path,
  propSatisfies,
  values,
  pathOr,
  length,
} from 'ramda';
import hash from 'object-hash';

import { Slider } from 'components/elements';
import { useCurrentWidth } from 'effects';
import { isEmptyOrNil, isMobile } from 'utils';

import uiConfig from 'config/ui';

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
    filter(complement(isEmptyOrNil)),
    map(toOption),
    mergeAll
  )
);

const filterNoRate = filter(propSatisfies(complement(isEmptyOrNil), 'rates'));

const filterRoomsByAmenities = (rooms, selected) => {
  if (isEmptyOrNil(selected)) return rooms;

  const containsAmenities = any(contains(__, selected));
  const byAmenities = pipe(
    pathOr([], ['meta', 'amenities']),
    containsAmenities
  );

  return filter(byAmenities, rooms);
};

const renderValue = ifElse(
  isEmptyOrNil,
  always(<span>{path(['labels', 'filterByAmenities'], uiConfig)}</span>),
  join(', ')
);

export const Rooms = ({ className, rooms, selectedRooms, onRoomSelect, getRoomUploads }) => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const currentWidth = useCurrentWidth();

  const amenities = getAmenities(rooms);
  const filteredRooms = filterNoRate(filterRoomsByAmenities(rooms, selectedAmenities));

  const renderRoom = room => {
    const selectedCount = length(pathOr([], [prop('uuid', room), 'quantity'], selectedRooms));

    return (
      <StyledRoom
        key={hash(room)}
        {...room}
        uploads={getRoomUploads(prop('uploads', room))}
        onChange={onRoomSelect}
        selectedCount={selectedCount}
      />
    );
  };

  const renderRoomsWrapper = children =>
    isMobile(currentWidth) ? <Slider infinite={false}>{children}</Slider> : children;

  const renderRooms = () =>
    isEmptyOrNil(filteredRooms) ? (
      <NoResults>{path(['labels', 'noRooms'], uiConfig)}</NoResults>
    ) : (
      renderRoomsWrapper(values(map(renderRoom, filteredRooms)))
    );

  return (
    <StyledRooms className={className}>
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
