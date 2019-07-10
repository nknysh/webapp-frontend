import React, { Fragment } from 'react';
import { add, gt, head, inc, last, length, map, partial, path, pathOr, pipe, prop, propOr, reduce } from 'ramda';
import { useTranslation } from 'react-i18next';
import { isEqual, addDays, format } from 'date-fns';

import { ProductTypes } from 'config/enums';
import { getNumberOfDays, mapWithIndex } from 'utils';

import { propTypes, defaultProps } from './Card.props';
import {
  StyledCard,
  CardImage,
  CardChip,
  CardPrice,
  CardSecondaryChip,
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
  CardChipStack,
  ToolTip,
  PriceBreakdown,
  PriceBreakdownItem,
} from './Card.styles';

const getStartDateEndDate = dates => {
  const startDate = head(dates);
  const endDate = isEqual(startDate, last(dates)) ? addDays(last(dates), 1) : last(dates);

  return { startDate, endDate };
};

const getOffers = pipe(
  pathOr([], ['potentialBooking', ProductTypes.ACCOMMODATION]),
  map(propOr([], 'offers'))
);

const getOfferCount = pipe(
  getOffers,
  reduce((accum, offers) => add(accum, length(offers)), 0)
);

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

const renderPrice = (t, { offerCount, response, showDiscountedPrice }) =>
  response && (
    <CardChipStack>
      <CardChip>
        {pathOr(true, ['totals', 'oneOrMoreItemsOnRequest'], response) ? (
          t('labels.onRequest')
        ) : (
          <ToolTip
            label={
              <CardPrice data-discounted={showDiscountedPrice && gt(offerCount, 0)}>
                {showDiscountedPrice
                  ? path(['totals', 'totalBeforeDiscount'], response)
                  : path(['totals', 'total'], response)}
              </CardPrice>
            }
          >
            <b>{t('labels.priceBasedOn')}</b>
            <PriceBreakdown>
              {map(
                partial(renderRoomsBreakdown, [t]),
                pathOr([], ['potentialBooking', ProductTypes.ACCOMMODATION], response)
              )}
              {map(
                partial(renderTransfersBreakdown, [t]),
                pathOr([], ['potentialBooking', ProductTypes.TRANSFER], response)
              )}
            </PriceBreakdown>
          </ToolTip>
        )}
      </CardChip>
      {showDiscountedPrice && gt(offerCount, 0) && (
        <CardChip>
          {pathOr(true, ['totals', 'oneOrMoreItemsOnRequest'], response) ? (
            t('labels.onRequest')
          ) : (
            <CardPrice data-discount={true}>{path(['totals', 'total'], response)}</CardPrice>
          )}
        </CardChip>
      )}
    </CardChipStack>
  );

const renderOfferBreakdown = (t, { offer }, i) => (
  <PriceBreakdownItem key={i + prop('uuid', offer)}>{prop('name', offer)}</PriceBreakdownItem>
);

const renderOffersBreakdown = (t, roomOffers, i) => (
  <Fragment key={i}>
    <b>{t('labels.roomWithNumber', { number: inc(i) })}</b>
    <PriceBreakdown>{mapWithIndex(partial(renderOfferBreakdown, [t]), roomOffers)}</PriceBreakdown>
  </Fragment>
);

const renderOffers = (t, { offerCount, response }) => {
  const offers = getOffers(response);

  return (
    gt(offerCount, 0) && (
      <CardSecondaryChip>
        <ToolTip label={<span>{t('offerWithCount', { count: offerCount })}</span>}>
          {mapWithIndex(partial(renderOffersBreakdown, [t]), offers)}
        </ToolTip>
      </CardSecondaryChip>
    )
  );
};

export const Card = ({
  featuredPhoto,
  name,
  preferred,
  starRating,
  suitableForHoneymooners,
  additionalInfo,
  amenities,
  bookingBuilder = {},
  showDiscountedPrice,
}) => {
  const { t } = useTranslation();

  const { response } = bookingBuilder;

  const offerCount = getOfferCount(response);

  return (
    <StyledCard>
      <CardImage style={{ backgroundImage: `url(${prop('url', featuredPhoto)})` }}>
        {preferred && <CardPreferred>Preferred</CardPreferred>}
        {renderPrice(t, { response, offerCount, showDiscountedPrice })}
        {renderOffers(t, { response, offerCount })}
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
