import styled, { css } from 'styled-components';
import { Tabs, Tab as BaseTab } from '@material-ui/core';

import theme from 'styles/theme';

export const StyledTabs = styled(Tabs)`
  background: ${theme.backgrounds.secondary};
  border-bottom: 1px solid ${theme.primary};

  .tab-line {
    height: 1px;
    background: ${theme.primary};
  }
`;

export const Tab = styled(BaseTab)`
  color: ${theme.colors['gold-light']} !important;
  flex-grow: 1 !important;
  font-family: ${theme.fonts.defaultFont} !important;
  font-size: ${theme.fonts.sizes.default}px !important;
  text-transform: uppercase;
  font-weight: ${theme.fonts.bold} !important;
  ${({ selected }) =>
    selected &&
    css`
      color: ${theme.secondary} !important;
    `};
`;
