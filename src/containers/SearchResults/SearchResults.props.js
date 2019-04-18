import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  searchQuery: PropTypes.object,
  searchByQuery: PropTypes.func,
  meta: PropTypes.object,
  result: PropTypes.array,
};

export const defaultProps = {
  searchQuery: {},
  searchByQuery: noop,
  meta: {},
  result: [],
};
