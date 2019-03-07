import React from 'react';
import { path, prop, replace, pipe } from 'ramda';
import { format } from 'date-fns';

import uiConfig from 'config/ui';

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

const formatDate = date => format(date, dateFormat);

export const Offer = ({ offer }) => {
  const image = path(['hotelUuid', 'image'], offer);

  const getDates = pipe(
    replace('{fromDate}', formatDate(prop('validFrom', offer))),
    replace('{toDate}', formatDate(prop('validTo', offer)))
  );

  return (
    <StyledOffer>
      <OfferImage style={{ backgroundImage: `url(${image})` }}>
        <OfferChip>
          <OfferPrice>{prop('pricePerAdult', offer)}</OfferPrice> /Guest
        </OfferChip>
        <OfferName>{prop('name', offer)}</OfferName>
      </OfferImage>
      <OfferDetails>
        <OfferTitle>{path(['hotelUuid', 'name'], offer)}</OfferTitle>
        <OfferDescription>{prop('description', offer)}</OfferDescription>
        <OfferText>{getDates(path(['taglines', 'validFromTo'], uiConfig))}</OfferText>
        <OfferText>{path(['taglines', 'validForAllVillas'], uiConfig)}</OfferText>
      </OfferDetails>
      <OfferCta>
        <OfferCtaButton inverse to={`/hotels/${path(['hotelUuid', 'uuid'], offer)}`}>
          {path(['buttons', 'moreInfo'], uiConfig)}
        </OfferCtaButton>
      </OfferCta>
    </StyledOffer>
  );
};

Offer.propTypes = propTypes;
Offer.defaultProps = defaultProps;

export default Offer;
