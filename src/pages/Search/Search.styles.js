import styled from 'styled-components';
import { BackButton, Container } from '@pure-escapes/webapp-ui-components';

import { theme } from 'styles';

export const StyledSearch = styled(Container)`
  ${props => props.theme.breakpoints.tablet`
    padding: ${theme.spacing.gutter * 6}px 0;
  `}
`;

export const Columns = styled.div`
  ${props => props.theme.breakpoints.tablet`
        display: flex;
    `}
`;

export const Column = styled.div`
  ${props => props.theme.breakpoints.tablet`
        flex: 1;
    `}
`;

export const ColumnLeft = styled(Column)`
  ${props => props.theme.breakpoints.tablet`
        flex-width: 27%;
        min-width: 27%;
        padding-right: ${theme.spacing.gutter * 3}px;
    `}
`;

export const ColumnRight = styled(Column)`
  ${props => props.theme.breakpoints.tablet`
        flex-width: 73%;
        min-width: 73%;

    `}
`;

export const Back = styled(BackButton)`
  margin-bottom: ${theme.spacing.gutter * 6}px;
`;
