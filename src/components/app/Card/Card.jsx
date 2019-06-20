import React from 'react';
import { map, prop, pathOr, path, partial, head, last } from 'ramda';
import { useTranslation } from 'react-i18next';
import { isEqual, addDays, format } from 'date-fns';

import { ProductTypes } from 'config/enums';
import { getNumberOfDays } from 'utils';

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
  ToolTip,
  PriceBreakdown,
  PriceBreakdownItem,
} from './Card.styles';

const getStartDateEndDate = dates => {
  const startDate = head(dates);
  const endDate = isEqual(startDate, last(dates)) ? addDays(last(dates), 1) : last(dates);

  return { startDate, endDate };
};

const renderFeature = value => <CardHighlight key={value}>{value}</CardHighlight>;

const renderRoomsBreakdown = (t, { title, dates = [], subProducts, ...product }) => {
  const { startDate, endDate } = getStartDateEndDate(dates);

  const count = getNumberOfDays({ startDate, endDate });
  const mealPlan = pathOr('', [ProductTypes.MEAL_PLAN, 0, 'product', 'meta', 'categoryType'], subProducts);

  return (
    <PriceBreakdownItem key={path(['product', 'uuid'], product) + startDate + endDate}>
      {t('labels.nightsIn', {
        count,
        nights: t('night', { count }),
        title,
        mealPlan,
        startDate: format(startDate, 'YYYY-MM-DD'),
        endDate: format(endDate, 'YYYY-MM-DD'),
      })}
    </PriceBreakdownItem>
  );
};

const renderTransfersBreakdown = (t, { title, dates = [], ...product }) => {
  const { startDate, endDate } = getStartDateEndDate(dates);
  const isOneWay = pathOr(false, ['product', 'options', 'isOneWay'], product);

  return (
    <PriceBreakdownItem key={path(['product', 'uuid'], product) + startDate + endDate}>
      {title} ({format(startDate, 'YYYY-MM-DD')}
      {!isOneWay && ` - ${format(endDate, 'YYYY-MM-DD')}`})
    </PriceBreakdownItem>
  );
};

export const Card = ({
  featuredPhoto,
  name,
  preferred,
  promotionalText,
  starRating,
  suitableForHoneymooners,
  additionalInfo,
  amenities,
  bookingBuilder,
}) => {
  const { t } = useTranslation();

  return (
    <StyledCard>
      <CardImage style={{ backgroundImage: `url(${prop('url', featuredPhoto)})` }}>
        {preferred && <CardPreferred>Preferred</CardPreferred>}
        {bookingBuilder && (
          <CardChip>
            {pathOr(true, ['response', 'totals', 'oneOrMoreItemsOnRequest'], bookingBuilder) ? (
              t('labels.onRequest')
            ) : (
              <ToolTip label={<CardPrice>{path(['response', 'totals', 'total'], bookingBuilder)}</CardPrice>}>
                <b>{t('labels.priceBasedOn')}</b>
                <PriceBreakdown>
                  {map(
                    partial(renderRoomsBreakdown, [t]),
                    pathOr([], ['response', 'potentialBooking', ProductTypes.ACCOMMODATION], bookingBuilder)
                  )}
                  {map(
                    partial(renderTransfersBreakdown, [t]),
                    pathOr([], ['response', 'potentialBooking', ProductTypes.TRANSFER], bookingBuilder)
                  )}
                </PriceBreakdown>
              </ToolTip>
            )}
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
