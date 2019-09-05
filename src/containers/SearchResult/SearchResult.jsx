import React from 'react';
import { compose, gt, head, last, map, partial, path, pathOr, prop, values } from 'ramda';
import { useTranslation } from 'react-i18next';
import { isEqual, addDays, format } from 'date-fns';

import { ProductTypes } from 'config/enums';
import { getNumberOfDays, mapWithIndex } from 'utils';

import connect from './SearchResult.state';
import { propTypes, defaultProps } from './SearchResult.props';
import {
  StyledCard,
  CardImage,
  CardChip,
  CardPrice,
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
} from './SearchResult.styles';

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

const renderPrice = (t, { offerCount, response, showDiscountedPrice, currencyCode }) =>
  response && (
    <CardChipStack>
      <CardChip>
        {pathOr(true, ['totals', 'oneOrMoreItemsOnRequest'], response) ? (
          t('labels.onRequest')
        ) : (
          <ToolTip
            label={
              <CardPrice data-discounted={showDiscountedPrice && gt(offerCount, 0)}>
                {`${currencyCode}${
                  showDiscountedPrice
                    ? path(['totals', 'totalBeforeDiscount'], response)
                    : path(['totals', 'total'], response)
                }`}
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
            <CardPrice data-discount={true}>{`${currencyCode}${path(['totals', 'total'], response)}`}</CardPrice>
          )}
        </CardChip>
      )}
    </CardChipStack>
  );

const renderOfferBreakdown = (t, { offer }, i) => (
  <PriceBreakdownItem key={i + prop('uuid', offer)}>{prop('name', offer)}</PriceBreakdownItem>
);

const renderOffers = (t, { offerCount, offers }) => {
  return (
    gt(offerCount, 0) && (
      <CardChip data-secondary={true}>
        <ToolTip label={<span>{t('offerWithCount', { count: offerCount })}</span>}>
          {values(mapWithIndex(partial(renderOfferBreakdown, [t]), offers))}
        </ToolTip>
      </CardChip>
    )
  );
};

export const SearchResult = ({
  additionalInfo,
  amenities,
  bookingBuilder = {},
  currencyCode,
  featuredPhoto,
  name,
  offerCount,
  offers,
  preferred,
  showDiscountedPrice,
  starRating,
  suitableForHoneymooners,
}) => {
  const { t } = useTranslation();

  const { response } = bookingBuilder;

  return (
    <StyledCard>
      <CardImage style={{ backgroundImage: `url(${prop('url', featuredPhoto)})` }}>
        {preferred && <CardPreferred>{t('labels.preferred')}</CardPreferred>}
        {renderPrice(t, { response, offerCount, showDiscountedPrice, currencyCode })}
        {renderOffers(t, { offers, response, offerCount })}
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

SearchResult.propTypes = propTypes;
SearchResult.defaultProps = defaultProps;

export default compose(connect)(SearchResult);
