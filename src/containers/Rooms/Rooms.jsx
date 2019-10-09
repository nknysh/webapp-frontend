import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  always,
  complement,
  compose,
  filter,
  ifElse,
  join,
  length,
  map,
  partial,
  prop,
  propEq,
  propSatisfies,
  values,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import hash from 'object-hash';
import { useTranslation } from 'react-i18next';
import { Slider, Loader } from '@pure-escapes/webapp-ui-components';
import { useCurrentWidth } from 'effects';

import connect from './Rooms.state';
import { propTypes, defaultProps } from './Rooms.props';
import {
  StyledRooms,
  Title,
  Columns,
  Column,
  RoomsWrapper,
  CategoryTypesSelect,
  StyledRoom,
  NoResults,
} from './Rooms.styles';

const filterNoRate = filter(propSatisfies(complement(isNilOrEmpty), 'rates'));

export const filterRoomsByCategoryType = (rooms, categoryTypes) => {
  if (categoryTypes.length <= 0) {
    return rooms;
  }

  return Object.values(rooms).reduce((accum, room) => {
    if (categoryTypes.includes(room.meta.categoryType)) {
      accum[room.uuid] = room;
    }

    return accum;
  }, {});
};

const renderValue = t => ifElse(isNilOrEmpty, always(<span>{t('labels.filterByCategoryTypes')}</span>), join(', '));

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
  const { hotelUuid, className, rooms, addRoom, removeRoom, fetchHotelWithAccommodationProducts } = props;
  const [isLoading, setIsLoaded] = useState(true);

  useEffect(() => {
    async function load() {
      await fetchHotelWithAccommodationProducts(hotelUuid);
      setIsLoaded(false);
    }
    load();
  }, [fetchHotelWithAccommodationProducts, hotelUuid]);

  const [selectedCategoryTypes, setSelectedCategoryTypes] = useState([]);
  const { isMobile } = useCurrentWidth();

  const categoryTypes = useMemo(() => {
    const categoryTypes = Object.values(rooms).reduce((accum, room) => {
      accum[room.meta.categoryType] = room.meta.categoryType;
      return accum;
    }, {});

    return categoryTypes;
  }, [rooms]);

  const filteredRooms = filterNoRate(filterRoomsByCategoryType(rooms, selectedCategoryTypes));

  const onRoomAdd = useCallback(uuid => addRoom(hotelUuid, uuid), [addRoom, hotelUuid]);
  const onRoomRemove = useCallback(uuid => removeRoom(hotelUuid, uuid), [removeRoom, hotelUuid]);

  return (
    <StyledRooms className={className}>
      <Columns>
        <Column>
          <Title>{t('labels.selectAvailableAccomodations')}</Title>
        </Column>
        <Column>
          {!isNilOrEmpty(categoryTypes) && (
            <CategoryTypesSelect
              multiple
              displayEmpty
              onSelected={setSelectedCategoryTypes}
              options={categoryTypes}
              renderValue={renderValue(t)}
              value={selectedCategoryTypes}
            />
          )}
        </Column>
      </Columns>
      <Loader isLoading={isLoading} text={t('messages.gettingAccommodationProducts')}>
        <RoomsWrapper>
          {renderRooms(t, {
            filteredRooms,
            onRoomAdd,
            onRoomRemove,
            isMobile,
            ...props,
          })}
        </RoomsWrapper>
      </Loader>
    </StyledRooms>
  );
};

Rooms.propTypes = propTypes;
Rooms.defaultProps = defaultProps;

export default compose(connect)(Rooms);
