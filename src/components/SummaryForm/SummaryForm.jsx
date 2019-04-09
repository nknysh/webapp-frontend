import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {
  all,
  always,
  equals,
  gt,
  lensPath,
  mapObjIndexed,
  path,
  pipe,
  prop,
  sum,
  values,
  when,
  propOr,
  compose,
} from 'ramda';
import hash from 'object-hash';
import { isThisMonth } from 'date-fns';

import DropDownMenu from 'components/DropDownMenu';
import LodgingSelect from 'components/LodgingSelect';
import Input from 'components/Input';
import Select from 'components/Select';
import {
  formatDate,
  getEndOfMonth,
  getFromDateFormat,
  getNumberOfDays,
  getStartOfMonth,
  getToDateFormat,
  toDate,
  formatPrice,
  calculatePercentage,
} from 'utils';

import uiConfig, { getPluralisation } from 'config/ui';

import { propTypes, defaultProps } from './SummaryForm.props';
import {
  DatePrice,
  EditForm,
  EditFormSection,
  EditFormTitle,
  HotelName,
  Room,
  RoomColumn,
  RoomDetail,
  RoomMenu,
  RoomName,
  RoomPrice,
  RoomRow,
  Rooms,
  Saving,
  Section,
  StyledDatePicker,
  StyledModal,
  StyledSummary,
  SummaryFormActions,
  SummaryFormButton,
  Text,
  Title,
  Total,
  Margin,
  MarginCheckbox,
  MarginInputs,
  MarginTotal,
  MarginTotalAmount,
  MarginPercentSuffix,
} from './SummaryForm.styles';
import { getGuestsFromBooking, getOptionsFromRates, guestLine, additionalGuestLine } from './SummaryForm.utils';

const renderTotal = (total, saving) => (
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
  </Section>
);

const renderHotelName = name => name && <HotelName>{name}</HotelName>;

