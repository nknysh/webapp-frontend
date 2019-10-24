import styled from 'styled-components';
import { Slider } from '@pure-escapes/webapp-ui-components';

import Card from 'components/Card';
import Rooms from 'containers/Rooms';

import {
  CardStarRating,
  CardStar,
  CardStarText,
  CardHighlights,
  CardHighlight,
} from 'containers/SearchResult/SearchResult.styles';

import { theme } from 'styles';

export const StyledHotel = styled.div`
  .linkButton {
    margin: 1rem 0;
  }
`;

export const HotelDetails = styled.div``;

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
    padding-right: 5%;
  `}
`;

export const StyledRooms = styled(Rooms)``;

export const HotelWrapper = styled.div`
  ${props => props.theme.breakpoints.tablet`
  `}
`;
