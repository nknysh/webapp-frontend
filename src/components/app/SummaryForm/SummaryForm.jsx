import React, { useState, Fragment } from 'react';
import {
  all,
  head,
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
} from 'ramda';

import { SummaryRoom, SummaryRoomEdit, SummaryFormExtras, SummaryFormMargin } from 'components/app';
import { Form, Input } from 'components/elements';
import { getFormPath } from 'utils';

import uiConfig from 'config/ui';

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

const renderHotelName = name => name && <HotelName>{name}</HotelName>;

export const SummaryForm = ({
  addonProducts,
  addonsTotals,
  booking,
  canBook,
  checkBooking,
  children,
  className,
  getAccommodationProductAgeRanges,
  getExtraSupplements,
  getHotelRoom,
  getRate,
  getRatesForDates,
  getRoomDates,
  getRoomMealPlan,
  getRoomMealPlans,
  getRoomTotal,
  getHotelsUpload,
  groundServiceProducts,
  groundServicesTotal,
  hotel,
  onBook,
  onBookingChange,
  onBookingExtrasChange,
  removeRoom,
  saving,
  summaryOnly,
  total,
  transferProducts,
  transfersTotal,
}) => {
  const { rooms, margin } = booking;
  const { name, uuid: hotelUuid } = hotel;

  const [modalData, setModalData] = useState({});

  const marginType = propOr('percentage', 'type', margin);
  const marginValue = propOr(0, 'value', margin);

  const onModalClose = () => setModalData({});

  const onEditChange = (values, close = true) => {
    onBookingChange(values);
    close && onModalClose();
  };

  // eslint-disable-next-line react/prop-types
  const renderRoom = ({ guests }, id) => {
    const details = getHotelRoom(id);
    const photo = getHotelsUpload(head(propOr('', 'uploads', details)));

    return (
      <SummaryRoom
        {...prop(id, rooms)}
        canEdit={!summaryOnly}
        dates={getRoomDates(id)}
        details={details}
        extraSupplements={getExtraSupplements(id)}
        id={id}
        key={id}
        mealPlan={getRoomMealPlan(id)}
        onChange={onBookingChange}
        onEdit={setModalData}
        onRemove={removeRoom}
        guests={guests}
        hotelUuid={hotelUuid}
        total={getRoomTotal(id)}
        photo={photo}
      />
    );
  };

  const renderRooms = pipe(
    mapObjIndexed(renderRoom),
    values,
    when(all(equals(false)), always(null))
  );

  const renderModal = () => {
    const { id } = modalData;

    const bookingRoom = path(['rooms', id], booking);

    if (!bookingRoom) return null;

    return (
      <StyledModal open={true} onClose={onModalClose} modalContentProps={{ className: 'room-summary-form' }}>
        <SummaryRoomEdit
          ageRanges={getAccommodationProductAgeRanges(id)}
          dates={getRoomDates(id)}
          details={getHotelRoom(id)}
          hotelUuid={hotelUuid}
          id={id}
          mealPlans={getRoomMealPlans(id)}
          onSubmit={onEditChange}
          onDatesShow={getRatesForDates}
          onEdit={setModalData}
          onChange={checkBooking}
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

  const renderForm = () => {
    return (
      <Form initialValues={initialValues} onSubmit={onBook}>
        {({ values, ...formProps }) => (
          <Fragment>
            <Input type="hidden" value={canBook} name="valid" />
            <SummaryFormExtras
              getRate={getRate}
              onChange={onValuesChange({ values, ...formProps })}
              onExtraChange={onExtrasChange({ values, ...formProps })}
              total={total}
              addons={addonProducts}
              transfers={transferProducts}
              groundServices={groundServiceProducts}
              summaryOnly={summaryOnly}
              totals={{ transfer: transfersTotal, groundService: groundServicesTotal, addon: addonsTotals }}
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
      <Title>{path(['labels', 'totalNet'], uiConfig)}</Title>
      {renderTotal()}
      {renderHotelName(name)}
      <Rooms data-summary={summaryOnly}>{renderRooms(rooms)}</Rooms>
      {renderForm()}
      {!summaryOnly && renderModal()}
      {children}
    </StyledSummary>
  );
};

SummaryForm.propTypes = propTypes;
SummaryForm.defaultProps = defaultProps;

export default SummaryForm;
