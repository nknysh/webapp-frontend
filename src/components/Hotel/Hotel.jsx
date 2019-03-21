import React, { useRef } from 'react';
import { repeat, path, map } from 'ramda';

import { Slider } from 'components';

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
} from './Hotel.styles';

const renderImage = src => <img key={src + Date.now()} src={src} />;
const renderFeature = value => <HotelHighlight key={value}>{value}</HotelHighlight>;

const tempImages = [
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/140',
  'https://via.placeholder.com/130',
  'https://via.placeholder.com/120',
];

export const Hotel = ({ name, starRating, suitableForHoneymooners, description, amenities, region, ...props }) => {
  const sliderMain = useRef(null);
  const sliderNav = useRef(null);

  return (
    <StyledHotel {...props}>
      <HotelGallery>
        <Slider ref={sliderMain} asNavFor={sliderNav} slidesToShow={1}>
          {map(renderImage, tempImages)}
        </Slider>
        <Slider ref={sliderNav} asNavFor={sliderMain} slidesToShow={3}>
          {map(renderImage, tempImages)}
        </Slider>
      </HotelGallery>
      <HotelDetails>
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
