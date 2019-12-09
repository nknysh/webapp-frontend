import React, { Fragment, useState, Children, useCallback, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { compose, isEmpty, map, prop, values, equals, partial } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';
import { Loader, Tabs, List } from '@pure-escapes/webapp-ui-components';
import { withUser } from 'hoc';
import { useCurrentWidth } from 'effects';
import { mapWithIndex } from 'utils';
import Modal from 'pureUi/Modal';

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
  SummaryAction,
  SummaryActions,
  Text,
  Title,
} from './HotelContainer.styles';

import { ReduxDomainStatus } from '../../interfaces';

import { AddToProposalModalContent } from './AddToProposalModal';

const renderBackButton = t => <Back to="/search/beta">{t('labels.backToSearch')}</Back>;

const renderBrochure = ({ uuid, displayName, url }) => (
  <Brochure key={uuid} href={url} target="_blank">
    {displayName}
  </Brochure>
);

const HotelSummary = props => {
  const { proposals, history, booking, hotel, paymentTerms, cancellationPolicy, offersTerms, t, id, brochures } = props;
  const { proposalResult, proposalStatus }: { proposalResult: string; proposalStatus: ReduxDomainStatus } = props;
  const { canBook, canHold, onTakeHold }: { canBook: boolean; canHold: boolean; onTakeHold: boolean } = props;
  const {
    fetchProposals,
    createNewProposal,
    addToProposal,
    onSubmit,
  }: { fetchProposals: Function; createNewProposal: Function; addToProposal: Function; onSubmit: Function } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  // we ALWAYS need to fetch the new proposals
  useEffect(() => {
    async function load() {
      await fetchProposals();
    }
    load();
  }, [fetchProposals]);

  const handleAddToProposalClick = e => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <Aside>
      <Modal
        isOpen={isModalOpen}
        modalHeader={<h2>{t('buttons.addToProposal')}</h2>}
        modalContent={
          <AddToProposalModalContent
            proposals={proposals}
            hotelUuid={booking && booking.hotelUuid ? booking.hotelUuid : null}
            createNewProposal={createNewProposal}
            addToProposal={addToProposal}
            proposalStatus={proposalStatus}
            proposalResult={proposalResult}
            history={history}
          />
        }
        onClose={() => setIsModalOpen(false)}
      />
      <StyledSummary id={id} onSubmit={onSubmit} showRoomImage={false}>
        {() => {
          // for some INSANE reason, SummaryForm treats its children as a function, always, which receives the booking
          return (
            <SummaryActions>
              <SummaryAction type="button" onClick={onTakeHold} disabled={!canBook || !canHold}>
                {t('buttons.takeAHold')}
              </SummaryAction>
              <SummaryAction type="button" disabled={!canBook} onClick={handleAddToProposalClick}>
                {t('buttons.addToProposal')}
              </SummaryAction>
            </SummaryActions>
          );
        }}
      </StyledSummary>
      {hotel.additionalInfo && (
        <AsideDetails>
          <Title>{t('labels.thingsToBeAwareOf')}</Title>
          <Text>{hotel.additionalInfo}</Text>
        </AsideDetails>
      )}
      {!isNilOrEmpty(hotel.policiesAndRestrictions) && (
        <AsideDetails>
          <Title>{t('labels.policiesAndRestrictions')}</Title>
          <List>{Children.toArray(hotel.policiesAndRestrictions)}</List>
        </AsideDetails>
      )}
      {!isNilOrEmpty(cancellationPolicy) && (
        <AsideDetails>
          <Title>{t('labels.cancellationPolicy')}</Title>
          <List>{cancellationPolicy}</List>
        </AsideDetails>
      )}
      {!isNilOrEmpty(paymentTerms) && (
        <AsideDetails>
          <Title>{t('labels.paymentTerms')}</Title>
          <List>{paymentTerms}</List>
        </AsideDetails>
      )}
      {!isNilOrEmpty(offersTerms) && (
        <AsideDetails>
          <Title>{t('labels.offersTerms')}</Title>
          <List>
            {mapWithIndex(
              ({ name, termsAndConditions }, i) => (
                <Fragment key={i}>
                  <span>{name}</span>
                  <p>{termsAndConditions}</p>
                </Fragment>
              ),
              values(offersTerms)
            )}
          </List>
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

export const HotelTabLayout = props => {
  const { t, id, hotel, photos } = props;

  return (
    <Fragment>
      {renderBackButton(t)}
      <Tabs centered labels={[t('labels.hotelDetails'), t('labels.yourSelection')]}>
        <StyledHotel {...hotel} id={id} photos={photos} />
        <HotelSummary t={t} {...props} />
      </Tabs>
    </Fragment>
  );
};

export const HotelFullLayout = props => {
  const { t, id, hotel, photos } = props;

  return (
    <Fragment>
      <StyledBreadcrumbs
        links={[{ label: renderBackButton(t) }, { label: prop('name', hotel), to: `/hotels/${id}` }]}
      />
      <Full>
        <StyledHotel {...hotel} id={id} photos={photos} />
        <HotelSummary t={t} {...props} />
      </Full>
    </Fragment>
  );
};

export const HotelContainer = ({ history, fetchHotel, hotel, photos, id, ...props }) => {
  const { t } = useTranslation();

  const [redirectToBooking, setRedirectToBooking] = useState(false);
  const [redirectToHold, setRedirectToHold] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { initializeBooking, match } = props;

  useEffect(() => {
    initializeBooking(match.params.id);
  }, [initializeBooking, match]);

  useEffect(() => {
    async function load() {
      await fetchHotel(id);
      setIsLoading(false);
    }
    load();
  }, [fetchHotel, id]);

  const { isMobile } = useCurrentWidth();

  const onTakeHold = useCallback(() => setRedirectToHold(true), []);
  const onSubmit = useCallback(() => setRedirectToBooking(true), []);

  if (redirectToBooking) return <Redirect to={`/hotels/${id}/booking`} />;
  if (redirectToHold) return <Redirect to={`/hotels/${id}/hold`} />;

  const defaultProps = { history, hotel, photos, id, onTakeHold, onSubmit, ...props };

  const renderWithLoader = () => (
    <Loader isLoading={isLoading} text={t('messages.gettingHotel')}>
      {renderWithoutLoader()}
    </Loader>
  );

  const renderWithoutLoader = () => (
    <React.Fragment>
      <StyledHotelContainer>
        {isMobile ? <HotelTabLayout t={t} {...defaultProps} /> : <HotelFullLayout t={t} {...defaultProps} />}
      </StyledHotelContainer>
    </React.Fragment>
  );

  return isEmpty(hotel) ? renderWithLoader() : renderWithoutLoader();
};

HotelContainer.propTypes = propTypes;
HotelContainer.defaultProps = defaultProps;

export default compose(
  connect,
  // @ts-ignore
  withRouter,
  withUser
)(HotelContainer);
