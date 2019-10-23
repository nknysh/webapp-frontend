import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { always, compose, filter, ifElse, join, pathOr, length, map, partial, propEq, values } from 'ramda';
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
  NoResults,
  AccommodationPricesInfo,
  RoomsError,
} from './Rooms.styles';

import AccommodationCard from 'components/AccommodationCard';

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

const renderRoom = ({ requestedRooms, currencyCode, handleRoomAdd, handleRoomRemove, bookingStatus }, room) => {
  const { uuid } = room;
  const selectedCount = length(filter(propEq('uuid', uuid), requestedRooms || []));

  return (
    <AccommodationCard
      key={hash(room)}
      id={room.uuid}
      availableToHold={room.availableToHold}
      currencyCode={currencyCode}
      title={room.title}
      description={room.description}
      moreInformation={room.moreInformation}
      amenities={room.amenities}
      size={room.size}
      brochures={room.floorPlans}
      totals={room.totals}
      occupancy={room.occupancy}
      selectedCount={selectedCount}
      appliedOffers={room.appliedOfferNames}
      imageUri={pathOr(null, ['photos', 0, 'url'], room)}
      updateInProgress={bookingStatus === 'LOADING'}
      onRoomAdd={handleRoomAdd}
      onRoomRemove={handleRoomRemove}
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
    bookingStatus,
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

  const handleRoomAdd = useCallback(uuid => addRoom(hotelUuid, uuid), [addRoom, hotelUuid]);
  const handleRoomRemove = useCallback(uuid => removeRoom(hotelUuid, uuid), [removeRoom, hotelUuid]);

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
                handleRoomAdd,
                handleRoomRemove,
                isMobile,
                bookingStatus,
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
