import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { always, compose, filter, ifElse, join, length, map, partial, propEq, values } from 'ramda';
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
  AccommodationPricesInfo,
  RoomsError,
} from './Rooms.styles';

export const filterRoomsByCategoryType = (rooms, categoryTypes) => {
  if (!Array.isArray(categoryTypes)) {
    categoryTypes = [categoryTypes];
  }

  if (categoryTypes.length <= 0) {
    return rooms;
  }

  return rooms.filter(room => {
    return categoryTypes.includes(room.categoryType);
  });
};

const renderValue = t => ifElse(isNilOrEmpty, always(<span>{t('labels.filterByCategoryTypes')}</span>), join(', '));

const renderRoom = ({ requestedRooms, currencyCode, onRoomAdd, onRoomRemove }, room) => {
  const { uuid } = room;
  const selectedCount = length(filter(propEq('uuid', uuid), requestedRooms || []));

  return (
    <StyledRoom
      key={hash(room)}
      {...room}
      currencyCode={currencyCode}
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
  const {
    hotelUuid,
    className,
    rooms,
    roomsError,
    addRoom,
    removeRoom,
    fetchCurrentHotelAccommodationProductDisplays,
  } = props;
  const [isLoading, setIsLoaded] = useState(true);

  useEffect(() => {
    async function load() {
      await fetchCurrentHotelAccommodationProductDisplays(hotelUuid);
      setIsLoaded(false);
    }
    load();
  }, [fetchCurrentHotelAccommodationProductDisplays, hotelUuid]);

  const [selectedCategoryTypes, setSelectedCategoryTypes] = useState([]);
  const { isMobile } = useCurrentWidth();

  const categoryTypes = useMemo(() => {
    const categoryTypes = rooms.reduce((accum, room) => {
      accum[room.categoryType] = room.categoryType;
      return accum;
    }, {});

    return categoryTypes;
  }, [rooms]);

  const filteredRooms = filterRoomsByCategoryType(rooms, selectedCategoryTypes);

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
      {roomsError && <RoomsError>{t('errors.getCurrentHotelAccommodationProducts')}</RoomsError>}
      {!roomsError && (
        <Loader isLoading={isLoading} text={t('messages.gettingAccommodationProducts')}>
          <AccommodationPricesInfo>{t('labels.accommodationPricesInfo')}</AccommodationPricesInfo>
          <RoomsWrapper>
            {!isNilOrEmpty(filteredRooms) &&
              renderRooms(t, {
                filteredRooms,
                onRoomAdd,
                onRoomRemove,
                isMobile,
                ...props,
              })}
          </RoomsWrapper>
        </Loader>
      )}
    </StyledRooms>
  );
};

Rooms.propTypes = propTypes;
Rooms.defaultProps = defaultProps;

export default compose(connect)(Rooms);
