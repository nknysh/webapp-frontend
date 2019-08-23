import styled, { css } from 'styled-components';
import { Label, NumberSelect, Tabs } from '@pure-escapes/webapp-ui-components';

import { theme } from 'styles';

export const StyledGuestSelect = styled.div``;

export const GuestSelectLabel = styled(Label)``;

export const GuestSelectSection = styled.div`
  padding: ${theme.spacing.gutter}px;
  border-bottom: 1px solid ${theme.borders.default};
`;

export const GuestSelectEntry = styled.div`
  display: flex;
  align-items: center;
`;

export const GuestSelectEntryLabel = styled(Label)`
  flex: 1;

  > span {
    font-size: ${theme.fonts.sizes.less}px !important;
  }
`;

export const GuestSelectNumberSelect = styled(NumberSelect)`
  flex: 1;
`;

export const RoomTabs = styled(Tabs)`
  ${props => props.theme.breakpoints.tablet`
    margin-top: -1px
    border-top: 1px solid ${theme.borders.default};
    margin-left: -${theme.spacing.gutter * 10 - 1}px;
    margin-right: -${theme.spacing.gutter * 10 - 1}px;
  `}
`;

export const TabLabel = styled.span`
  ${({ ['data-error']: hasError }) =>
    hasError &&
    css`
      font-weight: ${theme.fonts.bold};
      color: ${theme.error};

      :after {
        content: ' *';
      }
    `}
`;
