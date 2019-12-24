import React, { HTMLProps } from 'react';
import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import { Sort } from '@material-ui/icons';

export const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 12px;
`;

export const THead = styled.thead`
  border-bottom: 1px solid ${pureUiTheme.colorRoles.lightGreyBorder};
`;

export const TFoot = styled.tfoot`
  border: blue 1px solid;
`;

export const TRow = styled.tr`
  border-bottom: 1px solid ${pureUiTheme.colorRoles.lightGreyBorder};

  td {
    padding: 5px 20px 5px 0;
  }
`;

export interface ITHProps extends HTMLProps<HTMLTableHeaderCellElement> {
  sortOrder?: 'asc' | 'desc';
}

const THComponent = (props: ITHProps) => {
  const { sortOrder, ...thProps } = props;
  return (
    <th {...thProps}>
      <span>{props.children}</span>
      {sortOrder && <Sort className={`sortIcon ${sortOrder === 'asc' ? 'asc' : 'desc'}`} />}
    </th>
  );
};

export const TH = styled(THComponent)`
  position: relative;
  height: 40px;
  color: ${props => (props.sortOrder ? pureUiTheme.colors.black : pureUiTheme.colors.blackLight)};
  border-bottom: 1px solid ${pureUiTheme.colors.black};
  border-bottom-color: ${props =>
    props.sortOrder ? pureUiTheme.colors.black : pureUiTheme.colorRoles.lightGreyBorder};
  font-weight: normal;
  margin-bottom: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-right: ${props => (props.sortOrder ? '30px' : '10px')};
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};

  .sortIcon {
    position: absolute;
    height: 100%;
    right: 5px;
    top: 0;
    transform: scaleX(-1) scaleY(1);
  }

  .sortIcon.asc {
    transform: scaleX(-1) scaleY(-1);
  }
`;

export const TD = styled.td`
  height: 40px;
  color: ${pureUiTheme.colors.blackDarker};
  font-weight: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  &:last-of-type {
    padding-right: 0;
  }
`;

//  There doesn't appear to be a type definition for HTMLTableBodyElement. So I can't extend from that interface.
export interface ITBodyProps<T> {
  tableData: T[];
  children: (rowData: T) => any;
}

// TODO: Figure out the correct typings so the child function knows what type it's being called with
const TBodyComponent: <T>(props: ITBodyProps<T>) => React.ReactElement<ITBodyProps<T>> = props => {
  const { children, tableData, ...tbodyProps } = props;
  return <tbody {...tbodyProps}>{Array.isArray(tableData) && tableData.map(rowData => children(rowData))}</tbody>;
};

export const TBody = styled(TBodyComponent)``;
