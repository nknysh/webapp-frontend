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

interface ValueLabelPair {
  value: string;
  label: string;
}

const renderBackButton = t => <Back to="/search/beta">{t('labels.backToSearch')}</Back>;

const AddToProposalModalContent = props => {
  const { proposals, hotelUuid } = props;
  const { createNewProposal, addToProposal }: { createNewProposal: Function; addToProposal: Function } = props;

  const [selectedProposalUuid, setSelectedProposalUuid] = useState('new');
  const [newProposalName, setNewProposalName] = useState('');
  const [isNewProposal, setIsNewProposal] = useState(selectedProposalUuid === 'new');

  // const onModalComplete = useCallback(
  //   data => {
  //     if (equals('proposal', prop('modalContext', modal))) {
  //       onModalClose();
  //       history.push(`/proposals/${data.toString()}/edit`);
  //     }
  //   },
  //   [history, modal, onModalClose]
  // );

  const handleProposalNameChange = e => {
    if (e.target.value === 'new') {
      setIsNewProposal(true);
    } else {
      setIsNewProposal(false);
    }
    setSelectedProposalUuid(e.target.value);
  };

  const handleAddToProposalSubmit = () => {
    // we should NEVER place holds as we are making proposals which is why a hard `false` is passed here
    if (isNewProposal) {
      createNewProposal(newProposalName, hotelUuid, false);
    } else {
      addToProposal(selectedProposalUuid, hotelUuid, false);
    }
  };

  const selectOptions: ValueLabelPair[] = [];

  selectOptions.push({
    value: 'new',
    label: 'New Proposal',
  });

  Object.keys(proposals).map(pKey =>
    selectOptions.push({
      value: pKey,
      label: proposals[pKey],
    })
  );

  return (
    <div className="add-to-proposal">
      <select value={selectedProposalUuid} onChange={handleProposalNameChange}>
        {selectOptions.map(o => (
          <option value={o.value}>{o.label}</option>
        ))}
      </select>

      {isNewProposal && <input value={newProposalName} onChange={e => setNewProposalName(e.target.value)} />}

      <hr />
      <button type="button" onClick={handleAddToProposalSubmit}>
        Add to Proposal
      </button>
    </div>
  );
};

const renderBrochure = ({ uuid, displayName, url }) => (
  <Brochure key={uuid} href={url} target="_blank">
    {displayName}
  </Brochure>
);

const HotelSummary = props => {
  const { fetchProposals, proposals } = props;
  const { createNewProposal, addToProposal }: { createNewProposal: Function; addToProposal: Function } = props;

  const { hotel, paymentTerms, cancellationPolicy, offersTerms, t, id, brochures, onSubmit } = props;
  const { canBook, canHold, onTakeHold, booking } = props;

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
        modalHeader={<h2>Add Current Booking to Proposal</h2>}
        modalContent={
          <AddToProposalModalContent
            proposals={proposals}
            hotelUuid={booking.hotelUuid}
            createNewProposal={createNewProposal}
            addToProposal={addToProposal}
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

  const defaultProps = { hotel, photos, id, onTakeHold, onSubmit, ...props };

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
