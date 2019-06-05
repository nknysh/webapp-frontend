import React from 'react';
import { prop, replace, pipe } from 'ramda';
import { useTranslation } from 'react-i18next';

import { formatDate } from 'utils';

import { propTypes, defaultProps } from './Offer.props';
import {
  StyledOffer,
  OfferImage,
  OfferChip,
  OfferPrice,
  OfferName,
  OfferDetails,
  OfferTitle,
  OfferDescription,
  OfferText,
  OfferCta,
  OfferCtaButton,
} from './Offer.styles';

const dateFormat = 'DD MMMM YYYY';

export const Offer = ({ hotel, validFrom, featuredPhoto, validTo, description, name, rate }) => {
  const { t } = useTranslation();

  const image = prop('url', featuredPhoto);

  const getDates = pipe(
    replace('{fromDate}', formatDate(validFrom, dateFormat)),
    replace('{toDate}', formatDate(validTo, dateFormat))
  );

  return (
    <StyledOffer>
      <OfferImage style={{ backgroundImage: `url(${image})` }}>
        {rate && (
          <OfferChip>
            <OfferPrice>{prop('rate', rate)}</OfferPrice> /{t('guest')}
          </OfferChip>
        )}
        <OfferName>{name}</OfferName>
      </OfferImage>
      <OfferDetails>
        <OfferTitle>{prop('name', hotel)}</OfferTitle>
        <OfferDescription>{description}</OfferDescription>
        <OfferText>{getDates(t('taglines.validFromTo'))}</OfferText>
      </OfferDetails>
      <OfferCta>
        <OfferCtaButton inverse to={`/hotels/${prop('uuid', hotel)}`}>
          {t('buttons.moreInfo')}
        </OfferCtaButton>
      </OfferCta>
    </StyledOffer>
  );
};

Offer.propTypes = propTypes;
Offer.defaultProps = defaultProps;

export default Offer;
