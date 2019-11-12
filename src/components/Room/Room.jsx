import React, { Fragment, useCallback } from 'react';
import { prop, path, map, complement, equals, partial } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { isAdult, formatPrice } from 'utils';

import config from 'config';

import { propTypes, defaultProps } from './Room.props';
import {
  AdditionalInfo,
  Brochures,
  Button,
  Column,
  Columns,
  Detail,
  Details,
  EndColumn,
  Img,
  ImgOffer,
  Info,
  Limit,
  Limits,
  MoreInfoToolTip,
  Price,
  PriceAmount,
  RoomImage,
  RoomInfo,
  Selection,
  StyledRoom,
  Title,
  Total,
  AccommodationOffer,
  AvailableToHoldBadge,
} from './Room.styles';

import { ToolTip } from '../../containers/SearchResult/SearchResult.styles';

const isNotZero = complement(equals(0));

const renderImgOffer = bestRate =>
  prop('percentage', bestRate) && (
    <ImgOffer data-secondary={true}>
      -{parseInt(prop('percentage', bestRate))}% by{' '}
      {format(new Date(prop('endDate', bestRate)), path(['defaults', 'dateFormat'].toLowerCase(), config))}
    </ImgOffer>
  );

const renderAmenity = amenity => <Detail key={amenity}>{amenity}</Detail>;

const renderAmenities = (t, amenities) => amenities && map(renderAmenity, amenities);

const renderSize = (t, size) =>
  size && (
    <Detail>
      {t('labels.roomSize')}: {size} {t('labels.squareMeters')}
    </Detail>
  );

const renderStandardOccupancy = (t, { standardOccupancy }) =>
  standardOccupancy && (
    <Detail>
      {t('labels.standardOccupancy')}: {standardOccupancy} {t('adult', { count: standardOccupancy })}
    </Detail>
  );

const renderMinMaxLimit = (t, { name, maximum, minimum }) => (
  <Limit key={name}>
    {`${isAdult(name) ? t('adult_plural') : t(`${name}_plural`) || name}`} - {t('labels.max')} {maximum}{' '}
    {t('labels.min')} {minimum}
  </Limit>
);

const renderMinMax = (t, { maximumPeople, limits }) => (
  <Fragment>
    <Detail>
      {`${t('labels.maxOccupancy')}: `}
      {isNotZero(maximumPeople) && maximumPeople}
      {` `}
    </Detail>

    {!isNilOrEmpty(limits) && <Limits>{map(partial(renderMinMaxLimit, [t]), limits)}</Limits>}
  </Fragment>
);

const renderAdditionalInfo = (t, additionalInfo) =>
  additionalInfo && (
    <EndColumn>
      <MoreInfoToolTip placement="right" label={<Button>{t('labels.moreInfo')}</Button>}>
        {additionalInfo}
      </MoreInfoToolTip>
    </EndColumn>
  );

const renderBrochure = (t, { uuid, displayName, url }) => (
  <Button key={uuid} href={url} target="_blank">
    {t('brochure')}: {displayName}
  </Button>
);

const renderBrochures = (t, brochures) =>
  brochures && (
    <EndColumn>
      <Brochures>{map(partial(renderBrochure, [t]), brochures)}</Brochures>
    </EndColumn>
  );

const renderSelection = (t, { onAdd, onRemove, selectedCount, disabled = false }) => (
  <Selection
    nextClassName="add"
    prevClassName="minus"
    countClassName="count"
    zeroText={t('labels.addAccommodation')}
    onAdd={onAdd}
    onRemove={onRemove}
    value={selectedCount}
    disabled={disabled}
  />
);

/**
 * render price totals information. if 1 or more applied offers given,
 * total and totalBeforeDiscount are both rendered, and totalBeforeDiscount
 * has a strikethrough
 *
 * @param  {string} currencyCode
 * @param  {string} total
 * @param  {string} totalBeforeDiscount
 * @param  {number} datesCount
 * @param  {string[]} appliedOfferNames
 * @return {JSX}
 */
