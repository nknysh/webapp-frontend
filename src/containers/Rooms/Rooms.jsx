import React, { useState, useMemo, useEffect } from 'react';
import { always, compose, ifElse, join, pathOr } from 'ramda';
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

export const numbersInArrayBetweenRange = (nums, from, to) => {
  return nums.reduce((count, num) => {
    if (num >= from && num <= to) {
      count++;
    }
    return count;
  }, 0);
};

export const doGuestAgesFitInsideLodging = (guestAges, lodgingOccupancy, ages) => {
  const totalGuests = guestAges.numberOfAdults + guestAges.agesOfAllChildren.length;

  // first - is there too many people in total
  if (totalGuests > lodgingOccupancy.maximumPeople) {
    return false;
  }

  // get all the ageRanges and their counts into an object
  const ageBrackets = {
    default: guestAges.numberOfAdults,
  };
  ages.forEach(ageBracket => {
    ageBrackets[ageBracket.name] = numbersInArrayBetweenRange(
      guestAges.agesOfAllChildren,
      ageBracket.ageFrom,
      ageBracket.ageTo
    );
  });

  // for instead of forEach so we can do the return neatly
  for (let i = 0; i < lodgingOccupancy.limits.length; i++) {
    const limit = lodgingOccupancy.limits[i];
    const ageBracketForThisLimit = ageBrackets[limit.name];
    if (ageBracketForThisLimit < limit.minimum || ageBracketForThisLimit > limit.maximum) {
      return false;
    }
  }

  return true;
};

const renderValue = t => ifElse(isNilOrEmpty, always(<span>{t('labels.filterByCategoryTypes')}</span>), join(', '));

export const Rooms = props => {
  const { t } = useTranslation();
  const { hotelUuid, className, roomsError, fetchCurrentHotelAccommodationProductDisplays } = props;
  const [isLoading, setIsLoaded] = useState(true);
  const [accommodationProducts, setAccommodationProducts] = useState(props.accommodationProducts);
  const [searchQuery, setSearchQuery] = useState(props.searchQuery);
  const [currencyCode, setCurrencyCode] = useState(props.currencyCode);
  const [bookingStatus, setBookingStatus] = useState(props.bookingStatus);
  const [lastExecutedQuery, setLastExecutedQuery] = useState(props.lastExecutedQuery);

  const [filteredAccommodationProducts, setFilteredAccommodationProducts] = useState(accommodationProducts);
  const [selectedCategoryTypes, setSelectedCategoryTypes] = useState([]);
  const [accommodationProductsCtaData, setAccommodationProductsCtaData] = useState([]);
  const [accommodationProductMarkup, setAccommodationProductMarkup] = useState(null);
  const { isMobile } = useCurrentWidth();

  const { addRoom } = props;
  // when props change, update any local state that depends on props
  useEffect(() => {
    setAccommodationProducts(props.accommodationProducts);
    setSearchQuery(props.searchQuery);
    setCurrencyCode(props.currencyCode);
    setBookingStatus(props.bookingStatus);
    setLastExecutedQuery(props.lastExecutedQuery);
  }, [props]);

  // when the hotel changes, load new accommodation products
  useEffect(() => {
    async function load() {
      await fetchCurrentHotelAccommodationProductDisplays(hotelUuid);
      setIsLoaded(false);
    }
    load();
  }, [fetchCurrentHotelAccommodationProductDisplays, hotelUuid]);

  // when the category changes, get new filtered accommodation products
  useEffect(() => {
    setFilteredAccommodationProducts(filterRoomsByCategoryType(accommodationProducts, selectedCategoryTypes));
  }, [accommodationProducts, selectedCategoryTypes]);

  // CTA DATA
  useEffect(() => {
    const ctaData = {};
    if (lastExecutedQuery != null) {
      for (let i = 0; i < accommodationProducts.length; i++) {
        ctaData[accommodationProducts[i].uuid] = searchQuery.lodgings
          .map(lod => {
            const guestAges = {
              numberOfAdults: lod.numberOfAdults,
              agesOfAllChildren: lod.agesOfAllChildren,
            };

            if (
              doGuestAgesFitInsideLodging(guestAges, accommodationProducts[i].occupancy, accommodationProducts[i].ages)
            ) {
              return {
                guestAges,
                totalGuests: lod.numberOfAdults + lod.agesOfAllChildren.length,
                isDisabled: !doGuestAgesFitInsideLodging(
                  guestAges,
                  accommodationProducts[i].occupancy,
                  accommodationProducts[i].ages
                ),
                addRoom: () => {
                  addRoom(accommodationProducts[i], searchQuery, guestAges);
                },
              };
            } else {
              return null;
            }
          })
          .filter(a => a);
      }
    }

    setAccommodationProductsCtaData(ctaData);
  }, [addRoom, searchQuery, accommodationProducts, setAccommodationProductsCtaData, lastExecutedQuery]);

  // MARKUP
  useEffect(() => {
    const markup = filteredAccommodationProducts.map(room => {
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
          appliedOffers={room.appliedOfferNames}
          imageUri={pathOr(null, ['photos', 0, 'url'], room)}
          updateInProgress={bookingStatus === 'LOADING'}
          addRoomStandardOccupancy={() => addRoom(room, searchQuery)}
          standardOccupancyCount={room.occupancy.standardOccupancy}
          ctaData={accommodationProductsCtaData[room.uuid] || []}
        />
      );
    });

    setAccommodationProductMarkup(markup);
  }, [addRoom, searchQuery, filteredAccommodationProducts, currencyCode, bookingStatus, accommodationProductsCtaData]);

  const categoryTypes = useMemo(() => {
    const categoryTypes = accommodationProducts.reduce((accum, room) => {
      accum[room.categoryType] = room.categoryType;
      return accum;
    }, {});

    return categoryTypes;
  }, [accommodationProducts]);

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
          {isNilOrEmpty(filteredAccommodationProducts) && <NoResults>{t('labels.noRooms')}</NoResults>}

          {filteredAccommodationProducts.length >= 1 && (
            <RoomsWrapper>
              {isMobile ? <Slider infinite={false}>{accommodationProductMarkup}</Slider> : accommodationProductMarkup}
            </RoomsWrapper>
          )}
        </Loader>
      )}
    </StyledRooms>
  );
};

Rooms.propTypes = propTypes;
Rooms.defaultProps = defaultProps;

export default compose(connect)(Rooms);
