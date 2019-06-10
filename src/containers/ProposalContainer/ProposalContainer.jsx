import React, { useState, Fragment } from 'react';
import { compose, equals, isEmpty, join, map, partial, pickAll, pipe, prop, propOr, props } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ADMIN_BASE_URL } from 'config';
import { Loader, BookingForm, Tabs, Section, DropDownMenu } from 'components';
import { useFetchData, useCurrentWidth, useEffectBoundary } from 'effects';
import { isMobile, formatDate } from 'utils';
import { fields, validation, data } from 'config/forms/bookingForm';

import { isActive } from 'store/common';

import SummaryForm from 'containers/SummaryForm';

import connect from './ProposalContainer.state';
import { propTypes, defaultProps } from './ProposalContainer.props';
import {
  Back,
  BookingPath,
  BookingPathSegment,
  Button,
  Chevron,
  GuestName,
  Menu,
  Proposal,
  ProposalActions,
  ProposalActionsWrapper,
  ProposalGuestForm,
  ProposalGuestInfo,
  ProposalId,
  ProposalSummary,
  StatusStrip,
  StatusStripDate,
  StyledBreadcrumbs,
  StyledProposalContainer,
  Title,
} from './ProposalContainer.styles';
import { simpleForm, withoutSections } from './ProposalContainer.utils';

const ViewTypes = {
  GENERATE: 'generate',
  RESORTS: 'resorts',
};

const reloadIfMissing = pipe(
  propOr([], 'bookings'),
  isEmpty
);

const renderBackButton = (label, props) => <Back {...props}>{label}</Back>;

const renderBackToProposals = t => renderBackButton(t('labels.proposals'), { href: `${ADMIN_BASE_URL}/proposals` });
const renderBackToSearch = t => renderBackButton(t('labels.backToSearch'), { to: '/search' });

const renderBreadcrumbs = (
  t,
  { proposal, id, mobileView, onMobileNavClick, isGenerateView, isResortsView, isEdit }
) => {
  const links = isEdit
    ? [
        { label: renderBackToSearch(t) },
        { label: prop('name', proposal), to: `/proposals/${id}` },
        { label: t('labels.enterGuestDetails'), to: `/proposals/${id}/edit` },
      ]
    : [{ label: renderBackToProposals(t) }, { label: t('labels.proposalWithId', { id }), to: `/proposals/${id}` }];
  return (
    <Fragment>
      {mobileView && (isEdit ? renderBackToSearch(t) : renderBackToProposals(t))}
      {mobileView ? (
        <BookingPath>
          <BookingPathSegment onClick={onMobileNavClick} data-active={isResortsView}>
            {t('labels.resortsDetails')}
          </BookingPathSegment>
          <Chevron>chevron_right</Chevron>
          <BookingPathSegment data-active={isGenerateView}>{t('labels.reviewAndGenerate')}</BookingPathSegment>
        </BookingPath>
      ) : (
        <StyledBreadcrumbs links={links} />
      )}
    </Fragment>
  );
};

const renderBooking = (t, { isEdit, onBookingRemove }, booking) =>
  booking && (
    <Fragment key={prop('uuid', booking)}>
      <SummaryForm id={prop('uuid', booking)} summaryOnly compact>
        {isEdit && (
          <ProposalActionsWrapper>
            <ProposalActions>
              <DropDownMenu showArrow={false} title={<Menu>more_vert</Menu>}>
                <span onClick={() => onBookingRemove(prop('uuid', booking))}>{t('buttons.remove')}</span>
              </DropDownMenu>
            </ProposalActions>
          </ProposalActionsWrapper>
        )}
      </SummaryForm>
    </Fragment>
  );

const renderProposalSummary = (t, { isEdit, mobileView, isResortsView, onViewChange, bookings, onBookingRemove }) =>
  (!mobileView || isResortsView) && (
    <ProposalSummary>
      {!mobileView && <Title>{t('labels.propertiesAndRooms')}</Title>}
      {map(partial(renderBooking, [t, { onBookingRemove, isEdit }]), bookings)}
      {mobileView && isEdit && <Button onClick={onViewChange}>{t('labels.reviewAndGenerate')}</Button>}
    </ProposalSummary>
  );

