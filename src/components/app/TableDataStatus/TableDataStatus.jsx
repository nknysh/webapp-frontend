import React from 'react';
import PropTypes from 'prop-types';
import { path, split } from 'ramda';

import Status from 'components/app/Status';

export const TableDataStatus = ({ record, source }) => (
  <Status data-status={path(split('.', source), record)}>{path(split('.', source), record)}</Status>
);

TableDataStatus.propTypes = {
  record: PropTypes.object,
  source: PropTypes.string,
};
TableDataStatus.defaultProps = {};

export default TableDataStatus;
