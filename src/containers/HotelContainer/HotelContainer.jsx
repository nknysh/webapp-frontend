import React, { Fragment } from 'react';
import { allPass, complement, compose, has, isEmpty, map, path, prop, values } from 'ramda';

import { Loader, Tabs } from 'components';
import { useFetchData, useCurrentWidth } from 'effects';
import { isMobile } from 'utils';

import uiConfig, { getPlural } from 'config/ui';

import connect from './HotelContainer.state';
import { propTypes, defaultProps } from './HotelContainer.props';
import {
  Aside,
  AsideDetails,
  Back,
  Brochure,
  Full,
  StyledBreadcrumbs,
  StyledHotel,
  StyledHotelContainer,
  StyledSummary,
  Title,
} from './HotelContainer.styles';

const reloadIfMissing = complement(allPass([has('photos'), has('accommodationProducts')]));

const renderBackButton = () => <Back to="/search">{path(['labels', 'backToSearch'], uiConfig)}</Back>;

// eslint-disable-next-line react/prop-types
const renderBrochure = ({ uuid, displayName, url }) => (
  <Brochure key={uuid} href={url} target="_blank">
    {displayName}
  </Brochure>
);

export const HotelContainer = ({ fetchHotel, hotel, hotelStatus, id, brochures, photos }) => {
  const loaded = useFetchData(hotelStatus, fetchHotel, [id], undefined, reloadIfMissing(hotel));
  const currentWidth = useCurrentWidth();

  const renderBreadcrumbs = () => (
    <StyledBreadcrumbs links={[{ label: renderBackButton() }, { label: prop('name', hotel), to: `/hotels/${id}` }]} />
  );

  const renderHotel = () => <StyledHotel {...hotel} id={id} photos={photos} />;

  const renderSummary = () => (
    <Aside>
      <StyledSummary hotelUuid={id} />
      {!isEmpty(brochures) && (
        <AsideDetails>
          <Title>{getPlural('brochure')}</Title>
          {values(map(renderBrochure, brochures))}
        </AsideDetails>
      )}
    </Aside>
  );

  const renderTabs = () => (
    <Fragment>
      {renderBackButton()}
      <Tabs centered labels={[path(['labels', 'hotelDetails'], uiConfig), path(['labels', 'yourSelection'], uiConfig)]}>
        {renderHotel()}
        {renderSummary()}
      </Tabs>
    </Fragment>
  );

  const renderFull = () => (
    <Fragment>
      {renderBreadcrumbs()}
      <Full>
        {renderHotel()}
        {renderSummary()}
      </Full>
    </Fragment>
  );

  return (
    <Loader isLoading={!loaded} text={path(['messages', 'gettingHotel'], uiConfig)}>
      <StyledHotelContainer>{isMobile(currentWidth) ? renderTabs() : renderFull()}</StyledHotelContainer>
    </Loader>
  );
};

HotelContainer.propTypes = propTypes;
HotelContainer.defaultProps = defaultProps;

export default compose(connect)(HotelContainer);
