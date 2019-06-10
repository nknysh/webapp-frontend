import styled from 'styled-components';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';
import { Container } from 'styles/elements';
export { Aside, Back } from 'containers/HotelBookingContainer/HotelBookingContainer.styles';
import { Main as BaseMain } from 'containers/HotelBookingContainer/HotelBookingContainer.styles';

export const StyledBookingContainer = styled(Container)`
  width: 100%;
  margin-bottom: ${theme.gutter * 2}px;

  ${breakpoints.tablet`
    padding-top: ${theme.gutter * 6.5}px;
    display: flex;
  `}
`;

export const Main = styled(BaseMain)`
  padding: ${theme.gutter * 2}px;
  margin-top: ${theme.gutter * 2}px !important;

  ${breakpoints.tablet`
    padding: 0;
    flex: 1;
    margin-right: ${theme.gutter * 14.5}px;
  `}
`;
