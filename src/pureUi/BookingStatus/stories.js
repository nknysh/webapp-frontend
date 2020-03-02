import React, { Fragment } from 'react';
import styled from 'styled-components';

import BookingStatus from '.';

export const AllBookingStatuses = () => (
  <Fragment>
    <BookingStatus status="potential" />
    <BookingStatus status="requested" />
    <BookingStatus status="confirmed" />
    <BookingStatus status="cancelled" />
  </Fragment>
);

const StyledBookingStatus = styled(BookingStatus)`
  font-size: 24px;
`;

export const LargeBookingStatus = () => <StyledBookingStatus status="potential" />;
