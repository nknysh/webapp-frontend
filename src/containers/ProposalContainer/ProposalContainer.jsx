import React, { useState, Fragment } from 'react';
import {
  __,
  append,
  compose,
  equals,
  filter,
  includes,
  isEmpty,
  join,
  map,
  partial,
  path,
  pathOr,
  pickAll,
  pipe,
  prop,
  propOr,
  props,
  propSatisfies,
  without,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ADMIN_BASE_URL, API_BASE_URL } from 'config';
import { Loader, BookingForm, Tabs, Section, ContextMenu, Modal, Checkbox } from 'components';
import { useFetchData, useCurrentWidth, useEffectBoundary } from 'effects';
import { isMobile, formatDate } from 'utils';
import { fields, validation, data } from 'config/forms/bookingForm';

import { isActive, isSuccess } from 'store/common';

import SummaryForm from 'containers/SummaryForm';

import connect from './ProposalContainer.state';
import { propTypes, defaultProps } from './ProposalContainer.props';
import {
  AddonSummaries,
  Back,
  BookingFormAction,
  BookingFormActions,
  BookingPath,
  BookingPathSegment,
  Brochure,
  Button,
  Chevron,
  ExtraSummary,
  ExtraSummaryTitle,
  GuestName,
  PDFFrame,
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

const renderAdditionalResource = (
  t,
  { onAdditionalResourceClick, attachedUploads, isEdit },
  { displayName, uuid, url }
) => {
  const selected = includes(uuid, attachedUploads);

  return (
    <Fragment key={uuid}>
      {isEdit ? (
        <Checkbox label={displayName} value={uuid} onChange={onAdditionalResourceClick} checked={selected} />
      ) : (
        selected && <Brochure href={url}>{displayName}</Brochure>
      )}
    </Fragment>
  );
};

const renderAdditionalResources = (t, { booking, isEdit, onAdditionalResourceClick, attachedUploads }) => {
  const additionalResources = filter(
    propSatisfies(includes(__, ['floorPlan', 'brochure']), 'tag'),
    pathOr([], ['breakdown', 'uploads'], booking)
  );

  return (
    (isEdit || !isEmpty(attachedUploads)) && (
      <ExtraSummary>
        <ExtraSummaryTitle>{t(`labels.additionalResources`)}:</ExtraSummaryTitle>
        <AddonSummaries>
          {map(
            partial(renderAdditionalResource, [t, { onAdditionalResourceClick, attachedUploads, isEdit }]),
            additionalResources
          )}
        </AddonSummaries>
      </ExtraSummary>
    )
  );
};

const renderBooking = (
  t,
  { isEdit, onBookingRemove, onGuardEditComplete, canEdit, onAmend, onAdditionalResourceClick, attachedUploads },
  uuid
) =>
  uuid && (
    <Fragment key={uuid}>
      <SummaryForm
        bookLabel={t('buttons.amendBooking')}
        compact
        id={uuid}
        onGuardEditComplete={onGuardEditComplete}
        summaryOnly={!isEdit}
        canEdit={propOr(false, uuid, canEdit)}
        onSubmit={onAmend}
        canChangeDates={false}
      >
        {({ booking }) => (
          <Fragment>
            {renderAdditionalResources(t, { booking, isEdit, onAdditionalResourceClick, attachedUploads })}
            {isEdit && (
              <ProposalActionsWrapper>
                <ProposalActions>
                  <ContextMenu>
                    <span onClick={() => onBookingRemove(booking)}>{t('buttons.remove')}</span>
                  </ContextMenu>
                </ProposalActions>
              </ProposalActionsWrapper>
            )}
          </Fragment>
        )}
      </SummaryForm>
    </Fragment>
  );

const renderProposalSummary = (
  t,
  {
    attachedUploads,
    bookings,
    canEdit,
    isEdit,
    isResortsView,
    mobileView,
    onAdditionalResourceClick,
    onAmend,
    onBookingRemove,
    onGuardEditComplete,
    onViewChange,
  }
) =>
  (!mobileView || isResortsView) && (
    <ProposalSummary>
      {!mobileView && <Title>{t('labels.propertiesAndRooms')}</Title>}
      {map(
        partial(renderBooking, [
          t,
          {
            onBookingRemove,
            onGuardEditComplete,
            isEdit,
            onAmend,
            canEdit,
            onAdditionalResourceClick,
            attachedUploads,
          },
        ]),
        bookings
      )}
      {mobileView && isEdit && <Button onClick={onViewChange}>{t('labels.reviewAndGenerate')}</Button>}
    </ProposalSummary>
  );

const renderProposalGuestForm = (
  t,
  { mobileView, isGenerateView, isEdit, proposal, onGenerateAndSend, onPreviewPDF }
) =>
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
        <BookingFormActions>
          <BookingFormAction type="submit">{t('buttons.generateAndSend')}</BookingFormAction>
          <BookingFormAction type="button" onClick={onPreviewPDF} data-secondary>
            {t('buttons.previewPDF')}
          </BookingFormAction>
        </BookingFormActions>
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

const renderPDFModal = (t, { id, showPDF, setShowPDF }) =>
  showPDF && (
    <Modal open={showPDF} onClose={() => setShowPDF(false)}>
      <PDFFrame>
        <iframe src={`${API_BASE_URL}/proposals/${id}/pdf`} />
      </PDFFrame>
    </Modal>
  );

export const ProposalContainer = ({
  bookings,
  amendBooking,
  fetchProposal,
  id,
  isEdit,
  proposal,
  removeBooking,
  status,
  updateProposal,
  completeProposalBooking,
}) => {
  const { t } = useTranslation();

  const loaded = useFetchData(status, fetchProposal, [id], undefined, reloadIfMissing(proposal));
  const currentWidth = useCurrentWidth();
  const [submitted, setSubmitted] = useState(false);
  const [complete, setComplete] = useState(false);
  const [view, setView] = useState(ViewTypes.RESORTS);
  const [canEdit, setCanEdit] = useState({});
  const [showPDF, setShowPDF] = useState(false);
  const [attachedUploads, setAttachedUploads] = useState(propOr([], 'attachedUploads', proposal));

  useEffectBoundary(() => {
    submitted && (isSuccess(status) ? setComplete(true) : setSubmitted(false));
  }, [status]);

  const proposalLocked = isEdit && propOr(false, 'isLocked', proposal);

  if (proposalLocked || (isEdit && complete)) return <Redirect to={`/proposals/${id}`} />;

  const mobileView = isMobile(currentWidth);
  const isResortsView = equals(ViewTypes.RESORTS, view);
  const isGenerateView = equals(ViewTypes.GENERATE, view);
  const loading = !loaded || isActive(status);

  const onMobileNavClick = () => setView(ViewTypes.RESORTS);

  const onViewChange = () => setView(ViewTypes.GENERATE);

  const onBookingRemove = bookingId => removeBooking(id, bookingId);

  const onGuardEditComplete = (bookingId, { hotelUuid }) => {
    setCanEdit({ ...canEdit, [hotelUuid || bookingId]: true });
    amendBooking(id, bookingId);
  };

  const onAmend = (bookingId, values) => {
    completeProposalBooking(id, bookingId, values);
  };

  const onAdditionalResourceClick = e => {
    const value = path(['target', 'value'], e);

    value &&
      setAttachedUploads(
        includes(value, attachedUploads) ? without(value, attachedUploads) : append(value, attachedUploads)
      );
  };

  const onPreviewPDF = () => setShowPDF(true);

  const onGenerateAndSend = values => {
    updateProposal(id, { isLocked: true, attachedUploads, ...values });
    setSubmitted(true);
  };

  const summaryProps = {
    attachedUploads,
    bookings,
    canEdit,
    isEdit,
    isResortsView,
    mobileView,
    onAdditionalResourceClick,
    onAmend,
    onBookingRemove,
    onGuardEditComplete,
    onViewChange,
  };
  const guestFormProps = { mobileView, isGenerateView, isEdit, proposal, onGenerateAndSend, onPreviewPDF };
  const guestInfoProps = { mobileView, isGenerateView, isEdit, proposal };

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
        {renderProposalSummary(t, summaryProps)}
        {isEdit ? renderProposalGuestForm(t, guestFormProps) : renderProposalGuestInfo(t, guestInfoProps)}
      </Proposal>
    </Fragment>
  );
  const renderTabs = () => (
    <Fragment>
      <ProposalId>{t('labels.proposalWithId', { id })}</ProposalId>
      <Tabs labels={[t('labels.resortsDetails'), t('labels.guestsDetails')]}>
        {renderProposalSummary(t, summaryProps)}
        {renderProposalGuestInfo(t, guestInfoProps)}
      </Tabs>
    </Fragment>
  );

  return (
    <Loader isLoading={loading} text={t('messages.gettingProposal')}>
      <StyledProposalContainer>{!mobileView || isEdit ? renderFull() : renderTabs()}</StyledProposalContainer>
      {renderPDFModal(t, { id, showPDF, setShowPDF })}
    </Loader>
  );
};

ProposalContainer.propTypes = propTypes;
ProposalContainer.defaultProps = defaultProps;

export default compose(connect)(ProposalContainer);
