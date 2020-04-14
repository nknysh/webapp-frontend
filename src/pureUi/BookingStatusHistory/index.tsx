import React  from 'react';
import styled from 'styled-components';
import BookingStatus from '../BookingStatus';
import { formatDateTimeDisplay }  from 'utils/date';
import { colors } from '../pureUiTheme';

export interface BookingStatusHistoryItem {
  status: string;
  timestamp: string;
}

export interface BookingStatusHistoryProps {
  className?: string;
  data: BookingStatusHistoryItem[]
}

const Wrapper = styled.div``;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const DateLabel = styled.div`
  color: ${colors.grayDarker};
  font-size: 14px;
  padding-left: 14px;
`;


const BookingStatusHistory = (props: BookingStatusHistoryProps) => {
  const { className, data } = props;
  
  return (
    <Wrapper className={className}>
      {data.map(({ status, timestamp }) => (
        
        <Item key={`${status}-${timestamp}`}>
          <BookingStatus status={status}/>
          <DateLabel>{formatDateTimeDisplay(timestamp)}</DateLabel>
        </Item>

      ))}
    </Wrapper>
  );
}


export default BookingStatusHistory;