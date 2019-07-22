import styled, { css } from 'styled-components';

import { Sidebar as BaseSidebar, Link } from 'components';
import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';

export const Dashboard = styled.div`
  width: 100%;
  padding: ${theme.gutter * 2}px;
  min-height: 400px;

  ${breakpoints.tablet`
        padding: ${theme.gutter * 6}px ${theme.gutter * 2}px;
        display: flex;
    `}
`;

export const Sidebar = styled(BaseSidebar)`
  width: 100%;

  ${breakpoints.tablet`
        flex: 1 1 25%;
        max-width: 25%;
        width: auto;
        margin-right: ${theme.gutter * 8}px;
    `}
`;

export const SidebarItem = styled.span`
  font-size: ${theme.fonts.sizes.link}px;
  text-transform: uppercase;
  cursor: pointer;

  ${({ ['data-active']: active }) =>
    active &&
    css`
      font-weight: ${theme.fonts.bold};
    `}
`;

export const DashboardContent = styled.div`
  width: 100%;

  ${breakpoints.tablet`
        flex: 1 1 75%;
        max-width: 75%;
        width: auto;
        margin-right: ${theme.gutter * 8}px;
    `}
`;
export const ShowAll = styled(Link)`
  display: block;
  padding: ${theme.gutter}px !important;
  text-transform: uppercase;
  text-align: center;
  margin: ${theme.gutter * 2}px 0;
`;
