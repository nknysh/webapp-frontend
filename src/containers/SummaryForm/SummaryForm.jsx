import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import {
  all,
  always,
  assocPath,
  equals,
  mapObjIndexed,
  path,
  pipe,
  prop,
  propOr,
  values,
  when,
  pathOr,
  compose,
} from 'ramda';

import SummaryRoomEdit from 'containers/SummaryRoomEdit';
import SummaryRoom from 'containers/SummaryRoom';
import SummaryFormExtras from 'containers/SummaryFormExtras';

import SummaryFormMargin from 'components/app/SummaryFormMargin';

import { Form, Input, Loader } from 'components/elements';
import { getFormPath } from 'utils';

import { isActive } from 'store/common';

import uiConfig from 'config/ui';

import connect from './SummaryForm.state';
import { propTypes, defaultProps } from './SummaryForm.props';
import {
  HotelName,
  Rooms,
  Saving,
  Section,
  StyledModal,
  StyledSummary,
  SummaryFormActions,
  SummaryFormButton,
  Text,
  Title,
  Total,
} from './SummaryForm.styles';

const modalProps = { className: 'room-summary-form' };

const renderHotelName = name => name && <HotelName>{name}</HotelName>;

export const SummaryForm = ({
  booking,
  canBook,
  checkBooking,
  children,
  className,
  getRatesForDates,
  hotel,
  removeRoom,
  saving,
  status,
  summaryOnly,
  total,
  updateBooking,
  updateBookingExtras,
}) => {
  const { Accommodation, margin } = booking;
  const { name, uuid: hotelUuid } = hotel;

  const [modalData, setModalData] = useState({});
  const [redirectToBooking, setRedirectToBooking] = useState(false);

  if (redirectToBooking) return <Redirect to={`/hotels/${hotelUuid}/booking`} />;

  const isLoading = isActive(status);

  const marginType = propOr('percentage', 'type', margin);
  const marginValue = propOr(0, 'value', margin);

  const onModalClose = () => setModalData({});

  const onBookingChange = (id, values) => updateBooking(prop('uuid', hotel), id, values);
  const onBookingExtrasChange = (id, values) => updateBookingExtras(prop('uuid', hotel), id, values);

  // eslint-disable-next-line react/prop-types
  const renderRoom = ({ guests }, id) => (
    <SummaryRoom
      {...prop(id, Accommodation)}
      canEdit={!summaryOnly}
      id={id}
      key={id}
      onChange={updateBooking}
      onEdit={setModalData}
      onRemove={removeRoom}
      guests={guests}
      hotelUuid={hotelUuid}
    />
  );

  const renderRooms = pipe(
    mapObjIndexed(renderRoom),
    values,
    when(all(equals(false)), always(null))
  );

  const renderModal = () => {
    const { id } = modalData;

    const bookingRoom = path(['Accommodation', id], booking);

    if (!bookingRoom) return null;

    return (
      <StyledModal open={true} onClose={onModalClose} modalContentProps={modalProps}>
        <SummaryRoomEdit
          hotelUuid={hotelUuid}
          id={id}
          onComplete={setModalData}
          onDatesShow={getRatesForDates}
          onEdit={setModalData}
          onChange={checkBooking}
          status={status}
          {...bookingRoom}
        />
      </StyledModal>
    );
  };

  const renderTotal = () => (
    <Section>
      <Total>{total}</Total>
      <Text>{path(['labels', 'includesTaxes'], uiConfig)}</Text>
      {saving && (
        <Text>
          {path(['labels', 'savingOfPrefix'], uiConfig)}
          <Saving>{saving}</Saving>
          {path(['labels', 'savingOfSuffix'], uiConfig)}
        </Text>
      )}
      {summaryOnly && <SummaryFormMargin type={marginType} value={marginValue} total={total} summaryOnly={true} />}
    </Section>
  );

  const onExtrasChange = ({ handleChange, values }) => (e, value) => {
    const prevValue = path(getFormPath(e.target.name), values);
    handleChange(e, value);
    onBookingExtrasChange(prevValue, value);
  };

  const onValuesChange = ({ handleChange }) => (e, value) => {
    handleChange(e, value);
    onBookingChange(assocPath(getFormPath(e.target.name), e.target.value, {}));
  };

  const initialValues = {
    addons: [...pathOr([], ['products', 'Fine'], booking), ...pathOr([], ['products', 'Supplement'], booking)],
    transfer: pathOr('', ['products', 'Transfer'], booking),
    groundService: pathOr('', ['products', 'Ground Service'], booking),
  };

  const onSubmit = () => setRedirectToBooking(true);

  const renderForm = () => {
    return (
      <Form initialValues={initialValues} onSubmit={onSubmit} enableReinitialize={true}>
        {({ values, ...formProps }) => (
          <Fragment>
            <Input type="hidden" value={canBook} name="valid" />
            <SummaryFormExtras
              hotelUuid={hotelUuid}
              onChange={onValuesChange({ values, ...formProps })}
              onExtraChange={onExtrasChange({ values, ...formProps })}
              summaryOnly={summaryOnly}
              values={values}
            />
            {!summaryOnly && (
              <SummaryFormActions>
                <SummaryFormButton disabled={!canBook} type="submit">
                  {path(['buttons', 'bookNow'], uiConfig)}
                </SummaryFormButton>
              </SummaryFormActions>
            )}
          </Fragment>
        )}
      </Form>
    );
  };

  return (
    <StyledSummary className={className}>
      <Loader isLoading={isLoading} showPrev={true} text="Updating...">
        <Title>{path(['labels', 'totalNet'], uiConfig)}</Title>
        {renderTotal()}
        {renderHotelName(name)}
        <Rooms data-summary={summaryOnly}>{renderRooms(Accommodation)}</Rooms>
        {renderForm()}
        {children}
      </Loader>
      {!summaryOnly && renderModal()}
    </StyledSummary>
  );
};

SummaryForm.propTypes = propTypes;
SummaryForm.defaultProps = defaultProps;

export default compose(connect)(SummaryForm);
