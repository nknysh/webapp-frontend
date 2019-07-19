import React, { Fragment, useState, Children, useCallback } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { allPass, complement, compose, has, isEmpty, map, prop, values, equals, partial } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';

import { Loader, Tabs, List } from 'components';
import { useFetchData, useCurrentWidth, useModalState } from 'effects';

import connect from './HotelContainer.state';
import { propTypes, defaultProps } from './HotelContainer.props';
import {
  Aside,
  AsideDetails,
  Back,
  Brochure,
  Full,
  StyledAddToProposalForm,
  StyledBreadcrumbs,
  StyledHotel,
  StyledHotelContainer,
  StyledModal,
  StyledSummary,
  SummaryAction,
  SummaryActions,
  Text,
  Title,
} from './HotelContainer.styles';

const reloadIfMissing = complement(allPass([has('photos'), has('accommodationProducts')]));

const renderBackButton = t => <Back to="/search">{t('labels.backToSearch')}</Back>;

const renderBreadcrumbs = (t, { id, hotel }) => (
  <StyledBreadcrumbs links={[{ label: renderBackButton(t) }, { label: prop('name', hotel), to: `/hotels/${id}` }]} />
);

const renderBrochure = ({ uuid, displayName, url }) => (
  <Brochure key={uuid} href={url} target="_blank">
    {displayName}
  </Brochure>
);

const renderHotel = ({ id, hotel, photos }) => <StyledHotel {...hotel} id={id} photos={photos} />;

const renderActions = (t, { canBook, canHold, onActionClick, onTakeHold }) => (
  <SummaryActions>
    <SummaryAction type="button" onClick={onTakeHold} disabled={!canBook || !canHold}>
      {t('buttons.takeAHold')}
    </SummaryAction>
    <SummaryAction type="button" disabled={!canBook} onClick={partial(onActionClick, ['proposal'])}>
      {t('buttons.addToProposal')}
    </SummaryAction>
  </SummaryActions>
);

const renderSummary = (t, { id, brochures, onSubmit, ...props }) => {
  const {
    hotel: { additionalInfo, policiesAndRestrictions },
  } = props;

  return (
    <Aside>
      <StyledSummary id={id} onSubmit={onSubmit} showRoomImage={false}>
        {() => renderActions(t, props)}
      </StyledSummary>
      {additionalInfo && (
        <AsideDetails>
          <Title>{t('labels.thingsToBeAwareOf')}</Title>
          <Text>{additionalInfo}</Text>
        </AsideDetails>
      )}
      {!isNilOrEmpty(policiesAndRestrictions) && (
        <AsideDetails>
          <Title>{t('labels.policiesAndRestrictions')}</Title>
          <List>{Children.toArray(policiesAndRestrictions)}</List>
        </AsideDetails>
      )}
      {!isEmpty(brochures) && (
        <AsideDetails>
          <Title>{t('brochure_plural')}</Title>
          {values(map(renderBrochure, brochures))}
        </AsideDetails>
      )}
    </Aside>
  );
};

const renderTabs = (t, props) => (
  <Fragment>
    {renderBackButton(t)}
    <Tabs centered labels={[t('labels.hotelDetails'), t('labels.yourSelection')]}>
      {renderHotel(props)}
      {renderSummary(t, props)}
    </Tabs>
  </Fragment>
);

const renderFull = (t, props) => (
  <Fragment>
    {renderBreadcrumbs(t, props)}
    <Full>
      {renderHotel(props)}
      {renderSummary(t, props)}
    </Full>
  </Fragment>
);

const renderModal = (t, { id, modalOpen, modalContext, canBook, onModalClose, onModalComplete, booking }) =>
  modalOpen && (
    <StyledModal open={modalOpen} onClose={onModalClose}>
      {equals('proposal', modalContext) && (
        <StyledAddToProposalForm
          bookingId={id}
          onSubmit={onModalComplete}
          disabled={!canBook}
          availableToHold={prop('availableToHold', booking)}
        />
      )}
    </StyledModal>
  );

export const HotelContainer = ({ history, fetchHotel, hotel, hotelStatus, id, ...props }) => {
  const { t } = useTranslation();
  const modal = useModalState(false);
  const [redirectToBooking, setRedirectToBooking] = useState(false);
  const [redirectToHold, setRedirectToHold] = useState(false);

  const { onModalClose, setModalContext, onModalOpen } = modal;

  const loaded = useFetchData(hotelStatus, fetchHotel, [id], undefined, reloadIfMissing(hotel));
  const { isMobile } = useCurrentWidth();

  const onModalComplete = useCallback(
    data => {
      if (equals('proposal', prop('modalContext', modal))) {
        onModalClose();
        history.push(`/proposals/${data.toString()}/edit`);
      }
    },
    [history, modal, onModalClose]
  );

  const onTakeHold = useCallback(() => setRedirectToHold(true), []);
  const onSubmit = useCallback(() => setRedirectToBooking(true), []);

  const onActionClick = useCallback(
    type => {
      setModalContext(type);
      onModalOpen();
    },
    [onModalOpen, setModalContext]
  );

  if (redirectToBooking) return <Redirect to={`/hotels/${id}/booking`} />;
  if (redirectToHold) return <Redirect to={`/hotels/${id}/hold`} />;

  const defaultProps = { hotel, id, onTakeHold, onSubmit, onActionClick, ...modal, ...props };

  return (
    <Loader isLoading={!loaded} text={t('messages.gettingHotel')}>
      <StyledHotelContainer>
        {isMobile ? renderTabs(t, defaultProps) : renderFull(t, defaultProps)}
      </StyledHotelContainer>
      {renderModal(t, { id, ...modal, ...props, onModalComplete })}
    </Loader>
  );
};

HotelContainer.propTypes = propTypes;
HotelContainer.defaultProps = defaultProps;

export default compose(
  connect,
  withRouter
)(HotelContainer);
