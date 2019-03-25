import React from 'react';
import { prop, path, map } from 'ramda';
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

const renderImgOffer = bestRate =>
  prop('percentage', bestRate) && (
    <ImgOffer>
      -{parseInt(prop('percentage', bestRate))}% by{' '}
      {format(prop('endDate', bestRate), path(['dates', 'defaultFormat'], uiConfig))}
    </ImgOffer>
  );

const renderSelection = (onChange, selectedCount) => (
  <Selection
    nextClassName="add"
    prevClassName="minus"
    countClassName="count"
    zeroText="ADD ACOMMODATION"
    onChange={onChange}
    startAt={selectedCount}
  />
);

// eslint-disable-next-line
const renderBrochure = ({ name, url }) => (
  <Button href={url} target="_blank">
    {getSingular('brochure')}: {name}
  </Button>
);

const renderAmenity = amenity => <Detail key={amenity}>{amenity}</Detail>;

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

  const onRoomSelect = value => onChange({ [uuid]: value });

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
              <PriceAmount>{prop('amount', bestRate)}</PriceAmount>
              <PriceLabel> /{getSingular('guest')} </PriceLabel>
            </Price>
          </Column>
        </Columns>
        <Info>{information}</Info>
        <Details>
          {size && (
            <Detail>
              {path(['labels', 'roomSize'], uiConfig)}: {size}
            </Detail>
          )}
          {standardOccupancy && (
            <Detail>
              {path(['labels', 'standardOccupancy'], uiConfig)}: {standardOccupancy}{' '}
              {getPluralisation('adult', standardOccupancy)}
            </Detail>
          )}
          {(maxAdults || minChildren || minAdults) && (
            <Detail>
              {`${path(['labels', 'maxOccupancy'], uiConfig)}: `}
              {maxAdults && `${maxAdults} ${getPluralisation('adult', maxAdults)}`}
              {minAdults && ` / ${minAdults} ${getPluralisation('adult', minAdults)}`}
              {minChildren && `+ ${minChildren} ${getPluralisation('children', maxAdults)}`}
            </Detail>
          )}
          {amenities && map(renderAmenity, amenities)}
        </Details>
        <AdditionalInfo>
          {(additionalInfo || !isEmptyOrNil(brochures)) && (
            <Columns>
              {additionalInfo && (
                <Column>
                  <ToolTip placement="right" label={<Button>{path(['labels', 'moreInfo'], uiConfig)}</Button>}>
                    {additionalInfo}
                  </ToolTip>
                </Column>
              )}
              {brochures && (
                <Column>
                  <Brochures>{map(renderBrochure, brochures)}</Brochures>
                </Column>
              )}
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
