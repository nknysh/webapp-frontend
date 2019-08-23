import styled from 'styled-components';
import { Container } from '@pure-escapes/webapp-ui-components';

import theme from 'styles/theme';

export const UserContainer = styled(Container)`
  ${props => props.theme.breakpoints.tablet`
      margin-top: ${theme.spacing.gutter * 8.5}px;
      display: flex;
    `}
`;

export const Aside = styled.aside`
  padding: ${theme.spacing.gutter * 2}px;

  ${props => props.theme.breakpoints.tablet`
      flex: 0 1 33%;
    `}
`;

export const Main = styled.main`
  padding: ${theme.spacing.gutter * 2}px;
  flex: 1;
`;
