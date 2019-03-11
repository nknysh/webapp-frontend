import styled from 'styled-components';

import { Link } from 'components';

import theme from 'styles/theme';
import { Container } from 'styles/elements';
import breakpoints from 'styles/breakpoints';
import { Icon } from '@material-ui/core';

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

export const Navigation = styled(Link)`
  display: none;

  ${breakpoints.tablet`
    font-size: 12px;
    text-transform: uppercase;
    color: ${theme.primary} !important;
    display: flex;
    align-items: center;
    margin-bottom: ${theme.gutter * 6}px;
    font-weight: bold;
  `}
`;

export const BackButtonWrapper = styled.div`
    background: ${theme.navigation};
    padding ${theme.gutter / 4}px ${theme.gutter / 2}px;
    margin-right: ${theme.gutter}px;

`;

export const BackButton = styled(Icon)`
  font-size: 14px !important;
`;