export const SummaryForm = ({
  hotel,
  total,
  saving,
  className,
  booking,
  getHotelRoom,
  getRoomDates,
  getRoomTotal,
  getRatesForDates,
  onBookingChange,
  canBook,
  history,
}) => {
  const { accommodationProducts, margin } = booking;
  const { name, uuid: hotelUuid } = hotel;

  const [modalData, setModalData] = useState({});
  const [hasMargin, setHasMargin] = useState(true);

  const onModalClose = () => setModalData({});
  const onBook = () => history.push(`/hotels/${hotelUuid}/booking`);

  const renderRoom = ({ quantity, ...roomBooking }, id) => {
    const roomDetails = getHotelRoom(id);
    const roomDates = getRoomDates(id);
    const roomDatesCount = getNumberOfDays(roomDates);
    const { adults, teens, children, infants } = getGuestsFromBooking(roomBooking);

    const totalGuests = sum([adults, teens, children, infants]);

    const bookingRoomQuantityLens = lensPath(['accommodationProducts', id, 'quantity']);

    const onRemoveRoom = () => onBookingChange(bookingRoomQuantityLens, 0);
    const onEditRoom = () => setModalData({ id, quantity, adults, children, teens, infants });

    return (
      roomDetails &&
      roomDates &&
      gt(quantity, 0) && (
        <Room key={hash(roomDetails)}>
          <RoomRow>
            <RoomColumn>
              <RoomName>
                {prop('name', roomDetails)} ({quantity})
              </RoomName>
              <RoomDetail>
                {roomDatesCount} {getPluralisation('night', roomDatesCount)} | {getFromDateFormat(roomDates)}{' '}
                {getToDateFormat(roomDates)}
              </RoomDetail>
            </RoomColumn>
            <RoomColumn data-shrink={true}>
              <RoomPrice>{getRoomTotal(id)}</RoomPrice>
            </RoomColumn>
            <RoomColumn data-shrink={true}>
              <DropDownMenu showArrow={false} title={<RoomMenu>more_vert</RoomMenu>}>
                <span onClick={onEditRoom}>{path(['buttons', 'edit'], uiConfig)}</span>
                <span onClick={onRemoveRoom}>{path(['buttons', 'remove'], uiConfig)}</span>
              </DropDownMenu>
            </RoomColumn>
          </RoomRow>
          <RoomRow>
            {guestLine('guest', totalGuests)} ({guestLine('adult', adults)}
            {additionalGuestLine('teen', teens)}
            {additionalGuestLine('children', children)}
            {additionalGuestLine('infant', infants)})
          </RoomRow>
        </Room>
      )
    );
  };

  const renderRooms = pipe(
    mapObjIndexed(renderRoom),
    values,
    when(all(equals(false)), always(null))
  );

  const marginType = propOr('percentage', 'type', margin);
  const marginValue = propOr(0, 'value', margin);
  const typeIsPercent = equals('percentage', marginType);

  const onMarginChecked = (e, checked) => {
    onBookingChange({ margin: { applied: checked } });
    setHasMargin(checked);
  };

  const onMarginTypeChange = e => {
    const type = path(['target', 'value'], e);
    onBookingChange({ margin: { type } });
  };

  const onMarginValueChange = e => {
    const value = Number(path(['target', 'value'], e));
    onBookingChange({ margin: { type: marginType, value } });
  };

  const renderMarginField = () => (
    <Margin>
      <MarginCheckbox
        onChange={onMarginChecked}
        checked={hasMargin}
        label={path(['labels', 'applyMargin'], uiConfig)}
      />
      {hasMargin && (
        <Fragment>
          <MarginInputs>
            <Select
              onChange={onMarginTypeChange}
              disabled={!hasMargin}
              value={marginType}
              options={prop('marginOptions', uiConfig)}
            />
            <Input type="number" value={marginValue} onChange={onMarginValueChange} disabled={!hasMargin} />
          </MarginInputs>
          <MarginTotal>
            {path(['labels', 'currentMargin'], uiConfig)}{' '}
            <MarginTotalAmount>
              {formatPrice(typeIsPercent ? calculatePercentage(total, marginValue) : marginValue)}
            </MarginTotalAmount>
            {typeIsPercent && (
              <Fragment>
                {', '}
                <MarginPercentSuffix>{marginValue}</MarginPercentSuffix>{' '}
                {path(['labels', 'currentMarginPercentageSuffix'], uiConfig)}
              </Fragment>
            )}
          </MarginTotal>
        </Fragment>
      )}
    </Margin>
  );

  const renderModal = () => {
    const { id, quantity, adults, children, teens, infants } = modalData;

    if (!id) return null;

    const { name, rates } = getHotelRoom(id);
    const { firstDate, lastDate, disabled } = getOptionsFromRates(rates);
    const roomDates = getRoomDates(id);

    const onDateSelected = range => onBookingChange({ accommodationProducts: { [id]: { dates: range } } });
    const onLodgingSelect = selected => {
      onBookingChange({ accommodationProducts: { [id]: { ...selected } } });
      setModalData({ id, ...selected });
    };

    const renderDay = day => {
      const rate = prop(formatDate(day), rates);

      return (
        <span>
          <div>{formatDate(day, 'D')}</div>
          {rate && <DatePrice>{prop('rate', rate)}</DatePrice>}
        </span>
      );
    };

    const onMonthChange = month => {
      getRatesForDates(
        hotelUuid,
        id,
        isThisMonth(month) ? formatDate(toDate()) : getStartOfMonth(month),
        getEndOfMonth(month)
      );
      return month;
    };

    const onDayPickerShow = () => getRatesForDates(hotelUuid, id, firstDate, getEndOfMonth(lastDate));

    return (
      <StyledModal open={true} onClose={onModalClose} modalContentProps={{ className: 'room-summary-form' }}>
        <EditForm>
          <EditFormTitle>{name}</EditFormTitle>
          <EditFormSection>
            <LodgingSelect
              onSelected={onLodgingSelect}
              contentOnly={true}
              selectedValues={{ quantity, adults, children, teens, infants }}
            />
          </EditFormSection>
          <EditFormSection>
            <StyledDatePicker
              dayPickerProps={{
                disabledDays: [
                  ...disabled,
                  {
                    before: new Date(firstDate),
                    after: new Date(lastDate),
                  },
                ],
                renderDay,
                onMonthChange,
              }}
              onDayPickerShow={onDayPickerShow}
              selectedValues={roomDates}
              onSelected={onDateSelected}
            />
          </EditFormSection>
        </EditForm>
      </StyledModal>
    );
  };

  return (
    <StyledSummary className={className}>
      <Title>{path(['labels', 'totalNet'], uiConfig)}</Title>
      {renderTotal(total, saving)}
      {renderHotelName(name)}
      <Rooms>{renderRooms(accommodationProducts)}</Rooms>
      {renderMarginField()}
      <SummaryFormActions>
        <SummaryFormButton onMouseUp={onBook} disabled={!canBook}>
          {path(['buttons', 'bookNow'], uiConfig)}
        </SummaryFormButton>
      </SummaryFormActions>
      {renderModal()}
    </StyledSummary>
  );
};

SummaryForm.propTypes = propTypes;
SummaryForm.defaultProps = defaultProps;

export default compose(withRouter)(SummaryForm);
