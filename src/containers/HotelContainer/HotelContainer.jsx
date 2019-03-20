import React, { Fragment } from 'react';
import { compose, prop, path, map } from 'ramda';

import { Loader, Tabs, Breadcrumbs } from 'components';
import { useFetchData, useCurrentWidth } from 'effects';
import { isMobile } from 'utils';

import uiConfig, { getSingular } from 'config/ui';

import connect from './HotelContainer.state';
import { propTypes, defaultProps } from './HotelContainer.props';
import {
  Back,
  Hotel,
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
  HotelWrapper,
} from './HotelContainer.styles';

const renderFeature = value => <HotelHighlight key={value}>{value}</HotelHighlight>;
const renderBackButton = () => <Back to="/search">{path(['labels', 'backToSearch'], uiConfig)}</Back>;

export const HotelContainer = ({ hotel, id, fetchHotel, hotelStatus }) => {
  const loaded = useFetchData(hotelStatus, fetchHotel, id);

  const currentWidth = useCurrentWidth();

  const renderBreadcrumbs = () => (
    <Breadcrumbs links={[{ label: renderBackButton() }, { label: prop('name', hotel), to: `/hotels/${id}` }]} />
  );

  const renderHotelDetails = () => (
    <HotelDetails>
      <HotelDetailsRow>
        <HotelDetailsColumnLeft>
          <HotelName>{prop('name', hotel)}</HotelName>
          {prop('name', hotel) && <HotelRegion>{prop('name', hotel)}</HotelRegion>}
        </HotelDetailsColumnLeft>
        <HotelDetailsColumnRight>
          <HotelRating>
            <HotelStarRating>
              <HotelStar>star</HotelStar>{' '}
              <HotelStarText>
                {prop('starRating', hotel)} {getSingular('star')}
              </HotelStarText>
            </HotelStarRating>
            {prop('suitableForHoneymooners', hotel) ||
              (true && (
                <HotelSecondaryRating>{path(['taglines', 'suitableHoneymoon'], uiConfig)}</HotelSecondaryRating>
              ))}
          </HotelRating>
        </HotelDetailsColumnRight>
      </HotelDetailsRow>
      <HotelDetailsRow>
        <HotelDetailsColumnLeft>
          <HotelDescription>{prop('description', hotel)}</HotelDescription>
        </HotelDetailsColumnLeft>
        <HotelDetailsColumnRight>
          <HotelHighlights>{prop('amenities', hotel) && map(renderFeature, prop('amenities', hotel))}</HotelHighlights>
        </HotelDetailsColumnRight>
      </HotelDetailsRow>
    </HotelDetails>
  );

  const renderTabs = () => (
    <Fragment>
      {renderBackButton()}
      <Tabs centered labels={['Hotel Details']}>
        {renderHotelDetails()}
      </Tabs>
    </Fragment>
  );

  const renderHotel = () => (
    <HotelWrapper>
      {renderBreadcrumbs()}
      <Hotel>{renderHotelDetails()}</Hotel>
    </HotelWrapper>
  );

  return (
    <Loader isLoading={!loaded} text={path(['messages', 'gettingHotel'], uiConfig)}>
      {isMobile(currentWidth) ? renderTabs() : renderHotel()}
    </Loader>
  );
};

HotelContainer.propTypes = propTypes;
HotelContainer.defaultProps = defaultProps;

export default compose(connect)(HotelContainer);
