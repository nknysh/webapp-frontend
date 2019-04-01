import React from 'react';
import { prop, path, map, complement, equals } from 'ramda';
import { format } from 'date-fns';

import { ToolTip } from 'components';
import { isEmptyOrNil } from 'utils';

import uiConfig, { getPluralisation, getSingular } from 'config/ui';

import { propTypes, defaultProps } from './Room.props';
import {
  AdditionalInfo,
  Brochures,
  Button,
  Column,
  Columns,
  Detail,
  Details,
  Img,
  ImgOffer,
  Info,
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

const renderImgOffer = bestRate =>
  prop('percentage', bestRate) && (
    <ImgOffer>
      -{parseInt(prop('percentage', bestRate))}% by{' '}
      {format(prop('endDate', bestRate), path(['dates', 'defaultFormat'], uiConfig))}
    </ImgOffer>
  );

const renderSelection = (onChange, { quantity }) => (
  <Selection
    nextClassName="add"
    prevClassName="minus"
    countClassName="count"
    zeroText="ADD ACOMMODATION"
    onChange={onChange}
    startAt={quantity}
    // value={quantity}
  />
);

// eslint-disable-next-line
const renderBrochure = ({ name, url }) => (
  <Button href={url} target="_blank">
    {getSingular('brochure')}: {name}
  </Button>
);

const renderAmenity = amenity => <Detail key={amenity}>{amenity}</Detail>;

const renderAmenities = amenities => amenities && map(renderAmenity, amenities);

const renderSize = size =>
  size && (
    <Detail>
      {path(['labels', 'roomSize'], uiConfig)}: {size}
    </Detail>
  );

const renderStandardOccupancy = standardOccupancy =>
  standardOccupancy && (
    <Detail>
      {path(['labels', 'standardOccupancy'], uiConfig)}: {standardOccupancy}{' '}
      {getPluralisation('adult', standardOccupancy)}
    </Detail>
  );

const renderAdditionalInfo = additionalInfo =>
  additionalInfo && (
    <Column>
      <ToolTip placement="right" label={<Button>{path(['labels', 'moreInfo'], uiConfig)}</Button>}>
        {additionalInfo}
      </ToolTip>
    </Column>
  );

const renderBrochures = brochures =>
  brochures && (
    <Column>
      <Brochures>{map(renderBrochure, brochures)}</Brochures>
    </Column>
  );

const renderMinMax = (maxAdults, minAdults, minChildren) =>
  (maxAdults || minChildren || minAdults) && (
    <Detail>
      {`${path(['labels', 'maxOccupancy'], uiConfig)}: `}
      {isNotZero(maxAdults) && `${maxAdults} ${getPluralisation('adult', maxAdults)}`}
      {isNotZero(minAdults) && ` / ${minAdults} ${getPluralisation('adult', minAdults)}`}
      {isNotZero(minChildren) && `+ ${minChildren} ${getPluralisation('children', maxAdults)}`}
    </Detail>
  );

export const Room = ({
  additionalInfo,
  amenities,
  bestRate,
  brochures,
  className,
  information,
  maxAdults,
  minAdults,
  minChildren,
  name,
  onChange,
  photo,
  selectedCount,
  size,
  standardOccupancy,
  uuid,
  withSelection,
}) => {
  if (!bestRate) return null;

  const imgUrl = prop('url', photo);

  const onRoomSelect = quantity => onChange({ [uuid]: { quantity } });

  return (
    <StyledRoom className={className}>
      <RoomImage>
        {imgUrl && <Img src={imgUrl} />}
        {renderImgOffer(bestRate)}
        {withSelection && renderSelection(onRoomSelect, selectedCount)}
      </RoomImage>
      <RoomInfo>
        <Columns>
          <Column>
            <Title>{name}</Title>
          </Column>
          <Column>
            <Price>
              <PriceAmount>{prop('rate', bestRate)}</PriceAmount>
              <PriceLabel> /{getSingular('guest')} </PriceLabel>
            </Price>
          </Column>
        </Columns>
        <Info>{information}</Info>
        <Details>
          {renderSize(size)}
          {renderStandardOccupancy(standardOccupancy)}
          {renderMinMax(maxAdults, minAdults, minChildren)}
          {renderAmenities(amenities)}
        </Details>
        <AdditionalInfo>
          {(additionalInfo || !isEmptyOrNil(brochures)) && (
            <Columns>
              {renderAdditionalInfo(additionalInfo)}
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
