import styled from 'styled-components';
import { Slider } from '@pure-escapes/webapp-ui-components';

import Card from 'components/Card';
import Rooms from 'containers/Rooms';

import {
  CardRating,
  CardStarRating,
  CardStar,
  CardStarText,
  CardSecondaryRating,
  CardHighlights,
  CardHighlight,
} from 'containers/SearchResult/SearchResult.styles';

import { theme } from 'styles';

export const StyledHotel = styled.div``;

export const HotelDetails = styled.div``;

export const HotelDetailsRow = styled.div`
  display: block;

  ${props => props.theme.breakpoints.tablet`
        display: flex;
    `}
`;

const HotelDetailsColumn = styled.div`
  margin: 0;

  :not(:empty) {
    padding: ${theme.spacing.gutter / 2}px 0;
    border-bottom: 1px solid ${theme.borders.default};
  }

  ${props => props.theme.breakpoints.tablet`
        padding: ${theme.spacing.gutter / 2}px 0;
        border-bottom: 1px solid ${theme.borders.default};
        flex: 1;
    `}
`;

export const HotelDetailsColumnLeft = styled(HotelDetailsColumn)`
  ${props => props.theme.breakpoints.tablet`
    margin-right: ${theme.spacing.gutter}px;
        max-width: 75%;
    `}
`;

export const HotelDetailsColumnRight = styled(HotelDetailsColumn)`
  ${props => props.theme.breakpoints.tablet`
  margin-left: ${theme.spacing.gutter}px;
        max-width: 25%;
    `}
`;

export const HotelName = styled(Card.Title)`
  border-bottom: 0;
  margin: 0 0 ${theme.spacing.gutter / 2}px;
  padding: 0;
`;

export const HotelRegion = styled.h3`
  font-size: ${theme.fonts.sizes.normal}px;
  color: ${theme.palette.neutral};
  text-transform: uppercase;
  font-weight: ${theme.fonts.normal};
  margin: 0 0 ${theme.spacing.gutter}px;
  padding: 0;
`;

export const HotelRating = styled(CardRating)`
  border: 0;
  padding: 0;

  :last-child {
    margin-bottom: 0;
  }

  ${props => props.theme.breakpoints.tablet`
        display: block;
    `}
`;

export const HotelStarRating = styled(CardStarRating)`
  border: 0;

  :last-child {
    margin-bottom: 0;
  }

  ${props => props.theme.breakpoints.tablet`
        margin: ${theme.spacing.gutter / 2}px 0 ${theme.spacing.gutter}px;
    `}
`;

export const HotelStar = styled(CardStar)`
  font-size: 20px !important;
`;

export const HotelStarText = styled(CardStarText)``;

export const HotelSecondaryRating = styled(CardSecondaryRating)`
  text-align: right;

  :last-child {
    margin-bottom: 0;
  }

  ${props => props.theme.breakpoints.tablet`
        width: unset;
        text-align: unset;
        font-weight: ${theme.fonts.normal};
    `}
`;

export const HotelDescription = styled.div`
  color: ${theme.palette.neutral};
  padding: ${theme.spacing.gutter}px 0;
  font-size: ${theme.fonts.sizes.normal}px;
  line-height: 17px;
`;

export const HotelHighlights = styled(CardHighlights)`
  border: 0;
  margin: ${theme.spacing.gutter}px 0;
  padding: 0;

  ${props => props.theme.breakpoints.tablet`
        display: block;
    `}
`;

export const HotelHighlight = styled(CardHighlight)`
  :last-child {
    margin-bottom: 0;
  }

  ${props => props.theme.breakpoints.tablet`
        flex: unset;
        width: unset;
    `}
`;

export const HotelGallery = styled.div`
  margin: 0 0 ${theme.spacing.gutter * 2.5}px;

  ${props => props.theme.breakpoints.tablet`
   margin-bottom: ${theme.spacing.gutter * 4}px;
   margin-right: ${theme.spacing.gutter * 3.6}px;
   margin-left: ${theme.spacing.gutter * 2}px;
  `}
`;

export const FixedSlider = styled(Slider)`
  ${props => props.theme.breakpoints.tablet`
    .slick-list, .slick-track, .slick-slide, .slick-slide > div {
      height: 100%;
    }

    .slick-slide img {
      height: 100%;
      object-fit: cover;
    }
  `}
`;

export const MainSlider = styled(FixedSlider)`
  ${props => props.theme.breakpoints.tablet`
    height: 500px;
  `}
`;

export const NavSlider = styled(FixedSlider)`
  padding: 0;

  .slick-track {
    margin: 0;
  }
  .slick-slide {
    padding: ${theme.spacing.gutter / 2}px;

    :first-child {
      margin-left: 0;
    }

    :last-child {
      margin-right: 0;
    }
  }

  ${props => props.theme.breakpoints.tablet`
    height: 100px;
  `}
`;

export const HotelInfo = styled.div`
  margin: 0 ${theme.spacing.gutter * 2}px ${theme.spacing.gutter * 4.6}px;

  ${props => props.theme.breakpoints.tablet`
    margin-bottom: ${theme.spacing.gutter * 8}px;
  `}
`;

export const StyledRooms = styled(Rooms)``;

export const HotelWrapper = styled.div`
  ${props => props.theme.breakpoints.tablet`
  `}
`;
