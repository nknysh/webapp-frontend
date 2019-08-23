import styled from 'styled-components';
import { Link, Chip } from '@pure-escapes/webapp-ui-components';

import { Card } from 'components';
import { theme, h2Styling, buttonStyles } from 'styles';

export const StyledOffer = styled(Card)`
  ${props => props.theme.breakpoints.tablet`
    flex: 1;
    max-width: 33%;
  `}
`;

export const OfferImage = styled(Card.Image)``;

export const OfferChip = styled(Chip)``;

export const OfferPrice = styled(Card.Price)`
  text-decoration: none;

  &:before {
    content: '';
  }
`;

export const OfferDetails = styled.div`
  padding: ${theme.spacing.gutter * 2}px;

  h1,
  h2,
  h3 {
    ${h2Styling};
    border-bottom: 1px solid #e0e0e0;
  }

  p {
    font-size: ${theme.fonts.sizes.normal}px;
    color: ${theme.palette.secondary};
  }

  h1,
  h2,
  h3,
  p {
    padding: 0 0 ${theme.spacing.gutter * 2}px;
    margin: 0 0 ${theme.spacing.gutter * 2}px;
    border-bottom: 1px solid #e0e0e0;

    &:last-child {
      border: 0;
      margin-bottom: 0;
    }
  }
`;

export const OfferCta = styled.div`
  padding: 0 ${theme.spacing.gutter * 2}px ${theme.spacing.gutter * 2}px;
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
