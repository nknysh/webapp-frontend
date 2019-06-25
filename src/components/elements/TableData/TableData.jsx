import React from 'react';
import PropTypes from 'prop-types';
import { __, path, split, map, pipe, join } from 'ramda';

import { isArray } from 'utils';

const splitSource = split('.');
const splitSources = map(splitSource);

export const TableData = ({ record, source }) => {
  const sources = isArray(source) ? source : [source];

  const paths = splitSources(sources);

  const data = pipe(
    map(path(__, record)),
    join(' ')
  )(paths);

  return <span>{data}</span>;
};

TableData.propTypes = {
  record: PropTypes.object,
  source: PropTypes.string,
};
TableData.defaultProps = {};

export default TableData;