const renderProposalGuestForm = (t, { mobileView, isGenerateView, isEdit, proposal, onGenerateAndSend }) =>
  isEdit &&
  ((!mobileView || isGenerateView) && (
    <ProposalGuestForm>
      <BookingForm
        onSubmit={onGenerateAndSend}
        initialValues={pickAll(['guestTitle', 'guestFirstName', 'guestLastName', 'comments'], proposal)}
        fields={simpleForm(fields)}
        validation={validation}
        data={withoutSections(data)}
      >
        <Button type="submit">{t('buttons.generateAndSend')}</Button>
      </BookingForm>
    </ProposalGuestForm>
  ));

const renderStatusStrip = (t, { createdAt, isEdit }) =>
  !isEdit && (
    <StatusStrip>
      {t('labels.createdAt')} <StatusStripDate>{formatDate(createdAt, 'MMM D, YYYY')}</StatusStripDate>
    </StatusStrip>
  );

const renderProposalGuestInfo = (t, { isEdit, mobileView, proposal }) =>
  !isEdit && (
    <Fragment>
      {mobileView && renderStatusStrip(t, { isEdit, ...proposal })}
      <ProposalGuestInfo>
        <Section label={t('labels.leadGuestInfo')}>
          <GuestName>{join(' ', props(['guestTitle', 'guestFirstName', 'guestLastName'], proposal))}</GuestName>
        </Section>

        {!isNilOrEmpty(prop('comments', proposal)) && (
          <Section label={t('comment_plural')}>{prop('comments', proposal)}</Section>
        )}
      </ProposalGuestInfo>
    </Fragment>
  );

export const ProposalContainer = ({
  bookings,
  errors,
  fetchProposal,
  id,
  isEdit,
  proposal,
  removeBooking,
  status,
  updateProposal,
}) => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [view, setView] = useState(ViewTypes.RESORTS);
  const currentWidth = useCurrentWidth();

  const mobileView = isMobile(currentWidth);
  const isResortsView = equals(ViewTypes.RESORTS, view);
  const isGenerateView = equals(ViewTypes.GENERATE, view);

  const loaded = useFetchData(status, fetchProposal, [id], undefined, reloadIfMissing(proposal));

  const loading = !loaded || isActive(status);

  useEffectBoundary(() => {
    submitted && !isNilOrEmpty(errors) && setSubmitted(false);
  }, [errors]);

  if (isEdit && submitted) return <Redirect to={`/proposals/${id}`} />;

  const onMobileNavClick = () => setView(ViewTypes.RESORTS);
  const onViewChange = () => setView(ViewTypes.GENERATE);
  const onBookingRemove = bookingId => removeBooking(id, bookingId);
  const onGenerateAndSend = values => {
    updateProposal(id, values);
    setSubmitted(true);
  };

  const renderFull = () => (
    <Fragment>
      {renderBreadcrumbs(t, {
        id,
        isEdit,
        isGenerateView,
        isResortsView,
        mobileView,
        onMobileNavClick,
        proposal,
      })}
      {renderStatusStrip(t, { isEdit, ...proposal })}
      <Proposal>
        {renderProposalSummary(t, { mobileView, isResortsView, isEdit, onViewChange, bookings, onBookingRemove })}
        {isEdit
          ? renderProposalGuestForm(t, { mobileView, isGenerateView, isEdit, proposal, onGenerateAndSend })
          : renderProposalGuestInfo(t, { mobileView, isGenerateView, isEdit, proposal })}
      </Proposal>
    </Fragment>
  );

  const renderTabs = () => (
    <Fragment>
      <ProposalId>{t('labels.proposalWithId', { id })}</ProposalId>
      <Tabs labels={[t('labels.resortsDetails'), t('labels.guestsDetails')]}>
        {renderProposalSummary(t, { mobileView, isResortsView, onViewChange, bookings, isEdit, onBookingRemove })}
        {renderProposalGuestInfo(t, { mobileView, isGenerateView, isEdit, proposal })}
      </Tabs>
    </Fragment>
  );

  return (
    <Loader isLoading={loading} text={t('messages.gettingProposal')}>
      <StyledProposalContainer>{!mobileView || isEdit ? renderFull() : renderTabs()}</StyledProposalContainer>
    </Loader>
  );
};

ProposalContainer.propTypes = propTypes;
ProposalContainer.defaultProps = defaultProps;

export default compose(connect)(ProposalContainer);
