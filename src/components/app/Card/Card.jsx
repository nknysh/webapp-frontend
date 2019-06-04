import React from 'react';
import { map, prop } from 'ramda';
import { useTranslation } from 'react-i18next';

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
}) => {
  const { t } = useTranslation();

  return (
    <StyledCard>
      <CardImage style={{ backgroundImage: `url(${prop('url', featuredPhoto)})` }}>
        {preferred && <CardPreferred>Preferred</CardPreferred>}
        {cheapestNight && (
          <CardChip>
            <CardPrice>{cheapestNight}</CardPrice> /{t('guest')}
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
              {starRating} {t('star')}
            </CardStarText>
          </CardStarRating>
          <CardSecondaryRating>{suitableForHoneymooners && t('taglines.suitableHoneymoon')}</CardSecondaryRating>
        </CardRating>
        <CardHighlights>{amenities && map(renderFeature, amenities)}</CardHighlights>
        <CardAdditionalInfo>
          <CardAdditional>{additionalInfo}</CardAdditional>
        </CardAdditionalInfo>
      </CardDetails>
    </StyledCard>
  );
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
