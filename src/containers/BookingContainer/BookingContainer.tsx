import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { compose, values } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';
import { Container, Loader, Section, Tabs } from '@pure-escapes/webapp-ui-components';

import { Breadcrumbs } from 'components';
import { useCurrentWidth } from 'effects';
import { withUser } from 'hoc';
import { formatDate } from 'utils';

import connect from './BookingContainer.state';
import { propTypes, defaultProps } from './BookingContainer.props';
import {
  Back,
  Bolded,
  Booking,
  BookingContent,
  BookingTitle,
  Main,
  StatusStrip,
  StatusStripDate,
  StatusStripStatus,
} from './BookingContainer.styles';
import { AsideDetails, Title } from '../HotelContainer/HotelContainer.styles';
import { List } from '@pure-escapes/webapp-ui-components';
import BookingSummaryLite from 'pureUi/BookingSummaryLite';
import BookingStatus from 'pureUi/BookingStatus';
import BookingStatusHistory from 'pureUi/BookingStatusHistory';
import { mapWithIndex } from 'utils';

import BookingGuestDetails from './BookingGuestDetails';
import BookingSummaryPotentialTA from './BookingSummaryPotential/TA';
import BookingSummaryPotentialSR from './BookingSummaryPotential/SR';
import BookingSummaryRequestedTA from './BookingSummaryRequested/TA';
import BookingSummaryRequestedSR from './BookingSummaryRequested/SR';

import BookingSummaryConfirmedTA from './BookingSummaryConfirmed/TA';
import BookingSummaryConfirmedSR from './BookingSummaryConfirmed/SR';

import { Upload as IUpload } from 'services/BackendApi/types';

const renderBackButton = (label, props) => <Back {...props}>{label}</Back>;
const renderBackToSearch = t => renderBackButton(t('labels.backToSearch'), { to: '/search/beta' });
const renderBackToBookings = t => renderBackButton(t('enquiryBooking_plural'), { href: '/bookings' });

const renderBreadcrumbs = (t, { id }) => (
  <Breadcrumbs
    links={[{ label: renderBackToBookings(t) }, { label: t('labels.bookingWithId', { id }), to: `/bookings/${id}` }]}
  />
);

const renderStatusStrip = (t, booking) => {
  if (isNilOrEmpty(booking)) {
    return null;
  }

  return (
    <StatusStrip>
      <StatusStripDate>
        {t('labels.createdAt')} <Bolded>{formatDate(booking.createdAt, 'MMM d, yyyy')}</Bolded>
      </StatusStripDate>
      <StatusStripStatus status={booking.status} />
    </StatusStrip>
  );
};

const BookingDetails = props => {
  const { t, booking, isSr, isMobile } = props;
  if (isNilOrEmpty(booking)) {
    return null;
  }

  const { status, stateHistory } = booking;

  return (
    <BookingContent>
      {isSr && isMobile && renderStatusStrip(t, booking)}
      <Section label={t('labels.bookingStatus')}>
        {stateHistory?.length ? <BookingStatusHistory data={stateHistory} /> : <BookingStatus status={status} />}
      </Section>
      <BookingGuestDetails t={t} isSr={isSr} booking={booking} />
    </BookingContent>
  );
};

const BookingSummaryCancelled = props => {
  const { t, booking } = props;

  return (
    <React.Fragment>
      {!isNilOrEmpty(booking.proposalUuid) && (
        <AsideDetails>
          <Title>{t('labels.proposalId')}</Title>
          <List>
            <a href={`/proposals/${booking.proposalUuid}`}>Proposal #{booking.proposalUuid}</a>
          </List>
        </AsideDetails>
      )}
    </React.Fragment>
  );
};

