import styled, { css } from 'styled-components';
import { Tabs, Tab as BaseTab } from '@material-ui/core';

import theme from 'styles/theme';

export const StyledTabs = styled(Tabs)`
  background: ${theme.colors.whiteish};

  .tab-line {
    height: 1px;
    background: ${theme.primary};
  }
`;

export const Tab = styled(BaseTab)`
  color: ${theme.colors['gold-light']} !important;
  flex-grow: 1 !important;
  font-family: ${theme.defaultFont} !important;
  font-size: 12px !important;
  text-transform: uppercase;
  font-weight: ${theme.bold} !important
    ${({ selected }) =>
      selected &&
      css`
        color: ${theme.colors['gold-dark']} !important;
      `};
`;
