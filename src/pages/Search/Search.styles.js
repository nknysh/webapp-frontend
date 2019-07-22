import styled from 'styled-components';

import { BackButton, Container } from 'components';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';

export const StyledSearch = styled(Container)`
  width: 100%;

  ${breakpoints.tablet`
    padding: ${theme.gutter * 6}px 0;
  `}
`;

export const Columns = styled.div`
  ${breakpoints.tablet`
        display: flex;
    `}
`;

export const Column = styled.div`
  ${breakpoints.tablet`
        flex: 1;
    `}
`;

export const ColumnLeft = styled(Column)`
  ${breakpoints.tablet`
        flex-width: 27%;
        min-width: 27%;
        padding-right: ${theme.gutter * 3}px;
    `}
`;

export const ColumnRight = styled(Column)`
  ${breakpoints.tablet`
        flex-width: 73%;
        min-width: 73%;

    `}
`;

export const Back = styled(BackButton)`
  margin-bottom: ${theme.gutter * 6}px;
`;
