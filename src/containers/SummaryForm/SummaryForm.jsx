import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import {
  all,
  always,
  assocPath,
  compose,
  equals,
  mapObjIndexed,
  path,
  pathOr,
  pipe,
  prop,
  propOr,
  values,
  when,
} from 'ramda';

import SummaryRoomEdit from 'containers/SummaryRoomEdit';
import SummaryRoom from 'containers/SummaryRoom';
import SummaryFormExtras from 'containers/SummaryFormExtras';

import SummaryFormMargin from 'components/app/SummaryFormMargin';

import { Form, Input, Loader } from 'components/elements';
import { getFormPath, mapWithIndex, isEmptyOrNil } from 'utils';

import { isActive } from 'store/common';

import { ProductTypes } from 'config/enums';
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
  Errors,
  Error,
} from './SummaryForm.styles';

const modalProps = { className: 'room-summary-form' };

const renderHotelName = name => name && <HotelName>{name}</HotelName>;

const renderError = ({ message }, i) => <Error key={i}>{message}</Error>;
const renderSummaryErrors = errors => !isEmptyOrNil(errors) && <Errors>{mapWithIndex(renderError, errors)}</Errors>;

export const SummaryForm = ({
  booking,
  canBook,
  children,
  className,
  getRatesForDates,
  hotel,
  removeRoom,
  saving,
  status,
  summaryOnly,
  totals: { oneOrMoreItemsOnRequest },
  total,
  updateBooking,
  updateBookingExtras,
  errors,
}) => {
  const { products, margin } = booking;
  const { name, uuid: hotelUuid } = hotel;
  const Accommodation = propOr({}, ProductTypes.ACCOMMODATION, products);

  const [modalData, setModalData] = useState({});
  const [redirectToBooking, setRedirectToBooking] = useState(false);

  if (redirectToBooking) return <Redirect to={`/hotels/${hotelUuid}/booking`} />;

  const isLoading = isActive(status);

  const marginType = propOr('percentage', 'type', margin);
  const marginValue = propOr(0, 'value', margin);

  const onModalClose = () => setModalData({});

  const onBookingChange = (id, values) => updateBooking(prop('uuid', hotel), id, values);
  const onBookingExtrasChange = (id, values) => updateBookingExtras(prop('uuid', hotel), id, values);

  const onExtrasChange = ({ handleChange }) => (e, value) => {
    handleChange(e, value);
    onBookingExtrasChange({ [path(['target', 'name'], e)]: path(['target', 'checked'], e) });
  };

  const onValuesChange = ({ handleChange }) => (e, value, isProduct) => {
    handleChange(e, value);

    const changedValues = assocPath(
      getFormPath(e.target.name),
      equals('checkbox', e.target.type) ? e.target.checked : e.target.value,
      {}
    );

    onBookingChange(isProduct ? { products: changedValues } : changedValues);
  };

  const initialValues = {
    margin,
    [ProductTypes.TRANSFER]: pathOr('', ['products', ProductTypes.TRANSFER], booking),
    [ProductTypes.GROUND_SERVICE]: pathOr('', ['products', ProductTypes.GROUND_SERVICE], booking),
    ...pathOr({}, ['products', ProductTypes.FINE], booking),
    ...pathOr({}, ['products', ProductTypes.SUPPLEMENT], booking),
  };

  const onSubmit = () => setRedirectToBooking(true);

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

    const bookingRoom = path(['products', ProductTypes.ACCOMMODATION, id], booking);

    if (!bookingRoom) return null;

    return (
      <StyledModal open={true} onClose={onModalClose} modalContentProps={modalProps}>
        <SummaryRoomEdit
          hotelUuid={hotelUuid}
          id={id}
          onComplete={setModalData}
          onDatesShow={getRatesForDates}
          onEdit={setModalData}
          status={status}
          {...bookingRoom}
        />
      </StyledModal>
    );
  };

  const renderTotal = () => (
    <Section>
      <Total>{oneOrMoreItemsOnRequest ? path(['labels', 'onRequest'], uiConfig) : total}</Total>
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

  const renderForm = () => {
    return (
      <Form initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, ...formProps }) => (
          <Fragment>
            <Input type="hidden" value={canBook} name="valid" />
            <SummaryFormExtras
              hotelUuid={hotelUuid}
              onChange={onValuesChange(formProps)}
              onExtraChange={onExtrasChange(formProps)}
              summaryOnly={summaryOnly}
              values={values}
            />
            {renderSummaryErrors(errors)}
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
