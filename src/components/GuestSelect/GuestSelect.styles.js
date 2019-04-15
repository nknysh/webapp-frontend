import styled from 'styled-components';

import Label from 'components/Label';
import NumberSelect from 'components/NumberSelect';
import Tabs from 'components/Tabs';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';

export const StyledGuestSelect = styled.div``;

export const GuestSelectLabel = styled(Label)``;

export const GuestSelectSection = styled.div`
  padding: ${theme.gutter}px;
  border-bottom: 1px solid ${theme.borderColor};
`;

export const GuestSelectEntry = styled.div`
  display: flex;
  align-items: center;
`;

export const GuestSelectEntryLabel = styled(Label)`
  flex: 1;

  > span {
    font-size: 13px !important;
  }
`;

export const GuestSelectNumberSelect = styled(NumberSelect)`
  flex: 1;
`;

export const RoomTabs = styled(Tabs)`
  ${breakpoints.tablet`
    margin-top: -1px
    border-top: 1px solid ${theme.borderColor};
    margin-left: -${theme.gutter * 10 - 1}px;
    margin-right: -${theme.gutter * 10 - 1}px;
  `}
`;
