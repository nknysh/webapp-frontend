import styled from 'styled-components';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';

import { Container } from 'components';

export const UserContainer = styled(Container)`
  ${breakpoints.tablet`
      margin-top: ${theme.gutter * 8.5}px;
      display: flex;
    `}
`;

export const Aside = styled.aside`
  padding: ${theme.gutter * 2}px;

  ${breakpoints.tablet`
      flex: 0 1 33%;
    `}
`;

export const Main = styled.main`
  padding: ${theme.gutter * 2}px;
  flex: 1;
`;
