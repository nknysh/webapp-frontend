import styled from 'styled-components';

import { BackButton } from 'components';
import {
  CardRating,
  CardStarRating,
  CardStar,
  CardStarText,
  CardSecondaryRating,
  CardHighlights,
  CardHighlight,
} from 'components/Card/Card.styles';

import theme from 'styles/theme';
import { CardTitle } from 'styles/card';
import breakpoints from 'styles/breakpoints';
import { Container } from 'styles/elements';

export const HotelWrapper = styled(Container)`
  padding-bottom: ${theme.gutter * 2}px;
`;

export const Hotel = styled.div`
  display: block;
  border-top: 2px solid ${theme.primary};
  width: 100%;

  ${breakpoints.tablet`
        border-top: 0;
        display: flex;
    `}
`;

export const HotelDetails = styled.div`
  margin: ${theme.gutter}px 0;
  padding: ${theme.gutter}px 0;

  ${breakpoints.tablet`
        flex: 1;
        max-width: 66%;
        padding: 0;
    `}
`;

export const HotelDetailsRow = styled.div`
  display: block;

  ${breakpoints.tablet`
        display: flex;
    `}
`;

const HotelDetailsColumn = styled.div`
  margin: 0 ${theme.gutter}px;
  padding: ${theme.gutter / 2}px 0;
  border-bottom: 1px solid ${theme.borderColor};

  ${breakpoints.tablet`
        flex: 1;
    `}
`;

export const HotelDetailsColumnLeft = styled(HotelDetailsColumn)`
  ${breakpoints.tablet`
        max-width: 75%;
    `}
`;

export const HotelDetailsColumnRight = styled(HotelDetailsColumn)`
  ${breakpoints.tablet`
        max-width: 25%;
    `}
`;

export const HotelName = styled(CardTitle)`
  border-bottom: 0;
  margin: 0 0 ${theme.gutter}px;
  padding: 0;
`;

export const HotelRegion = styled.h3`
  font-size: 14px;
  color: ${theme.colors['gold-neutral']};
  text-transform: uppercase;
  font-weight: ${theme.normal};
  margin: 0 0 ${theme.gutter}px;
  padding: 0;
`;

export const HotelRating = styled(CardRating)`
  border: 0;
  padding: 0;

  :last-child {
    margin-bottom: 0;
  }

  ${breakpoints.tablet`
        display: block;
    `}
`;

export const HotelStarRating = styled(CardStarRating)`
  border: 0;

  :last-child {
    margin-bottom: 0;
  }

  ${breakpoints.tablet`
        margin: ${theme.gutter / 2}px 0 ${theme.gutter}px;
    `}
`;

export const HotelStar = styled(CardStar)``;

export const HotelStarText = styled(CardStarText)``;

export const HotelSecondaryRating = styled(CardSecondaryRating)`
  text-align: right;

  :last-child {
    margin-bottom: 0;
  }

  ${breakpoints.tablet`
        width: unset;
        text-align: unset;
        font-weight: ${theme.normal};
    `}
`;

export const HotelDescription = styled.div`
  color: ${theme.colors['gold-neutral']};
  padding: ${theme.gutter}px 0;
`;

export const HotelHighlights = styled(CardHighlights)`
  border: 0;
  margin: ${theme.gutter}px 0;
  padding: 0;

  ${breakpoints.tablet`
        display: block;
    `}
`;

export const HotelHighlight = styled(CardHighlight)`
  :last-child {
    margin-bottom: 0;
  }

  ${breakpoints.tablet`
        flex: unset;
        width: unset;
    `}
`;

export const Back = styled(BackButton)`
  display: flex;

  padding ${theme.gutter * 2}px ${theme.gutter}px !important;


`;
