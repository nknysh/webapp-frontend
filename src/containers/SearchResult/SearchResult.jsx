import React, { useState } from 'react';
import { compose, gt, head, last, map, partial, path, pathOr, prop, values, propOr } from 'ramda';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

import { ProductTypes } from 'config/enums';
import { getNumberOfDays, mapWithIndex, addDaysUTC } from 'utils';

import connect from './SearchResult.state';
import { propTypes, defaultProps } from './SearchResult.props';
import {
  StyledCard,
  CardImage,
  CardChipAvailability,
  CardChip,
  CardPrice,
  CardDetails,
  CardTitle,
  CardRating,
  CardPreferred,
  CardStarRating,
  CardStar,
  CardStarText,
  CardHighlights,
  CardHighlight,
  CardChipStack,
  ToolTip,
  PriceBreakdown,
  PriceBreakdownItem,
} from './SearchResult.styles';
import { formatPrice } from 'utils';
import LinkButton from 'components/LinkButton';
import { Link } from 'react-router-dom';

const getStartDateEndDate = dates => {
  const startDate = head(dates);
  const endDate = addDaysUTC(last(dates), 1);

  return { startDate, endDate };
};

const renderAmenity = (amenity, hotelName) => <CardHighlight key={`${hotelName}:${amenity}`}>{amenity}</CardHighlight>;

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

  return (
    <PriceBreakdownItem key={path(['product', 'uuid'], product) + startDate + endDate}>{title}</PriceBreakdownItem>
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
                    ? formatPrice(path(['totals', 'totalBeforeDiscount'], response))
                    : formatPrice(path(['totals', 'total'], response))
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
            <CardPrice data-discount={true}>{`${currencyCode}${formatPrice(
              path(['totals', 'total'], response)
            )}`}</CardPrice>
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

const renderAvailabilityChip = (t, { availableToHold }) => {
  return (
    availableToHold && (
      <CardChipAvailability>
        <ToolTip label={<span>{t('availability')}</span>}>{t('availableToHold')}</ToolTip>
      </CardChipAvailability>
    )
  );
};

export const SearchResult = ({
  bookingBuilder = {},
  currencyCode,
  featuredPhoto,
  name,
  offerCount,
  offers,
  preferred,
  showDiscountedPrice,
  starRating,
  id,
  highlights,
  overview,
}) => {
  const { t } = useTranslation();

  const { response } = bookingBuilder;

  const [isShowingHighlights, setIsShowingHighlights] = useState(false);

  const availableToHold = propOr(false, 'availableToHold', response);

  return (
    <StyledCard>
      <Link to={`/hotels/${id}`}>
        <CardImage style={{ backgroundImage: `url(${prop('url', featuredPhoto)})` }}>
          {preferred && <CardPreferred>{t('labels.preferred')}</CardPreferred>}
          {renderPrice(t, { response, offerCount, showDiscountedPrice, currencyCode })}
          {renderOffers(t, { offers, response, offerCount })}
          {renderAvailabilityChip(t, { availableToHold })}
        </CardImage>
      </Link>
      <CardDetails>
        <Link to={`/hotels/${id}`}>
          <CardTitle>{name}</CardTitle>
          <CardRating>
            <CardStarRating>
              <CardStar>star</CardStar>{' '}
              <CardStarText>
                {starRating} {t('star')}
              </CardStarText>
            </CardStarRating>
          </CardRating>
          <CardHighlights>{overview && overview.map(a => renderAmenity(a, name))}</CardHighlights>
        </Link>
        {!isShowingHighlights && (
          <LinkButton
            aria-label={t('labels.showHighlights')}
            data-role="linkButton.showHighlights"
            title={t('labels.showHighlights')}
            role="button"
            onClick={() => setIsShowingHighlights(true)}
          >
            + {t('labels.showHighlights')}
          </LinkButton>
        )}
        {isShowingHighlights && (
          <LinkButton
            aria-label={t('labels.hideHighlights')}
            data-role="linkButton.hideHighlights"
            title={t('labels.hideHighlights')}
            role="button"
            onClick={() => setIsShowingHighlights(false)}
          >
            - {t('labels.hideHighlights')}
          </LinkButton>
        )}
        {isShowingHighlights && (
          <CardHighlights>{highlights && highlights.map(a => renderAmenity(a, name))}</CardHighlights>
        )}
      </CardDetails>
    </StyledCard>
  );
};

SearchResult.propTypes = propTypes;
SearchResult.defaultProps = defaultProps;

export default compose(connect)(SearchResult);
