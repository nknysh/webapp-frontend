import styled from 'styled-components';

import { Link } from 'components/elements';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';

import { h2Styling } from 'styles/typography';

import {
  Card,
  CardImage,
  CardChip,
  CardChipSecondary,
  CardPrice,
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

export const OfferPrice = styled(CardPrice)`
  text-decoration: none;

  &:before {
    content: '';
  }
`;

export const OfferName = styled(CardChipSecondary)``;

export const OfferDetails = styled(CardDetails)`
  h1,
  h2,
  h3 {
    ${h2Styling};
    border-bottom: 1px solid #e0e0e0;
  }

  p {
    font-size: ${theme.fonts.sizes.normal}px;
    color: ${theme.secondary};
  }

  h1,
  h2,
  h3,
  p {
    padding: 0 0 ${theme.gutter * 2}px;
    margin: 0 0 ${theme.gutter * 2}px;
    border-bottom: 1px solid #e0e0e0;

    &:last-child {
      border: 0;
      margin-bottom: 0;
    }
  }
`;

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
