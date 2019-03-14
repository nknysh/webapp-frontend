import React from 'react';
import { path, prop, replace, pipe } from 'ramda';
import { format } from 'date-fns';

import uiConfig, { getSingular } from 'config/ui';

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
  const image = path(['hotel', 'featuredPhoto', 'url'], offer);

  const getDates = pipe(
    replace('{fromDate}', formatDate(prop('validFrom', offer))),
    replace('{toDate}', formatDate(prop('validTo', offer)))
  );

  return (
    <StyledOffer>
      <OfferImage style={{ backgroundImage: `url(${image})` }}>
        <OfferChip>
          <OfferPrice>{prop('guidePrice', offer)}</OfferPrice> /{getSingular('guest')}
        </OfferChip>
        <OfferName>{path(['dealRule', 'title'], offer)}</OfferName>
      </OfferImage>
      <OfferDetails>
        <OfferTitle>{path(['hotel', 'name'], offer)}</OfferTitle>
        <OfferDescription>{path(['dealRule', 'description'], offer)}</OfferDescription>
        <OfferText>{getDates(path(['taglines', 'validFromTo'], uiConfig))}</OfferText>
        <OfferText>{prop('termsAndConditions', offer)}</OfferText>
      </OfferDetails>
      <OfferCta>
        <OfferCtaButton inverse to={`/hotels/${path(['hotel', 'uuid'], offer)}`}>
          {path(['buttons', 'moreInfo'], uiConfig)}
        </OfferCtaButton>
      </OfferCta>
    </StyledOffer>
  );
};

Offer.propTypes = propTypes;
Offer.defaultProps = defaultProps;

export default Offer;
