import React, { memo, useCallback } from 'react';
import { HotelResult } from 'services/BackendApi';
import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import ImageLoader from 'pureUi/ImageLoader';
import { getCurrencySymbol, formatPrice } from 'utils';
import { Heading2 } from 'styles';
import { Icon } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import LinkButton from 'components/LinkButton';
import ResultBadge from 'pureUi/ResultBadge';
import { IDisplayTotalsBreakdown } from 'services/BackendApi';
import { flatten } from 'ramda';

export interface SearchResultHotelProps extends React.HTMLProps<HTMLDivElement> {
  result: HotelResult;
  showHighlights: boolean;
  onToggleHighlights: (id: string) => void;
  onNavigateToHotel: (hotelUuid: string) => void;
}
export const SearchResultHotel = memo((props: SearchResultHotelProps) => {
  const { result, showHighlights, onToggleHighlights, onNavigateToHotel, onClick, ...otherProps } = props;
  const { t } = useTranslation();
  const currencySymbol = getCurrencySymbol(result.bookingBuilder.response.currency);
  const offerCount = result.bookingBuilder.response.appliedOfferNames.length;
  const priceAfterDiscounts = result.bookingBuilder.response.totals.totalForPricedItems;
  const priceBeforeDiscounts = result.bookingBuilder.response.totals.totalBeforeDiscount;
  const isPreferred = result.preferred;
  const onRequest = result.bookingBuilder.response.totals.oneOrMoreItemsOnRequest;
  const potentialBooking = result.bookingBuilder.response.potentialBooking;
  const appliedOffers = result.bookingBuilder.response.appliedOfferNames;
  const availableToHold = result.bookingBuilder.response.availableToHold;
  const displayTotals = result.bookingBuilder.response.displayTotals;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onNavigateToHotel(result.uuid);
  };

  const featuredUpload =
    props.result.uploads.find(upload => upload.tag === 'featuredPhoto') ||
    props.result.uploads.find(upload => upload.tag === 'photo') ||
    props.result.bookingBuilder.response.uploads.find(upload => upload.url.match(/\.(gif|jpg|jpeg|tiff|png)$/i));

  const safeUpload = featuredUpload ? featuredUpload : { url: 'no-img', displayName: 'No Image' };

  const getPriceBasedOnInfo = useCallback(
    (breakdown: IDisplayTotalsBreakdown): JSX.Element => {
      const accom = breakdown.blocks
        .filter(b => b.blockType === 'Accommodations')
        .map(a => {
          const title = a.header;
          const extras = a.items.map(e => {
            return `${e.title}: ${e.labels.join(', ')}`;
          });
          return [title, extras];
        });

      const trans = breakdown.blocks
        .filter(b => b.blockType === 'Transfers')
        .map(t => {
          return t.items.map(i => i.labels.map(l => `${l} (${i.title})`));
        });

      const listItems = [...flatten(accom), ...flatten(trans)];

      return (
        <div className="tooltip-content">
          <p>Price Based On</p>
          <ul>
            {listItems.map(i => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      );
    },
    [props.result]
  );

  const getAppliedOffersInfo = useCallback(
    (appliedOffers: string[]): JSX.Element => {
      return (
        <div className="tooltip-content">
          <p>Applied Offers</p>
          <ul>
            {appliedOffers.map(offer => (
              <li key={offer}>{offer}</li>
            ))}
          </ul>
        </div>
      );
    },
    [props.result]
  );

  return (
    <div className={props.className} key={result.name} onClick={handleClick} {...otherProps}>
      <ImageLoader aspectRatio="11:7" alt={safeUpload!.displayName} src={safeUpload!.url}>
        <>
          {isPreferred && <span className="badge pref">Preferred</span>}
          <div className="stack">
            <div className="stackColumn">
              {onRequest && <ResultBadge type="text" label={`On Request`} />}
              {!onRequest && offerCount === 0 && (
                <ResultBadge type="price" label={`${currencySymbol}${formatPrice(priceAfterDiscounts)}`}>
                  {displayTotals && getPriceBasedOnInfo(displayTotals)}
                </ResultBadge>
              )}
              {!onRequest && offerCount > 0 && (
                <ResultBadge type="price" label={`${currencySymbol}${formatPrice(priceAfterDiscounts)}`}>
                  {displayTotals && getPriceBasedOnInfo(displayTotals)}
                </ResultBadge>
              )}
              {!onRequest && offerCount > 0 && (
                <ResultBadge type="strikethrough" label={`${currencySymbol}${formatPrice(priceBeforeDiscounts)}`} />
              )}
            </div>
            <div className="stackColumn">
              {!onRequest && offerCount > 0 && (
                <ResultBadge type="offer" label={`${offerCount} ${offerCount > 1 ? 'Offers' : 'Offer'}`}>
                  {getAppliedOffersInfo(appliedOffers)}
                </ResultBadge>
              )}
              {availableToHold && (
                <ResultBadge type="text" label={`Availability`}>
                  <p className="tooltip-content">Available to hold</p>
                </ResultBadge>
              )}
            </div>
          </div>
        </>
      </ImageLoader>
      <div className="details">
        <Heading2 className="hotelName">{result.name}</Heading2>
        <p className="starRating">
          <Icon>star</Icon>{' '}
          <span>
            {result.starRating} {t('star')}
          </span>
        </p>
        <ul className="overview">
          {result.overview.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {!showHighlights && (
          <LinkButton
            aria-label={t('labels.seeHighlights')}
            data-role="linkButton.showHighlights"
            title={t('labels.showHighlights')}
            role="button"
            onClick={() => onToggleHighlights(result.uuid)}
          >
            + {t('labels.seeHighlights')}
          </LinkButton>
        )}
        {showHighlights && (
          <LinkButton
            aria-label={t('labels.hideHighlights')}
            data-role="linkButton.hideHighlights"
            title={t('labels.hideHighlights')}
            role="button"
            onClick={() => onToggleHighlights(result.uuid)}
          >
            - {t('labels.hideHighlights')}
          </LinkButton>
        )}
        {showHighlights && (
          <ul className="highlights">
            {result.highlights && result.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
});

export default styled(SearchResultHotel)`
  position: relative;
  background-color: ${pureUiTheme.colorRoles.areaBackground};
  cursor: pointer;

  .details {
    padding: 1rem;
  }

  .hotelName {
    font-size: 20px;
  }

  .starRating {
    border: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
    border-width: 1px 0;
    display: flex;
    align-items: center;
    padding: 10px 0;
    color: ${pureUiTheme.colors.gold};
    font-family: 'HurmeGeometricSans2';
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
    & > span {
      margin-right: 10px;
    }
  }

  /* Split this out into it's own component? */
  .overview,
  .highlights {
    list-style: none;
    margin: 28px 0;
    padding: 0;
    column-count: 2;
    font-size: 12px;
    text-transform: uppercase;
    font-family: 'HurmeGeometricSans2';
    color: ${pureUiTheme.colors.black};
    & > li {
      margin-bottom: 10px;
    }
  }

  .badge.pref {
    padding: 0 10px;
    line-height: 35px;
    font-family: 'HurmeGeometricSans2';
    font-size: 14px;
    text-transform: uppercase;
    color: ${pureUiTheme.colors.white};
    text-align: center;

    position: absolute;
    top: 0;
    left: 22px;
    font-weight: 600;
    background-color: ${pureUiTheme.colors.gold};
  }

  .stack {
    position: absolute;
    bottom: 22px;
    left: 22px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 0.5rem;
  }

  .stackColumn {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    & > * {
      margin-bottom: 5px;
    }

    & > *:last-child {
      margin-bottom: 0;
    }
  }

  .tooltip-content {
    text-align: left;
    padding: 10px;
    font-size: 12px;
  }

  .tooltip-content p {
    font-weight: bold;
    margin: 5px 10px 5px 25px;
    line-height: 14px;
  }

  .tooltip-content ul {
    margin: 5px 10px 5px 25px;
    padding: 0;
    line-height: 20px;
  }

  .tooltip-content ul li {
    margin-bottom: 5px;
  }
`;
