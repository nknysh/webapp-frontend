import styled from 'styled-components';
import { TableRow as BaseTableRow } from '@material-ui/core';

import { theme, Heading2 } from 'styles';

export const TableTitle = styled(Heading2)`
  padding: ${theme.gutter / 1.5}px 0 ${theme.gutter * 2.25}px;
  margin: 0 0 ${theme.gutter * 2}px;
  border-bottom: 1px solid ${theme.borders.default};
`;

export const TableRow = styled(BaseTableRow)`
  th, td {
    font-size: ${theme.fonts.sizes.normal}px;
    font-weight: ${theme.fonts.normal};
    padding ${theme.gutter * 2}px ${theme.gutter}px;

    &:first-child{
      padding-left: 0;
    }

    &:last-child{
      padding-right: 0;
    }
  }
`;
