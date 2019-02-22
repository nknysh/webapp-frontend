// Libraries
import React from 'react';
import { withRouter } from 'react-router-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

// Assets
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './BigCalendar.css';

BigCalendar.momentLocalizer(moment);

const formatEvents = bookings => {
  return bookings.map(booking => ({
    ...booking,
    title: 'Payment Due',
    startDate: moment(booking.paymentDueDate).toDate(),
    endDate: moment(booking.paymentDueDate).toDate(),
  }));
};

const LargeCalendar = ({ bookings, history }) => (
  <BigCalendar
    startAccessor="startDate"
    endAccessor="endDate"
    events={formatEvents(bookings)}
    onSelectEvent={booking => history.push(`/bookings/${booking.id}`)}
  />
);

export default withRouter(LargeCalendar);
