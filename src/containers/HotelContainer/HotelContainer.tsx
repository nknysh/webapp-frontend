import React, { Fragment, useState, Children, useCallback, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { compose, isEmpty, map, prop, values, equals, partial } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';
import { Loader, Tabs, List } from '@pure-escapes/webapp-ui-components';
import { withUser } from 'hoc';
import { useCurrentWidth, useModalState } from 'effects';
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

const renderBackButton = t => <Back to="/search/beta">{t('labels.backToSearch')}</Back>;

/**
 *
 * @param {object} t translation
 * @param {object} props
 * @param {string} props.id the id
 * @param {object} props.hotel the hotel object
 */
// export const renderBreadcrumbs = (t, { id, hotel }) => (

// );

const renderBrochure = ({ uuid, displayName, url }) => (
  <Brochure key={uuid} href={url} target="_blank">
    {displayName}
  </Brochure>
);

/**
 *
 * @param {object} props
 * @param {string} props.id the id
 * @param {object} props.hotel the hotel object
 * @param {object} props.photos hotel photos
 */

const HotelSummary = props => {
  const { hotel, paymentTerms, cancellationPolicy, offersTerms, t, id, brochures, onSubmit } = props;
  const { canBook, canHold, onActionClick, onTakeHold, onModalComplete, booking } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(1);

  const handleAddToProposalClick = e => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <Aside>
      <Modal
        isOpen={isModalOpen}
        modalHeader={<h2>Add Current Booking to Proposal</h2>}
        modalContent={
          <div>
            <p>current count: {count}</p>
            <button onClick={() => setCount(count + 1)}>increase</button>
          </div>
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

// const renderModal = (t, { id, modalOpen, modalContext, canBook, onModalClose, onModalComplete, booking }) =>
//   modalOpen && (
//     <StyledModal open={modalOpen} onClose={onModalClose}>
//       {equals('proposal', modalContext) && (

//       )}
//     </StyledModal>
//   );

export const HotelContainer = ({ history, fetchHotel, hotel, photos, id, ...props }) => {
  const { t } = useTranslation();

  const [redirectToBooking, setRedirectToBooking] = useState(false);
  const [redirectToHold, setRedirectToHold] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { onModalClose, setModalContext, onModalOpen } = modal;
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

  const defaultProps = { hotel, photos, id, onTakeHold, onSubmit, onActionClick, ...modal, ...props };

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
  withRouter,
  withUser
)(HotelContainer);
