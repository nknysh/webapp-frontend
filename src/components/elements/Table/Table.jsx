import React, { Fragment, Children, cloneElement } from 'react';
import { Table as BaseTable, TableHead, TableCell, TableBody } from '@material-ui/core';
import { partial, pathOr, path } from 'ramda';

import { mapWithIndex } from 'utils';

import { propTypes, defaultProps } from './Table.props';
import { TableTitle, TableRow } from './Table.styles';

export const renderTableHeader = child => (
  <TableCell>{pathOr(path(['props', 'source']), ['props', 'label'], child)}</TableCell>
);
export const renderTableData = (record, child, i) => <TableCell key={i}>{cloneElement(child, { record })}</TableCell>;
export const renderData = (children, record, i) => (
  <TableRow key={i}>{Children.map(children, partial(renderTableData, [record]))}</TableRow>
);

export const Table = ({ title, children, data, ...props }) => {
  const arrChildren = Children.toArray(children);
  return (
    <Fragment>
      {title && <TableTitle>{title}</TableTitle>}
      <BaseTable {...props}>
        <TableHead>
          <TableRow>{Children.map(arrChildren, renderTableHeader)}</TableRow>
        </TableHead>
        <TableBody>{mapWithIndex(partial(renderData, [arrChildren]), data)}</TableBody>
      </BaseTable>
    </Fragment>
  );
};

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;
