import styled from 'styled-components';

import { Slider, Card } from 'components/elements';
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

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';

export const StyledHotel = styled.div``;

export const HotelDetails = styled.div``;

export const HotelDetailsRow = styled.div`
  display: block;

  ${breakpoints.tablet`
        display: flex;
    `}
`;

const HotelDetailsColumn = styled.div`
  margin: 0;

  :not(:empty) {
    padding: ${theme.gutter / 2}px 0;
    border-bottom: 1px solid ${theme.borders.default};
  }

  ${breakpoints.tablet`
        padding: ${theme.gutter / 2}px 0;
        border-bottom: 1px solid ${theme.borders.default};
        flex: 1;
    `}
`;

export const HotelDetailsColumnLeft = styled(HotelDetailsColumn)`
  ${breakpoints.tablet`
    margin-right: ${theme.gutter}px;
        max-width: 75%;
    `}
`;

export const HotelDetailsColumnRight = styled(HotelDetailsColumn)`
  ${breakpoints.tablet`
  margin-left: ${theme.gutter}px;
        max-width: 25%;
    `}
`;

export const HotelName = styled(Card.Title)`
  border-bottom: 0;
  margin: 0 0 ${theme.gutter / 2}px;
  padding: 0;
`;

export const HotelRegion = styled.h3`
  font-size: ${theme.fonts.sizes.normal}px;
  color: ${theme.neutral};
  text-transform: uppercase;
  font-weight: ${theme.fonts.normal};
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

export const HotelStar = styled(CardStar)`
  font-size: 20px !important;
`;

export const HotelStarText = styled(CardStarText)``;

export const HotelSecondaryRating = styled(CardSecondaryRating)`
  text-align: right;

  :last-child {
    margin-bottom: 0;
  }

  ${breakpoints.tablet`
        width: unset;
        text-align: unset;
        font-weight: ${theme.fonts.normal};
    `}
`;

export const HotelDescription = styled.div`
  color: ${theme.neutral};
  padding: ${theme.gutter}px 0;
  font-size: ${theme.fonts.sizes.normal}px;
  line-height: 17px;
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

export const HotelGallery = styled.div`
  margin: 0 0 ${theme.gutter * 2.5}px;

  ${breakpoints.tablet`
   margin-bottom: ${theme.gutter * 4}px;
   margin-right: ${theme.gutter * 3.6}px;
   margin-left: ${theme.gutter * 2}px;
  `}
`;

export const FixedSlider = styled(Slider)`
  ${breakpoints.tablet`
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
  ${breakpoints.tablet`
    height: 500px;
  `}
`;

export const NavSlider = styled(FixedSlider)`
  padding: 0;

  .slick-track {
    margin: 0;
  }
  .slick-slide {
    padding: ${theme.gutter / 2}px;

    :first-child {
      margin-left: 0;
    }

    :last-child {
      margin-right: 0;
    }
  }

  ${breakpoints.tablet`
    height: 100px;
  `}
`;

export const HotelInfo = styled.div`
  margin: 0 ${theme.gutter * 2}px ${theme.gutter * 4.6}px;

  ${breakpoints.tablet`
    margin-bottom: ${theme.gutter * 8}px;
  `}
`;

export const StyledRooms = styled(Rooms)``;

export const HotelWrapper = styled.div`
  ${breakpoints.tablet`
  `}
`;
