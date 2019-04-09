import styled from 'styled-components';

import { BackButton, Breadcrumbs, Hotel, SummaryForm } from 'components';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';
import { Container } from 'styles/elements';

export const StyledHotelContainer = styled(Container)`
  width: 100%;
  margin-bottom: ${theme.gutter * 2}px;
`;

export const StyledHotel = styled(Hotel)`
  ${breakpoints.tablet`
        flex: 1;
        max-width: 66%;
        padding: 0;
    `}
`;

export const StyledSummary = styled(SummaryForm)``;

export const StyledBreadcrumbs = styled(Breadcrumbs)`
  margin-left: ${theme.gutter}px;
  margin-right: ${theme.gutter}px;
`;

export const Full = styled.div`
  display: flex;
`;

export const Back = styled(BackButton)`
  display: flex;
  padding ${theme.gutter * 2}px !important;
`;

export const Aside = styled.aside`
  ${breakpoints.tablet`
    flex: 1;
    max-width: 33%;
  `}
`;
