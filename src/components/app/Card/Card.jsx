import React from 'react';
import { path, map, prop } from 'ramda';

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

const renderFeature = value => <CardHighlight key={value}>{value}</CardHighlight>;

export const Card = ({
  featuredPhoto,
  name,
  preferred,
  promotionalText,
  starRating,
  suitableForHoneymooners,
  additionalInfo,
  amenities,
  cheapestNight,
}) => (
  <StyledCard>
    <CardImage style={{ backgroundImage: `url(${prop('url', featuredPhoto)})` }}>
      {preferred && <CardPreferred>Preferred</CardPreferred>}
      {cheapestNight && (
        <CardChip>
          <CardPrice>{cheapestNight}</CardPrice> /{getSingular('guest')}
        </CardChip>
      )}
      {promotionalText && <CardName>{promotionalText}</CardName>}
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
      <CardHighlights>{amenities && map(renderFeature, amenities)}</CardHighlights>
      <CardAdditionalInfo>
        <CardAdditional>{additionalInfo}</CardAdditional>
      </CardAdditionalInfo>
    </CardDetails>
  </StyledCard>
);

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
