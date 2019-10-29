import React, { useRef, useState } from 'react';
import { map, values } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';

import { propTypes, defaultProps } from './Hotel.props';
import {
  HotelDescription,
  HotelDetails,
  HotelGallery,
  HotelHighlight,
  HotelHighlights,
  HotelInfo,
  HotelName,
  HotelRegion,
  HotelStar,
  HotelStarRating,
  HotelStarText,
  MainSlider,
  NavSlider,
  StyledHotel,
} from './Hotel.styles';

import Rooms from '../../containers/Rooms';
import LinkButton from 'components/LinkButton';

// eslint-disable-next-line
const renderImage = ({ displayName, url }) => <img key={url} src={url} alt={displayName} />;
const renderFeature = value => <HotelHighlight key={value}>{value}</HotelHighlight>;

export const Hotel = ({
  id,
  amenities,
  description,
  name,
  photos,
  region,
  starRating,
  overview,
  highlights,
  ...props
}) => {
  const [showAmenities, setShowAmenities] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [seeHighlights, setSeeHighlights] = useState(false);
  const { t } = useTranslation();

  const sliderMain = useRef(null);
  const sliderNav = useRef(null);

  const renderedPhotos = values(map(renderImage, photos));

  return (
    <StyledHotel {...props}>
      <HotelDetails>
        {!isNilOrEmpty(photos) && (
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
          <HotelStarRating>
            <HotelStar>star</HotelStar>{' '}
            <HotelStarText>
              {starRating} {t('star')}
            </HotelStarText>
          </HotelStarRating>
          <HotelName>{name}</HotelName>
          {region && <HotelRegion>{region}</HotelRegion>}
          <HotelDescription>{description}</HotelDescription>

          {!isNilOrEmpty(overview) && (
            <LinkButton
              aria-label={showOverview ? t('labels.hideOverview') : t('labels.seeOverview')}
              className="linkButton linkButton--in-list"
              onClick={() => setShowOverview(!showOverview)}
            >
              {showOverview ? `- ${t('labels.hideOverview')}` : `+ ${t('labels.seeOverview')}`}
            </LinkButton>
          )}
          {showOverview && <HotelHighlights>{map(renderFeature, overview)}</HotelHighlights>}

          {!isNilOrEmpty(highlights) && (
            <LinkButton
              aria-label={seeHighlights ? t('labels.hideHighlights') : t('labels.seeHighlights')}
              className="linkButton linkButton--in-list"
              onClick={() => setSeeHighlights(!seeHighlights)}
            >
              {seeHighlights ? `- ${t('labels.hideHighlights')}` : `+ ${t('labels.seeHighlights')}`}
            </LinkButton>
          )}
          {seeHighlights && <HotelHighlights>{map(renderFeature, highlights)}</HotelHighlights>}

          {!isNilOrEmpty(amenities) && (
            <LinkButton
              className="linkButton linkButton--in-list"
              aria-label={showAmenities ? t('labels.hideAmenities') : t('labels.seeAmenities')}
              onClick={() => setShowAmenities(!showAmenities)}
            >
              {showAmenities ? `- ${t('labels.hideAmenities')}` : `+ ${t('labels.seeAmenities')}`}
            </LinkButton>
          )}
          {showAmenities && <HotelHighlights>{map(renderFeature, amenities)}</HotelHighlights>}
        </HotelInfo>
        <Rooms hotelUuid={id} />
      </HotelDetails>
    </StyledHotel>
  );
};

Hotel.propTypes = propTypes;
Hotel.defaultProps = defaultProps;

export default Hotel;
