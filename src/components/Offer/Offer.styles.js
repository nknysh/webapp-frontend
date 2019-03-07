import styled from 'styled-components';

import { Link } from 'components';

import theme from 'styles/theme';

import {
  Card,
  CardImage,
  CardChip,
  CardChipSecondary,
  CardPrice,
  CardTitle,
  CardDetails,
  CardDescription,
  CardText,
} from 'styles/card';
import { buttonStyles } from 'styles/elements';

export const StyledOffer = styled(Card)``;

export const OfferImage = styled(CardImage)``;

export const OfferChip = styled(CardChip)``;

export const OfferPrice = styled(CardPrice)``;

export const OfferName = styled(CardChipSecondary)``;

export const OfferDetails = styled(CardDetails)``;

export const OfferTitle = styled(CardTitle)``;

export const OfferDescription = styled(CardDescription)``;

export const OfferText = styled(CardText)``;

export const OfferCta = styled.div`
  padding: 0 ${theme.gutter * 2}px ${theme.gutter * 2}px;
`;

export const OfferCtaButton = styled(Link)`
  ${buttonStyles}
  display: block;
  text-align: center;
  width: 100%;

  a {
    width: 100%;
  }
`;
