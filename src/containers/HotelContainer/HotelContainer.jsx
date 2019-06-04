import React, { Fragment } from 'react';
import { allPass, complement, compose, has, isEmpty, map, prop, values } from 'ramda';
import { useTranslation } from 'react-i18next';

import { Loader, Tabs } from 'components';
import { useFetchData, useCurrentWidth } from 'effects';
import { isMobile } from 'utils';

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

const renderBackButton = t => <Back to="/search">{t('labels.backToSearch')}</Back>;

const renderBrochure = ({ uuid, displayName, url }) => (
  <Brochure key={uuid} href={url} target="_blank">
    {displayName}
  </Brochure>
);

export const HotelContainer = ({ fetchHotel, hotel, hotelStatus, id, brochures, photos }) => {
  const { t } = useTranslation();

  const loaded = useFetchData(hotelStatus, fetchHotel, [id], undefined, reloadIfMissing(hotel));
  const currentWidth = useCurrentWidth();

  const renderBreadcrumbs = () => (
    <StyledBreadcrumbs links={[{ label: renderBackButton(t) }, { label: prop('name', hotel), to: `/hotels/${id}` }]} />
  );

  const renderHotel = () => <StyledHotel {...hotel} id={id} photos={photos} />;

  const renderSummary = () => (
    <Aside>
      <StyledSummary hotelUuid={id} />
      {!isEmpty(brochures) && (
        <AsideDetails>
          <Title>{t('brochure_plural')}</Title>
          {values(map(renderBrochure, brochures))}
        </AsideDetails>
      )}
    </Aside>
  );

  const renderTabs = () => (
    <Fragment>
      {renderBackButton(t)}
      <Tabs centered labels={[t('labels.hotelDetails'), t('labels.yourSelection')]}>
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
    <Loader isLoading={!loaded} text={t('messages.gettingHotel')}>
      <StyledHotelContainer>{isMobile(currentWidth) ? renderTabs() : renderFull()}</StyledHotelContainer>
    </Loader>
  );
};

HotelContainer.propTypes = propTypes;
HotelContainer.defaultProps = defaultProps;

export default compose(connect)(HotelContainer);
