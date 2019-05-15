import React, { Fragment } from 'react';
import { prop, path, map, complement, equals, values, last, pipe, propEq, find, filter } from 'ramda';
import { format } from 'date-fns';

import { isEmptyOrNil, isAdult } from 'utils';

import uiConfig, { getPluralisation, getSingular, getPlural } from 'config/ui';

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
  last,
  prop('rate')
);

const renderImgOffer = bestRate =>
  prop('percentage', bestRate) && (
    <ImgOffer>
      -{parseInt(prop('percentage', bestRate))}% by{' '}
      {format(prop('endDate', bestRate), path(['dates', 'defaultFormat'], uiConfig))}
    </ImgOffer>
  );

const renderAmenity = amenity => <Detail key={amenity}>{amenity}</Detail>;

const renderAmenities = amenities => amenities && map(renderAmenity, amenities);

const renderSize = size =>
  size && (
    <Detail>
      {path(['labels', 'roomSize'], uiConfig)}: {size} {path(['labels', 'squareMeters'], uiConfig)}
    </Detail>
  );

const renderStandardOccupancy = ({ standardOccupancy }) =>
  standardOccupancy && (
    <Detail>
      {path(['labels', 'standardOccupancy'], uiConfig)}: {standardOccupancy}{' '}
      {getPluralisation('adult', standardOccupancy)}
    </Detail>
  );

// eslint-disable-next-line react/prop-types
const renderMinMaxLimit = ({ name, maximum, minimum }) => (
  <Limit key={name}>
    {`${isAdult(name) ? getPlural('adult') : getPlural(name) || name}`} - {path(['labels', 'max'], uiConfig)} {maximum}{' '}
    {path(['labels', 'min'], uiConfig)} {minimum}
  </Limit>
);

// eslint-disable-next-line react/prop-types
const renderMinMax = ({ maximumPeople, limits }) => (
  <Fragment>
    <Detail>
      {`${path(['labels', 'maxOccupancy'], uiConfig)}: `}
      {isNotZero(maximumPeople) && maximumPeople}
      {` `}
    </Detail>

    {!isEmptyOrNil(limits) && <Limits>{map(renderMinMaxLimit, limits)}</Limits>}
  </Fragment>
);

const renderAdditionalInfo = additionalInfo =>
  additionalInfo && (
    <EndColumn>
      <MoreInfoToolTip placement="right" label={<Button>{path(['labels', 'moreInfo'], uiConfig)}</Button>}>
        {additionalInfo}
      </MoreInfoToolTip>
    </EndColumn>
  );

// eslint-disable-next-line
const renderBrochure = ({ uuid, displayName, url }) => (
  <Button key={uuid} href={url} target="_blank">
    {getSingular('brochure')}: {displayName}
  </Button>
);

const renderBrochures = brochures =>
  brochures && (
    <EndColumn>
      <Brochures>{map(renderBrochure, brochures)}</Brochures>
    </EndColumn>
  );

export const Room = ({
  className,
  meta: { size, description, moreInformation, amenities },
  name,
  onRoomAdd,
  onRoomRemove,
  options: { occupancy },
  rates,
  selectedCount,
  uuid,
  withSelection,
  uploads,
}) => {
  if (!rates) return null;

  const brochures = pipe(
    values,
    filter(propEq('tag', 'floorPlan'))
  )(uploads);

  const imgUrl = pipe(
    values,
    find(propEq('tag', 'photo')),
    prop('url')
  )(uploads);

  const visibleRate = getVisibleRate(rates);

  const onAdd = () => onRoomAdd(uuid);
  const onRemove = () => onRoomRemove(uuid);

  const renderSelection = () => (
    <Selection
      nextClassName="add"
      prevClassName="minus"
      countClassName="count"
      zeroText="ADD ACOMMODATION"
      onAdd={onAdd}
      onRemove={onRemove}
      value={selectedCount}
    />
  );

  return (
    <StyledRoom className={className}>
      <RoomImage>
        {imgUrl && <Img src={imgUrl} />}
        {renderImgOffer(rates)}
        {withSelection && visibleRate && renderSelection(onRoomAdd, onRoomRemove, selectedCount)}
      </RoomImage>
      <RoomInfo>
        <Columns>
          <Column>
            <Title>{name}</Title>
          </Column>
          <Column>
            {visibleRate && (
              <Price>
                <PriceAmount>{visibleRate}</PriceAmount>
                <PriceLabel> /{getSingular('guest')} </PriceLabel>
              </Price>
            )}
          </Column>
        </Columns>
        <Info>{description}</Info>
        <Details>
          {renderSize(size)}
          {renderStandardOccupancy(occupancy)}
          {renderMinMax(occupancy)}
          {renderAmenities(amenities)}
        </Details>
        <AdditionalInfo>
          {(moreInformation || !isEmptyOrNil(brochures)) && (
            <Columns>
              {renderAdditionalInfo(moreInformation)}
              {renderBrochures(brochures)}
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
