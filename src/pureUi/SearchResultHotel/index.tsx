import React from 'react';
import { Link } from 'react-router-dom';
import { HotelResult } from 'services/BackendApi';
import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import ImageLoader from 'pureUi/ImageLoader';
import { getCurrencySymbol, formatPrice } from 'utils';
import { Heading2 } from 'styles';
import { Icon } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import LinkButton from 'components/LinkButton';

export interface SearchResultHotelProps extends React.HTMLProps<HTMLDivElement> {
  result: HotelResult;
  showHighlights: boolean;
  onToggleHighlights: (id: string) => void;
  onNavigateToHotel: (hotelUuid: string) => void;
}
export const SearchResultHotel = (props: SearchResultHotelProps) => {
  const { result, showHighlights, onToggleHighlights, onNavigateToHotel, onClick, ...otherProps } = props;
  const { t } = useTranslation();
  const currencySymbol = getCurrencySymbol(result.bookingBuilder.response.currency);
  const offerCount = result.bookingBuilder.response.aggregateTotals.Booking.offers.length;
  const priceAfterDiscounts = result.bookingBuilder.response.totals.totalForPricedItems;
  const priceBeforeDiscounts = result.bookingBuilder.response.totals.totalBeforeDiscount;
  const isPreferred = result.preferred;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onNavigateToHotel(result.uuid);
  };

  return (
    <div className={props.className} key={result.name} onClick={handleClick} {...otherProps}>
      <ImageLoader
        aspectRatio="11:7"
        title={result.bookingBuilder.response.uploads[1] && result.bookingBuilder.response.uploads[1].displayName}
        src={result.bookingBuilder.response.uploads[1] && result.bookingBuilder.response.uploads[1].url}
      >
        <>
          {isPreferred && <span className="badge pref">Preferred</span>}
          <div className="stack">
            <div className="stackColumn">
              {offerCount === 0 && (
                <span className="badge price">{`${currencySymbol}${formatPrice(priceAfterDiscounts)}`}</span>
              )}
              {offerCount > 0 && (
                <span className="badge price">{`${currencySymbol}${formatPrice(priceAfterDiscounts)}`}</span>
              )}
              {offerCount > 0 && (
                <span className="badge price strike">{`${currencySymbol}${formatPrice(priceBeforeDiscounts)}`}</span>
              )}
            </div>
            <div className="stackColumn">
              {offerCount > 0 && <span className="badge offer">{`${offerCount} Offers`}</span>}
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
};

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

  /* TODO: Create compoennts for the following elememnts */
  .badge {
    padding: 0 10px;
    line-height: 35px;
    font-family: 'HurmeGeometricSans2';
    font-size: 14px;
    text-transform: uppercase;
    color: ${pureUiTheme.colors.white};
    text-align: center;
  }

  .badge.pref {
    position: absolute;
    top: 0;
    left: 22px;
    font-weight: 600;
    background-color: ${pureUiTheme.colors.gold};
  }

  .badge.price,
  .badge.offer {
    color: ${pureUiTheme.colors.black};
    background-color: ${pureUiTheme.colors.white};
  }

  .badge.price {
    font-size: 18px;
  }

  .badge.strike {
    text-decoration: line-through;
    color: ${pureUiTheme.colors.goldLight};
  }

  .badge.offer {
    color: ${pureUiTheme.colors.redFade};
    font-weight: 600;
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

  .prices {
  }

  .offers {
  }
`;
