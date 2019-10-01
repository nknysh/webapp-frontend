import React, { Fragment, useCallback } from 'react';
import { prop, path, map, complement, equals, values, last, pipe, propEq, find, filter, partial } from 'ramda';
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
  PriceLabel,
  RoomImage,
  RoomInfo,
  Selection,
  StyledRoom,
  Title,
} from './Room.styles';

const isNotZero = complement(equals(0));

const getVisibleRate = pipe(
  values,
  last
);

const renderImgOffer = bestRate =>
  prop('percentage', bestRate) && (
    <ImgOffer data-secondary={true}>
      -{parseInt(prop('percentage', bestRate))}% by{' '}
      {format(prop('endDate', bestRate), path(['defaults', 'dateFormat'], config))}
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

const renderSelection = (t, { onAdd, onRemove, selectedCount }) => (
  <Selection
    nextClassName="add"
    prevClassName="minus"
    countClassName="count"
    zeroText={t('labels.addAccommodation')}
    onAdd={onAdd}
    onRemove={onRemove}
    value={selectedCount}
  />
);

export const Room = ({
  className,
  currencyCode,
  meta: { size, description, moreInformation, amenities },
  name,
  onRoomAdd,
  onRoomRemove,
  options: { occupancy },
  rates,
  selectedCount,
  uploads,
  uuid,
  withSelection,
  category,
}) => {
  const { t } = useTranslation();

  const onAdd = useCallback(() => onRoomAdd(uuid), [onRoomAdd, uuid]);
  const onRemove = useCallback(() => onRoomRemove(uuid), [onRoomRemove, uuid]);

  if (!rates) return null;

  const brochures = pipe(
    values,
    filter(propEq('tag', 'floorPlan'))
  )(uploads);

  const img = pipe(
    values,
    find(propEq('tag', 'photo'))
  )(uploads);

  const visibleRate = getVisibleRate(rates);

  return (
    <StyledRoom className={className}>
      <RoomImage>
        {img && <Img src={prop('url', img)} alt={prop('displayName', img)} />}
        {renderImgOffer(rates)}
        {withSelection && visibleRate && renderSelection(t, { onAdd, onRemove, selectedCount })}
      </RoomImage>
      <RoomInfo>
        <Columns>
          <Column>
            <Title>{name}</Title>
          </Column>
          <Column>
            {visibleRate && !visibleRate.isOnRequest && (
              <Price>
                <PriceAmount>{`${currencyCode}${formatPrice(visibleRate.price)}`}</PriceAmount>
                <PriceLabel> /{t(category)} </PriceLabel>
              </Price>
            )}
            {visibleRate && visibleRate.isOnRequest && (
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
