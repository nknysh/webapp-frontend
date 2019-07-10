import React from 'react';
import { path, compose, values } from 'ramda';
import { useTranslation } from 'react-i18next';

import connect from './Offer.state';
import { propTypes, defaultProps } from './Offer.props';
import {
  StyledOffer,
  OfferImage,
  OfferChip,
  OfferPrice,
  OfferName,
  OfferDetails,
  OfferCta,
  OfferCtaButton,
} from './Offer.styles';

export const Offer = ({ offer, uploads }) => {
  const { t } = useTranslation();
  const { title, subtitle, body, ctaUrl, ctaText } = offer;

  const image = path([0, 'url'], values(uploads));

  return (
    <StyledOffer>
      <OfferImage style={{ backgroundImage: `url(${image})` }}>
        <OfferChip>
          <OfferPrice>{title}</OfferPrice>
        </OfferChip>
        <OfferName>{subtitle}</OfferName>
      </OfferImage>
      <OfferDetails dangerouslySetInnerHTML={{ __html: body }} />
      {ctaUrl && (
        <OfferCta>
          <OfferCtaButton href={ctaUrl}>{ctaText || t('buttons.moreInfo')}</OfferCtaButton>
        </OfferCta>
      )}
    </StyledOffer>
  );
};

Offer.propTypes = propTypes;
Offer.defaultProps = defaultProps;

export default compose(connect)(Offer);
