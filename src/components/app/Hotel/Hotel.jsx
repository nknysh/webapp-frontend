import React, { useRef } from 'react';
import { path, map, values } from 'ramda';

import { isEmptyOrNil } from 'utils';

import uiConfig, { getSingular } from 'config/ui';

import { propTypes, defaultProps } from './Hotel.props';
import {
  HotelDescription,
  HotelDetails,
  HotelDetailsColumnLeft,
  HotelDetailsColumnRight,
  HotelDetailsRow,
  HotelGallery,
  HotelHighlight,
  HotelHighlights,
  HotelInfo,
  HotelName,
  HotelRating,
  HotelRegion,
  HotelSecondaryRating,
  HotelStar,
  HotelStarRating,
  HotelStarText,
  MainSlider,
  NavSlider,
  StyledHotel,
  StyledRooms,
} from './Hotel.styles';

// eslint-disable-next-line
const renderImage = ({ displayName, url }) => <img key={url} src={url} alt={displayName} />;
const renderFeature = value => <HotelHighlight key={value}>{value}</HotelHighlight>;

export const Hotel = ({
  accommodationProducts,
  amenities,
  description,
  name,
  onRoomAdd,
  onRoomRemove,
  photos,
  region,
  selectedRooms,
  starRating,
  suitableForHoneymooners,
  getRoomUploads,
  ...props
}) => {
  const sliderMain = useRef(null);
  const sliderNav = useRef(null);

  const renderedPhotos = values(map(renderImage, photos));

  return (
    <StyledHotel {...props}>
      <HotelDetails>
        {!isEmptyOrNil(photos) && (
          <HotelGallery>
            <MainSlider asNavFor={sliderNav} centerMode={false} fade={true} ref={sliderMain} slidesToShow={1}>
              {renderedPhotos}
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
              {renderedPhotos}
            </NavSlider>
          </HotelGallery>
        )}
        <HotelInfo>
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
              {!isEmptyOrNil(amenities) && <HotelHighlights>{map(renderFeature, amenities)}</HotelHighlights>}
            </HotelDetailsColumnRight>
          </HotelDetailsRow>
        </HotelInfo>
        <StyledRooms
          onRoomAdd={onRoomAdd}
          onRoomRemove={onRoomRemove}
          getRoomUploads={getRoomUploads}
          selectedRooms={selectedRooms}
          rooms={values(accommodationProducts)}
        />
      </HotelDetails>
    </StyledHotel>
  );
};

Hotel.propTypes = propTypes;
Hotel.defaultProps = defaultProps;

export default Hotel;
