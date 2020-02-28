import React, { Fragment } from 'react';

import BookingStatusComponent from './';

export default {
  title: 'BookingStatus',
  component: BookingStatusComponent,
};

export const AllPossibleStatuses = () => (
  <Fragment>
    <BookingStatusComponent status="potential" />
    <BookingStatusComponent status="requested" />
    <BookingStatusComponent status="confirmed" />
    <BookingStatusComponent status="cancelled" />
  </Fragment>
);
