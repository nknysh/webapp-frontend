import React, { useState, Fragment, useCallback } from 'react';
import WithBookings from 'hoc/WithBookings';

import {
  append,
  compose,
  equals,
  includes,
  isEmpty,
  join,
  path,
  pickAll,
  pipe,
  prop,
  propOr,
  props,
  without,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loader, Tabs, Section, Modal } from '@pure-escapes/webapp-ui-components';

import { ADMIN_BASE_URL } from 'config';
import { BookingForm } from 'components';
import { useFetchData, useCurrentWidth, useEffectBoundary } from 'effects';
import { formatDate } from 'utils';
import { fields, data } from 'config/forms/bookingForm';

import { isLoading, isSuccess, isSending } from 'store/common';

import BookingSummaryLite from 'pureUi/BookingSummaryLite';

import connect from './ProposalContainer.state';
import { propTypes, defaultProps } from './ProposalContainer.props';
import {
  Back,
  BookingFormAction,
  BookingFormActions,
  BookingPath,
  BookingPathSegment,
  Chevron,
  GuestName,
  PDFFrame,
  Proposal,
  ProposalGuestForm,
  ProposalGuestInfo,
  ProposalId,
  StatusStrip,
  StatusStripDate,
  StyledBreadcrumbs,
  StyledProposalContainer,
  ProposalGuestFormNotes,
  ProposalsWrapper,
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
const renderBackToSearch = t => renderBackButton(t('labels.backToSearch'), { to: '/search/beta' });

const renderBreadcrumbs = (t, { proposal, id, isMobile, onMobileNavClick, isGenerateView, isResortsView, isEdit }) => {
  const links = isEdit
    ? [
        { label: renderBackToSearch(t) },
        { label: prop('name', proposal), to: `/proposals/${id}` },
        { label: t('labels.enterGuestDetails'), to: `/proposals/${id}/edit` },
      ]
    : [{ label: renderBackToProposals(t) }, { label: t('labels.proposalWithId', { id }), to: `/proposals/${id}` }];
  return (
    <Fragment>
      {isMobile && (isEdit ? renderBackToSearch(t) : renderBackToProposals(t))}
      {isMobile ? (
        <BookingPath>
          <BookingPathSegment onClick={onMobileNavClick} data-active={isResortsView}>
            {t('labels.resortsIncluded')}
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

const renderBooking = booking => {
  return <BookingSummaryLite key={booking.bookingHash} booking={booking} />;
};

const renderBookings = bookings => {
  return <ProposalsWrapper>{Object.keys(bookings).map(key => renderBooking(bookings[key]))}</ProposalsWrapper>;
};

const renderProposalGuestForm = (
  t,
  { isMobile, isGenerateView, proposal, onGenerateAndSend, onPreviewPDF, onPreviewLatestPdf, pdfCount }
) => {
  if (!(!isMobile || isGenerateView)) {
    return;
  }

  return (
    <ProposalGuestForm>
      <BookingForm
        onSubmit={onGenerateAndSend}
        initialValues={pickAll(['guestTitle', 'guestFirstName', 'guestLastName', 'comments'], proposal)}
        fields={simpleForm(fields)}
        data={withoutSections(data)}
      >
        {({ values }) => {
          return (
            <>
              <BookingFormActions>
                <BookingFormAction type="submit">{t('buttons.generateAndSend')}</BookingFormAction>
                <BookingFormAction type="button" onClick={() => onPreviewPDF(values)} data-secondary>
                  {t('buttons.previewPDF')}
                </BookingFormAction>
                {pdfCount > 0 && (
                  <BookingFormAction type="button" onClick={onPreviewLatestPdf} data-secondary>
                    See last sent PDF
                  </BookingFormAction>
                )}
              </BookingFormActions>
            </>
          );
        }}
      </BookingForm>
      <ProposalGuestFormNotes>
        {t('labels.proposalFormNotes.pleaseNote')}
        <ol>
          <li>{t('labels.proposalFormNotes.point1')}</li>
          <li>{t('labels.proposalFormNotes.point2')}</li>
          <li>{t('labels.proposalFormNotes.point3')}</li>
        </ol>
      </ProposalGuestFormNotes>
    </ProposalGuestForm>
  );
};

const renderStatusStrip = (t, { createdAt, isEdit }) =>
  !isEdit && (
    <StatusStrip>
      {t('labels.createdAt')} <StatusStripDate>{formatDate(createdAt, 'MMM d, yyyy')}</StatusStripDate>
    </StatusStrip>
  );

const renderProposalGuestInfo = (t, { isEdit, isMobile, proposal, pdfCount, onPreviewLatestPdf }) =>
  !isEdit && (
    <Fragment>
      {isMobile && renderStatusStrip(t, { isEdit, ...proposal })}
      <ProposalGuestInfo>
        <Section label={t('labels.leadGuestInfo')}>
          <GuestName>{join(' ', props(['guestTitle', 'guestFirstName', 'guestLastName'], proposal))}</GuestName>
        </Section>

        {!isNilOrEmpty(prop('comments', proposal)) && (
          <Section label={t('comment_plural')}>{prop('comments', proposal)}</Section>
        )}

        {pdfCount > 0 && (
          <Section label="Uploads">
            <BookingFormAction type="button" onClick={onPreviewLatestPdf} data-secondary>
              See last sent PDF
            </BookingFormAction>
          </Section>
        )}
      </ProposalGuestInfo>
    </Fragment>
  );

const renderPDFModal = (t, { id, showPDF, setShowPDF, proposalPdf }) => {
  return (
    showPDF && (
      <Modal open={showPDF} onClose={() => setShowPDF(false)}>
        <PDFFrame>
          <iframe src={proposalPdf} />
        </PDFFrame>
      </Modal>
    )
  );
};

const renderLatestPDFModal = (proposalId, pdfUrl, setState) => {
  return (
    <Modal open={true} onClose={() => setState(false)}>
      <PDFFrame>
        <iframe src={pdfUrl} />
      </PDFFrame>
    </Modal>
  );
};

const renderFull = (
  t,
  {
    id,
    isEdit,
    isGenerateView,
    isResortsView,
    isMobile,
    onMobileNavClick,
    proposal,
    guestFormProps,
    guestInfoProps,
    storeBookings,
  }
) => {
  return (
    <Fragment>
      {renderBreadcrumbs(t, {
        id,
        isEdit,
        isGenerateView,
        isResortsView,
        isMobile,
        onMobileNavClick,
        proposal,
      })}
      {renderStatusStrip(t, { isEdit, ...proposal })}
      <Proposal>
        {storeBookings && renderBookings(storeBookings)}
        {isEdit || proposal.containsPotentialBookings
          ? renderProposalGuestForm(t, guestFormProps)
          : renderProposalGuestInfo(t, guestInfoProps)}
      </Proposal>
    </Fragment>
  );
};

const renderTabs = (t, { id, guestInfoProps }) => (
  <Fragment>
    <ProposalId>{t('labels.proposalWithId', { id })}</ProposalId>
    <Tabs labels={[t('labels.resortsIncluded'), t('labels.guestsDetails')]}>
      {/* {renderProposalSummary(t, summaryProps)} */}
      {renderProposalGuestInfo(t, guestInfoProps)}
    </Tabs>
  </Fragment>
);

export const ProposalContainer = ({
  amendBooking,
  bookings,
  storeBookings,
  completeProposalBooking,
  fetchProposal,
  id,
  isEdit,
  proposal,
  proposalBookingHold,
  proposalBookingRelease,
  proposalBookingRequest,
  removeBooking,
  status,
  completeProposal,
  generateProposalPdf,
  proposalPdf,
}) => {
  const { t } = useTranslation();

  const loaded = useFetchData(status, fetchProposal, [id], undefined, reloadIfMissing(proposal));
  const { isMobile } = useCurrentWidth();
  const [submitted, setSubmitted] = useState(false);
  const [booked, setBooked] = useState(false);
  const [complete, setComplete] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [view, setView] = useState(ViewTypes.RESORTS);
  const [canEdit, setCanEdit] = useState({});
  const [showPDF, setShowPDF] = useState(false);
  const [showLatestPDF, setShowLatestPDF] = useState(false);
  const [attachedUploads, setAttachedUploads] = useState(propOr([], 'attachedUploads', proposal));

  useEffectBoundary(() => {
    submitted && (isSuccess(status) ? setComplete(true) : setSubmitted(false));
  }, [status]);

  useEffectBoundary(() => {
    booked && isSuccess(status) && setBookingComplete(true);
  }, [status]);

  const onMobileNavClick = useCallback(() => setView(ViewTypes.RESORTS), []);

  const onViewChange = useCallback(() => setView(ViewTypes.GENERATE), []);

  const onBookingRemove = useCallback(bookingId => removeBooking(id, bookingId), [id, removeBooking]);

  const onGuardEditComplete = useCallback(
    (bookingId, { hotelUuid }) => {
      setCanEdit({ ...canEdit, [hotelUuid || bookingId]: true });
      amendBooking(id, bookingId);
    },
    [amendBooking, canEdit, id]
  );

  const onAmend = useCallback(
    (bookingId, values) => {
      setCanEdit({ ...canEdit, [bookingId]: false });
      completeProposalBooking(id, bookingId, values);
    },
    [canEdit, completeProposalBooking, id]
  );

  const onBook = useCallback(
    bookingId => {
      setBooked(bookingId);
      proposalBookingRequest(id, bookingId);
    },
    [id, proposalBookingRequest]
  );

  const onAddHolds = useCallback(
    bookingId => {
      proposalBookingHold(id, bookingId);
    },
    [id, proposalBookingHold]
  );

  const onReleaseHolds = useCallback(
    bookingId => {
      proposalBookingRelease(id, bookingId);
    },
    [id, proposalBookingRelease]
  );

  const onAdditionalResourceClick = useCallback(
    e => {
      const value = path(['target', 'value'], e);

      value &&
        setAttachedUploads(
          includes(value, attachedUploads) ? without(value, attachedUploads) : append(value, attachedUploads)
        );
    },
    [attachedUploads]
  );

  const onPreviewPDF = useCallback(values => {
    generateProposalPdf(id, values);
    setShowPDF(true);
  }, []);

  const onPreviewLatestPdf = useCallback(() => {
    setShowLatestPDF(true);
  }, []);

  const onGenerateAndSend = useCallback(
    values => {
      completeProposal(id, { attachedUploads, ...values });
      setSubmitted(true);
    },
    [attachedUploads, id, completeProposal]
  );

  const sortByCreatedDate = useCallback((a, b) => a.createdAt > b.createdAt, []);

  const isLocked = propOr(false, 'isLocked', proposal);
  const proposalLocked = isEdit && isLocked;

  if (!isLocked && !isEdit) return <Redirect to={`/proposals/${id}/edit`} />;
  if (proposalLocked || (isEdit && complete)) return <Redirect to={`/proposals/${id}`} />;
  if (booked && bookingComplete) return <Redirect to={`/bookings/${booked}/complete`} />;

  const isResortsView = equals(ViewTypes.RESORTS, view);
  const isGenerateView = equals(ViewTypes.GENERATE, view);
  const loading = !loaded || isLoading(status);
  const sending = isSending(status);

  const pdfs = proposal.uploads ? proposal.uploads.filter(upload => upload.filename.includes('.pdf')) : [];
  const latestPdfUrl = pdfs.length ? pdfs.sort(sortByCreatedDate)[0].url : null;

  const summaryProps = {
    attachedUploads,
    bookings,
    canEdit,
    isEdit,
    isResortsView,
    isMobile,
    onAdditionalResourceClick,
    onAmend,
    onBookingRemove,
    onGuardEditComplete,
    onViewChange,
    onBook,
    onAddHolds,
    onReleaseHolds,
  };
  const guestFormProps = {
    isMobile,
    isGenerateView,
    isEdit,
    proposal,
    onGenerateAndSend,
    onPreviewPDF,
    onPreviewLatestPdf,
    pdfCount: pdfs.length,
  };
  const guestInfoProps = { isMobile, isGenerateView, isEdit, proposal, onPreviewLatestPdf, pdfCount: pdfs.length };

  return (
    <Loader isLoading={sending || loading} text={sending ? t('messages.requesting') : t('messages.gettingProposal')}>
      <StyledProposalContainer>
        {!isMobile || isEdit
          ? renderFull(t, {
              id,
              isEdit,
              isGenerateView,
              isResortsView,
              isMobile,
              onMobileNavClick,
              proposal,
              summaryProps,
              guestFormProps,
              guestInfoProps,
              storeBookings,
            })
          : renderTabs(t, { id, summaryProps, guestInfoProps })}
      </StyledProposalContainer>
      {renderPDFModal(t, { id, showPDF, setShowPDF, proposalPdf })}
      {showLatestPDF && renderLatestPDFModal(proposal.id, latestPdfUrl, setShowLatestPDF)}
    </Loader>
  );
};

ProposalContainer.propTypes = propTypes;
ProposalContainer.defaultProps = defaultProps;

export default compose(
  connect,
  WithBookings
)(ProposalContainer);
