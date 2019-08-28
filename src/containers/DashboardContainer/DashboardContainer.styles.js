import styled, { css } from 'styled-components';
import { Sidebar as BaseSidebar, Link } from '@pure-escapes/webapp-ui-components';

import { theme } from 'styles';

export const Dashboard = styled.div`
  width: 100%;
  padding: ${theme.spacing.gutter * 2}px;
  min-height: 400px;

  ${props => props.theme.breakpoints.tablet`
        padding: ${theme.spacing.gutter * 6}px ${theme.spacing.gutter * 2}px;
        display: flex;
    `}
`;

export const Sidebar = styled(BaseSidebar)`
  width: 100%;

  ${props => props.theme.breakpoints.tablet`
        flex: 1 1 25%;
        max-width: 25%;
        width: auto;
        margin-right: ${theme.spacing.gutter * 8}px;
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

  ${props => props.theme.breakpoints.tablet`
        flex: 1 1 75%;
        max-width: 75%;
        width: auto;
        margin-right: ${theme.spacing.gutter * 8}px;
    `}
`;
export const ShowAll = styled(Link)`
  display: block;
  padding: ${theme.spacing.gutter}px !important;
  text-transform: uppercase;
  text-align: center;
  margin: ${theme.spacing.gutter * 2}px 0;
`;
