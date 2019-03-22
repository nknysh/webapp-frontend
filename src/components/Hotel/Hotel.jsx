import React, { useRef } from 'react';
import { path, map } from 'ramda';

import { isEmptyOrNil } from 'utils';

import uiConfig, { getSingular } from 'config/ui';

import { propTypes, defaultProps } from './Hotel.props';
import {
  HotelDescription,
  HotelDetails,
  HotelDetailsColumnLeft,
  HotelDetailsColumnRight,
  HotelDetailsRow,
  HotelHighlight,
  HotelHighlights,
  HotelName,
  HotelRating,
  HotelRegion,
  HotelSecondaryRating,
  HotelStar,
  HotelStarRating,
  HotelStarText,
  StyledHotel,
  HotelGallery,
  MainSlider,
  NavSlider,
} from './Hotel.styles';

// eslint-disable-next-line
const renderImage = ({ url }) => <img key={url} src={url} />;
const renderFeature = value => <HotelHighlight key={value}>{value}</HotelHighlight>;

export const Hotel = ({
  name,
  starRating,
  suitableForHoneymooners,
  description,
  amenities,
  region,
  photos,
  ...props
}) => {
  const sliderMain = useRef(null);
  const sliderNav = useRef(null);

  return (
    <StyledHotel {...props}>
      <HotelDetails>
        {!isEmptyOrNil(photos) && (
          <HotelGallery>
            <MainSlider asNavFor={sliderNav} centerMode={false} fade={true} ref={sliderMain} slidesToShow={1}>
              {map(renderImage, photos)}
            </MainSlider>
            <NavSlider
              asNavFor={sliderMain}
              centerMode={false}
              focusOnSelect={true}
              infinite={false}
              ref={sliderNav}
              slidesToShow={6}
              arrows={true}
            >
              {map(renderImage, photos)}
            </NavSlider>
          </HotelGallery>
        )}
        <HotelDetailsRow>
          <HotelDetailsColumnLeft>
            <HotelName>{name}</HotelName>
            {region && <HotelRegion>{region}</HotelRegion>}
          </HotelDetailsColumnLeft>
          <HotelDetailsColumnRight>
            <HotelRating>
              <HotelStarRating>
                <HotelStar>star</HotelStar>{' '}
                <HotelStarText>
                  {starRating} {getSingular('star')}
                </HotelStarText>
              </HotelStarRating>
              {suitableForHoneymooners && (
                <HotelSecondaryRating>{path(['taglines', 'suitableHoneymoon'], uiConfig)}</HotelSecondaryRating>
              )}
            </HotelRating>
          </HotelDetailsColumnRight>
        </HotelDetailsRow>
        <HotelDetailsRow>
          <HotelDetailsColumnLeft>
            <HotelDescription>{description}</HotelDescription>
          </HotelDetailsColumnLeft>
          <HotelDetailsColumnRight>
            <HotelHighlights>{amenities && map(renderFeature, amenities)}</HotelHighlights>
          </HotelDetailsColumnRight>
        </HotelDetailsRow>
      </HotelDetails>
    </StyledHotel>
  );
};

Hotel.propTypes = propTypes;
Hotel.defaultProps = defaultProps;

export default Hotel;
