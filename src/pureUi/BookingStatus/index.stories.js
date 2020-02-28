import React, { Fragment } from 'react';

import BookingStatus from './';

export default {
  title: 'PureUi/BookingStatus',
  component: BookingStatus,
};

export const AllPossibleStatuses = () => (
  <Fragment>
    <BookingStatus status="potential" />
    <BookingStatus status="requested" />
    <BookingStatus status="confirmed" />
    <BookingStatus status="cancelled" />
  </Fragment>
);