const renderPrices = (currencyCode, total, totalBeforeDiscount, datesCount, appliedOfferNames) => {
  if (appliedOfferNames.length <= 0) {
    // no discounts
    return (
      <Price>
        <Total>{`${currencyCode}${formatPrice(total)}`}</Total>
      </Price>
    );
  }
  return (
    <React.Fragment>
      <Price>
        <Total data-discounted={true}>{`${currencyCode}${formatPrice(total)}`}</Total>
        <Total data-secondary={true}>{`${currencyCode}${formatPrice(totalBeforeDiscount)}`}</Total>
      </Price>

      {appliedOfferNames &&
        appliedOfferNames.map(offerName => <AccommodationOffer key={offerName}>Offer: {offerName}</AccommodationOffer>)}
    </React.Fragment>
  );
};

const renderAvailabilityChip = (t, availableToHold) => {
  return (
    availableToHold && (
      <AvailableToHoldBadge>
        <ToolTip label={<span>{t('available')}</span>}>{t('labels.availableToHoldRoom')}</ToolTip>
      </AvailableToHoldBadge>
    )
  );
};

/**
 *
 * @param {object} props
 * @param {object} props.totals
 * @param {boolean} props.totals.oneOrMoreItemsOnRequest
 * @param {number} props.totals.totalForPricedItemsCents
 * @param {number} props.totals.totalBeforeDiscountForPricedItemsCents
 * @param {string} props.totals.totalForPricedItems
 * @param {string} props.totals.totalBeforeDiscountForPricedItems
 * @param {string} props.totals.total
 * @param {string} props.totals.totalBeforeDiscount
 */
export const Room = ({
  className,
  currencyCode,
  size,
  description,
  moreInformation,
  amenities,
  title,
  onRoomAdd,
  onRoomRemove,
  occupancy,
  rates,
  selectedCount,
  photos,
  floorPlans,
  uuid,
  withSelection,
  totals,
  datesCount,
  appliedOfferNames,
  availableToHold,
  updateInProgress,
}) => {
  const { t } = useTranslation();

  const onAdd = useCallback(() => onRoomAdd(uuid), [onRoomAdd, uuid]);
  const onRemove = useCallback(() => onRoomRemove(uuid), [onRoomRemove, uuid]);

  const brochures = floorPlans;

  return (
    <StyledRoom className={className}>
      {renderAvailabilityChip(t, availableToHold)}
      <RoomImage>
        {photos && <Img src={prop('url', photos[0])} alt={prop('displayName', photos[0])} />}
        {renderImgOffer(rates)}
        {withSelection && totals && renderSelection(t, { onAdd, onRemove, selectedCount, disabled: updateInProgress })}
      </RoomImage>
      <RoomInfo>
        <Columns>
          <Column>
            <Title>{title}</Title>
          </Column>
          <Column>
            {!totals.oneOrMoreItemsOnRequest &&
              renderPrices(currencyCode, totals.total, totals.totalBeforeDiscount, datesCount, appliedOfferNames)}

            {totals.oneOrMoreItemsOnRequest && (
              <Price>
                <PriceAmount>{t('labels.onRequest')}</PriceAmount>
              </Price>
            )}
          </Column>
        </Columns>
        <Info>{description}</Info>
        <Details>
          {renderSize(t, size)}
          {renderStandardOccupancy(t, occupancy)}
          {renderMinMax(t, occupancy)}
          {renderAmenities(t, amenities)}
        </Details>
        <AdditionalInfo>
          {(moreInformation || !isNilOrEmpty(brochures)) && (
            <Columns>
              {renderAdditionalInfo(t, moreInformation)}
              {renderBrochures(t, brochures)}
            </Columns>
          )}
        </AdditionalInfo>
      </RoomInfo>
    </StyledRoom>
  );
};

Room.propTypes = propTypes;
Room.defaultProps = defaultProps;

export default Room;
