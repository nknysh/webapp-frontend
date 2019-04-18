import styled from 'styled-components';

import { Link } from 'components/elements';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';

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

export const StyledOffer = styled(Card)`
  ${breakpoints.tablet`
    flex: 1;
    max-width: 33%;
  `}
`;

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
  color: ${theme.colors.white} !important;
  display: block;
  text-align: center;
  width: 100%;

  a {
    color: ${theme.colors.white} !important;
    width: 100%;
  }
`;