const BookingSummary = props => {
  const { t, booking, holds, paymentTerms, cancellationPolicy, offersTerms, isSr, newBooking } = props;
  if (isNilOrEmpty(newBooking.currentBookingBuilder)) {
    return null;
  }
  if (isNilOrEmpty(booking)) {
    return null;
  }

  return (
    <div>
      <BookingSummaryLite t={t} booking={booking} hideViewBookingButton={true} />

      {booking.status === 'potential' &&
        (isSr ? <BookingSummaryPotentialSR {...props} /> : <BookingSummaryPotentialTA {...props} />)}

      {booking.status === 'requested' &&
        (isSr ? <BookingSummaryRequestedSR {...props} /> : <BookingSummaryRequestedTA {...props} />)}

      {booking.status === 'confirmed' &&
        (isSr ? <BookingSummaryConfirmedSR {...props} /> : <BookingSummaryConfirmedTA {...props} />)}

      {booking.status === 'cancelled' && <BookingSummaryCancelled t={t} booking={booking} holds={holds} {...props} />}

      {booking && booking.breakdown && booking.breakdown.uploads && (
        <AsideDetails>
          <Title>{t('labels.uploads')}</Title>

          <List>
            {booking.breakdown.uploads.map((upload: IUpload) => {
              return (
                <a target="_blank" rel="noopener noreferrer" key={upload.url} href={upload.url}>
                  {upload.displayName}
                </a>
              );
            })}
          </List>
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
    </div>
  );
};

const BookingTabsLayout = props => {
  return (
    <Fragment>
      {props.isDetails ? (
        <BookingTitle>{props.t('labels.bookingWithId', { id: props.humanReadableId })}</BookingTitle>
      ) : (
        renderBackToSearch(props.t)
      )}
      {props.isDetails ? (
        <Tabs labels={[props.t('labels.resortDetails'), props.t('labels.guestsDetails')]}>
          <BookingSummary {...props} />
          <BookingDetails t={props.t} booking={props.booking} isSr={props.isSr} isMobile={props.isMobile} />
        </Tabs>
      ) : (
        <BookingContent>{props.children}</BookingContent>
      )}
    </Fragment>
  );
};

const BookingFullLayout = props => {
  return (
    <Fragment>
      {props.isDetails && renderBreadcrumbs(props.t, props)}
      {props.isSr && props.isDetails && renderStatusStrip(props.t, props.booking)}
      <Main>
        {props.isDetails ? <BookingDetails {...props} /> : <BookingContent>{props.children}</BookingContent>}
        <aside style={{ width: '50%' }}>
          <BookingSummary {...props} />
        </aside>
      </Main>
    </Fragment>
  );
};

export const BookingContainer = props => {
  const {
    booking,
    clearCreatedBooking,
    created,
    fetchBooking,
    id,
    isDetails,
    holds,
    forwardsCompatBookingBuilderAction,
    fetchProposals,
  } = props;

  const { t } = useTranslation();

  const [isLoading, setIsLoaded] = useState(true);

  // when the booking container loads in, load the proposals
  // TODO this can be made more efficient by only loading them in when we strictly need them
  useEffect(() => {
    async function load() {
      await fetchProposals();
    }
    load();
  }, [fetchProposals]);

  useEffect(() => {
    async function load() {
      await fetchBooking(id);
      setIsLoaded(false);
    }
    if (isNilOrEmpty(booking)) {
      load();
    }
    setIsLoaded(false);
    // forwards compat the booking builder
    // this is so we can easily read the cancellation policies, etc.
    forwardsCompatBookingBuilderAction(booking, holds);
  }, [fetchBooking, forwardsCompatBookingBuilderAction, booking, holds, id]);

  const { isMobile } = useCurrentWidth();

  // Whether there is a created ID for this booking
  const [hasCreated] = useState(created);

  // If there is a created flag for this booking, remove it from the redux store
  if (hasCreated) clearCreatedBooking(id);

  // Redirect to the booking details page if user shouldn't be on this page
  if (!isDetails && !hasCreated) return <Redirect to={`/bookings/${id}`} />;

  const defaultProps = {
    ...props,
    isMobile,
  };

  return (
    <Loader isLoading={isLoading} text={t('messages.gettingBooking')}>
      <Container>
        <Booking>
          {isMobile ? <BookingTabsLayout t={t} {...defaultProps} /> : <BookingFullLayout t={t} {...defaultProps} />}
        </Booking>
      </Container>
    </Loader>
  );
};

BookingContainer.propTypes = propTypes;
BookingContainer.defaultProps = defaultProps;

export default compose(withRouter, withUser, connect)(BookingContainer);
