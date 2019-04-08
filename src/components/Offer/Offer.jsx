import React from 'react';
import { path, prop, replace, pipe } from 'ramda';

import uiConfig, { getSingular } from 'config/ui';
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

export const Offer = ({ hotel, validFrom, validTo, description, name, rate }) => {
  const image = path(['featuredPhoto', 'url'], hotel);

  const getDates = pipe(
    replace('{fromDate}', formatDate(validFrom, dateFormat)),
    replace('{toDate}', formatDate(validTo, dateFormat))
  );

  return (
    <StyledOffer>
      <OfferImage style={{ backgroundImage: `url(${image})` }}>
        {rate && (
          <OfferChip>
            <OfferPrice>{prop('rate', rate)}</OfferPrice> /{getSingular('guest')}
          </OfferChip>
        )}
        <OfferName>{name}</OfferName>
      </OfferImage>
      <OfferDetails>
        <OfferTitle>{prop('name', hotel)}</OfferTitle>
        <OfferDescription>{description}</OfferDescription>
        <OfferText>{getDates(path(['taglines', 'validFromTo'], uiConfig))}</OfferText>
      </OfferDetails>
      <OfferCta>
        <OfferCtaButton inverse to={`/hotels/${prop('uuid', hotel)}`}>
          {path(['buttons', 'moreInfo'], uiConfig)}
        </OfferCtaButton>
      </OfferCta>
    </StyledOffer>
  );
};

Offer.propTypes = propTypes;
Offer.defaultProps = defaultProps;

export default Offer;
