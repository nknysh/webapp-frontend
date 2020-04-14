import React from 'react';
import BookingStatusHistory, { BookingStatusHistoryProps } from './';
import styled from 'styled-components';

const createProps = (overwrites: Partial<BookingStatusHistoryProps> = {}) => {
  return {
    data: [
      { status: 'requested' , timestamp: '2020-04-10T03:00:37Z' },
      { status: 'confirmed' , timestamp: '2020-04-10T05:43:37Z' },
      { status: 'potential' , timestamp: '2020-04-11T13:00:37Z' },
      { status: 'cancelled'  , timestamp: '2020-04-14T05:00:37Z' },
    ],
    ...overwrites
  };
};

const StyledBookingStatusHistory = styled(BookingStatusHistory)`
  max-width: 280px;
`;

export const BasicUsage = () => {
  const props = createProps();

  return (
    <StyledBookingStatusHistory {...props}/>
  );
};
