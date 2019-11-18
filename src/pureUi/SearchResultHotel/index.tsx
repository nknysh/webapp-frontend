import React from 'react';
import { Link } from 'react-router-dom';
import { HotelResult } from 'services/BackendApi';
import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import ImageLoader from 'pureUi/ImageLoader';
import { getCurrencySymbol } from 'utils';
import { Heading2 } from 'styles';
import { Icon } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import LinkButton from 'components/LinkButton';

export interface SearchResultHotelProps extends React.HTMLAttributes<HTMLDivElement> {
  result: HotelResult;
  showHighlights: boolean;
  onToggleHighlights: (id: string) => void;
  onNavigateToHotel: (hotelUuid: string) => void;
}
export const SearchResultHotel = (props: SearchResultHotelProps) => {
  const { result, showHighlights, onToggleHighlights, onNavigateToHotel, onClick, ...otherProps } = props;
  const { t } = useTranslation();
  const currencySymbol = getCurrencySymbol(result.bookingBuilder.response.currency);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onNavigateToHotel(result.uuid);
  };

  return (
    <div className={props.className} key={result.name} onClick={handleClick} {...otherProps}>
      <ImageLoader
        aspectRatio="112:75"
        title={result.bookingBuilder.response.uploads[1] && result.bookingBuilder.response.uploads[1].displayName}
        src={result.bookingBuilder.response.uploads[1] && result.bookingBuilder.response.uploads[1].url}
      />
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
        {/* <h4>
            After Discount: {currencySymbol}
            {result.bookingBuilder.response.totals.totalForPricedItems}
          </h4>
          <ul>
            <li>
              Before Discount: {currencySymbol}
              {result.bookingBuilder.response.totals.totalBeforeDiscount}
            </li>
            <li>Offers Applied: {result.bookingBuilder.response.aggregateTotals.Booking.offers.length}</li>
            <li>Prefferd: {result.bookingBuilder.response.hotel.preferred ? 'Yes' : 'No'}</li>
          </ul> */}
      </div>
    </div>
  );
};

export default styled(SearchResultHotel)`
  background-color: ${pureUiTheme.colors.whiteish};

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
      margin-left: 10px;
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
`;
