import styled from 'styled-components';

import { BackButton, Breadcrumbs } from 'components';

import theme from 'styles/theme';

export const HotelWrapper = styled.div``;

export const StyledBreadcrumbs = styled(Breadcrumbs)`
  margin-left: ${theme.gutter}px;
  margin-right: ${theme.gutter}px;
`;

export const Back = styled(BackButton)`
  display: flex;
  padding ${theme.gutter * 2}px !important;
`;
