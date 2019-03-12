import React from 'react';
import { path, isEmpty, map } from 'ramda';

import uiConfig, { getSingular } from 'config/ui';

import { propTypes, defaultProps } from './Card.props';
import {
  StyledCard,
  CardImage,
  CardChip,
  CardPrice,
  CardName,
  CardDetails,
  CardTitle,
  CardRating,
  CardPreferred,
  CardStarRating,
  CardStar,
  CardStarText,
  CardSecondaryRating,
  CardHighlights,
  CardHighlight,
  CardAdditionalInfo,
  CardAdditional,
} from './Card.styles';

const renderAmenity = value => <CardHighlight key={value}>{value}</CardHighlight>;
const renderAdditional = value => <CardAdditional key={value}>{value}</CardAdditional>;

export const Card = ({
  hotel: {
    image,
    name,
    preferred,
    promotionalText,
    starRating,
    suitableForHoneymooners,
    listPrice,
    additionalInfo,
    amenities,
  },
}) => {
  return (
    <StyledCard>
      <CardImage style={{ backgroundImage: `url(${image})` }}>
        {preferred && <CardPreferred>Preferred</CardPreferred>}
        <CardChip>
          <CardPrice>{listPrice}</CardPrice> /{getSingular('guest')}
        </CardChip>
        {!isEmpty(promotionalText) && <CardName>{promotionalText}</CardName>}
      </CardImage>
      <CardDetails>
        <CardTitle>{name}</CardTitle>
        <CardRating>
          <CardStarRating>
            <CardStar>star</CardStar>{' '}
            <CardStarText>
              {starRating} {getSingular('star')}
            </CardStarText>
          </CardStarRating>
          <CardSecondaryRating>
            {suitableForHoneymooners && path(['taglines', 'suitableHoneymoon'], uiConfig)}
          </CardSecondaryRating>
        </CardRating>
        <CardHighlights>{map(renderAmenity, amenities)}</CardHighlights>
        <CardAdditionalInfo>{map(renderAdditional, additionalInfo)}</CardAdditionalInfo>
      </CardDetails>
    </StyledCard>
  );
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
