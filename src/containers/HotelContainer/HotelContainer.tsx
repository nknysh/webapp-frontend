import React, { Fragment, useState, Children, useCallback, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { compose, isEmpty, map, prop, values } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';
import { Loader, Tabs, List } from '@pure-escapes/webapp-ui-components';
import { withUser } from 'hoc';
import { useCurrentWidth } from 'effects';
import { mapWithIndex } from 'utils';
import { StandardModal, ModalContent, ModalHeader } from 'pureUi/Modal';
import { Icon } from '@material-ui/core';
import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import { Heading1 } from 'styles';

import connect from './HotelContainer.state';
import { propTypes, defaultProps } from './HotelContainer.props';
import {
  AsideDetails,
  Back,
  Full,
  StyledBreadcrumbs,
  StyledHotelContainer,
  Text,
  Title,
} from './HotelContainer.styles';
import { Hotel } from 'components';
import SummaryForm from 'containers/SummaryForm';
import { makeBackendApi } from 'services/BackendApi';
import { IReduxDomainStatus } from '../../interfaces';
import { AddToProposalModalContent } from './AddToProposalModal';
import {
  TableCardBox,
  TableCardRow,
  TableCardNumberedBanner,
  TableCardNumberBannerNumber,
  TableCardNumberBannerText,
} from 'pureUi/TableCard';
const LeftColumn = props => {
  const { id, hotel, photos } = props;

  return (
    <div
      style={{
        flex: 1,
        paddingLeft: '14px',
        paddingRight: '14px',
      }}
    >
      <TableCardNumberedBanner className="mb-4">
        <TableCardNumberBannerNumber>1</TableCardNumberBannerNumber>
        <TableCardNumberBannerText>Select Room Type</TableCardNumberBannerText>
      </TableCardNumberedBanner>
      <Hotel {...hotel} id={id} photos={photos} />
    </div>
  );
};

const RightColumn = props => {
  return (
    <div
      style={{
        flex: 1,
        paddingLeft: '14px',
        paddingRight: '14px',
      }}
    >
      <HotelSummary {...props} />
    </div>
  );
};

const renderBackButton = t => <Back to="/search/beta">{t('labels.backToSearch')}</Back>;

const renderBrochure = ({ uuid, displayName, url }) => (
  <TableCardRow key={uuid} depth={3} className="table-card-row brochure-row">
    <span>{displayName}</span>
    <a href={url} target="_blank">
      <Icon>get_app</Icon>
    </a>
  </TableCardRow>
);

const HotelSummary = props => {
  const { proposals, history, booking, hotel, paymentTerms, cancellationPolicy, offersTerms, t, id, brochures, actingCountryCode } = props;
  const { proposalResult, proposalStatus }: { proposalResult: string; proposalStatus: IReduxDomainStatus } = props;
  const { canBook, canHold, onTakeHold }: { canBook: boolean; canHold: boolean; onTakeHold: boolean } = props;
  const {
    fetchProposals,
    createNewProposal,
    addToProposal,
  }: { fetchProposals: Function; createNewProposal: Function; addToProposal: Function } = props;

  const backendApi = makeBackendApi(actingCountryCode);

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

  const handleCreateNewProposalClick = (name, bookingId, placeHolds) => {
    createNewProposal(name, bookingId, placeHolds, backendApi);
  };

  return (
    <aside id="aside">
      <TableCardNumberedBanner className="mb-4">
        <TableCardNumberBannerNumber>2</TableCardNumberBannerNumber>
        <TableCardNumberBannerText>Review Selections</TableCardNumberBannerText>
      </TableCardNumberedBanner>
      {isModalOpen && (
        <StandardModal onClose={() => setIsModalOpen(false)}>
          <ModalHeader>
            <Heading1>{t('buttons.addToProposal')}</Heading1>
          </ModalHeader>
          <ModalContent>
            <AddToProposalModalContent
              proposals={proposals}
              hotelUuid={booking && booking.request && booking.request.hotelUuid ? booking.request.hotelUuid : null}
              createNewProposal={handleCreateNewProposalClick}
              addToProposal={addToProposal}
              proposalStatus={proposalStatus}
              proposalResult={proposalResult}
              history={history}
            />
          </ModalContent>
        </StandardModal>
      )}
      <SummaryForm
        id={id}
        showRoomImage={false}
        canHold={canHold}
        handleAddToProposalClick={handleAddToProposalClick}
      />

      {hotel.additionalInfo && (
        <TableCardBox className="mt-4">
          <TableCardRow depth={3} hasOriginalLineHeight={true}>
            <Title>{t('labels.thingsToBeAwareOf')}</Title>
            <Text>{hotel.additionalInfo}</Text>
          </TableCardRow>
        </TableCardBox>
      )}
      {!isNilOrEmpty(hotel.policiesAndRestrictions) && (
        <TableCardBox className="mt-4">
          <TableCardRow depth={3} hasOriginalLineHeight={true}>
            <Title>{t('labels.policiesAndRestrictions')}</Title>
            <List>{Children.toArray(hotel.policiesAndRestrictions)}</List>
          </TableCardRow>
        </TableCardBox>
      )}
      {!isNilOrEmpty(cancellationPolicy) && (
        <TableCardBox className="mt-4">
          <TableCardRow depth={3} hasOriginalLineHeight={true}>
            <Title>{t('labels.cancellationPolicy')}</Title>
            <List>{cancellationPolicy}</List>
          </TableCardRow>
        </TableCardBox>
      )}
      {!isNilOrEmpty(paymentTerms) && (
        <TableCardBox className="mt-4">
          <TableCardRow depth={3} hasOriginalLineHeight={true}>
            <Title>{t('labels.paymentTerms')}</Title>
            <List>{paymentTerms}</List>
          </TableCardRow>
        </TableCardBox>
      )}
      {!isNilOrEmpty(offersTerms) && (
        <TableCardBox className="mt-4">
          <TableCardRow depth={3} hasOriginalLineHeight={true}>
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
          </TableCardRow>
        </TableCardBox>
      )}
      {!isEmpty(brochures) && (
        <TableCardBox className="mt-4">
          <AsideDetails>
            <TableCardRow depth={3} hasOriginalLineHeight={true}>
              <Title>{t('brochure_plural')}</Title>
            </TableCardRow>
            {values(map(renderBrochure, brochures))}
          </AsideDetails>
        </TableCardBox>
      )}
    </aside>
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
        <div
          style={{
            width: '50%',
          }}
        >
          <LeftColumn id={id} photos={photos} hotel={hotel} />
        </div>
        <div
          style={{
            width: '50%',
          }}
        >
          <RightColumn {...props} />
        </div>
      </Full>
    </Fragment>
  );
};

export const HotelTabLayout = props => {
  const { t, id, hotel, photos } = props;

  return (
    <Fragment>
      <StyledBreadcrumbs
        links={[{ label: renderBackButton(t) }, { label: prop('name', hotel), to: `/hotels/${id}` }]}
      />
      <Tabs labels={['Rooms', 'Booking']}>
        <div style={{ paddingTop: '14px' }}>
          <LeftColumn id={id} photos={photos} hotel={hotel} />
        </div>
        <div style={{ paddingTop: '14px' }}>
          <RightColumn {...props} />
        </div>
      </Tabs>
    </Fragment>
  );
};

export const HotelContainer = ({
  className,
  history,
  fetchHotel,
  hotel,
  photos,
  id,
  resetBookingBuilderUiState,
  ...props
}) => {
  const { t } = useTranslation();
  const [redirectToHold, setRedirectToHold] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { initializeBooking, match, selectedTa } = props;

  const { isMobile } = useCurrentWidth();

  useEffect(() => {
    return () => {
      resetBookingBuilderUiState();
    };
  }, []);

  useEffect(() => {
    // if we have a selectedTa from the withTravelAgent domain
    //   initialise with that too
    if (selectedTa && selectedTa.uuid) {
      initializeBooking(match.params.id, selectedTa.uuid);
    } else {
      initializeBooking(match.params.id);
    }
  }, [initializeBooking, match, selectedTa]);

  useEffect(() => {
    async function load() {
      await fetchHotel(id);
      setIsLoading(false);
    }
    load();
  }, [fetchHotel, id]);

  const onTakeHold = useCallback(() => setRedirectToHold(true), []);
  if (redirectToHold) return <Redirect to={`/hotels/${id}/hold`} />;

  const defaultProps = { history, hotel, photos, id, onTakeHold, ...props };

  const renderWithLoader = () => (
    <Loader isLoading={isLoading} text={t('messages.gettingHotel')}>
      {renderWithoutLoader()}
    </Loader>
  );

  const renderWithoutLoader = () => (
    <React.Fragment>
      <StyledHotelContainer>
        {isMobile && <HotelTabLayout t={t} {...defaultProps} />}
        {!isMobile && <HotelFullLayout t={t} {...defaultProps} />}
      </StyledHotelContainer>
    </React.Fragment>
  );

  return <div className={className}>{isEmpty(hotel) ? renderWithLoader() : renderWithoutLoader()}</div>;
};

HotelContainer.propTypes = propTypes;
HotelContainer.defaultProps = defaultProps;

const ConnectedHotel = compose(
  connect,
  // @ts-ignore
  withRouter,
  withUser
)(HotelContainer);

export default styled(ConnectedHotel)`
  .table-card-row.brochure-row {
    display: flex;
    padding-bottom: 12px;
    padding-top: 12px;
    line-height: 14px;
    padding-left: 40px;
    font-size: 12px;
    text-transform: uppercase;
    color: #736a65;
    border-bottom: 1px solid ${pureUiTheme.colors.grayDark};

    &:nth-child(2) {
      padding-top: 0px;
    }

    span {
      flex: 1;
      &::before {
        content: '';
        border-color: transparent #111;
        border-style: solid;
        border-width: 3px 0 3px 4px;
        display: block;
        height: 0;
        width: 0;
        left: -10px;
        top: 10px;
        position: relative;
      }
    }

    a {
      display: block;
      margin-top: 4px;
      margin-bottom: -4px;
      color: ${pureUiTheme.colors.gold};

      &:hover {
        color: ${pureUiTheme.colors.teal};
      }
    }
  }
`;
