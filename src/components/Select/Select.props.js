import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  label: PropTypes.string,
  onSelected: PropTypes.func,
  options: PropTypes.object,
};

export const defaultProps = {
  onSelected: noop,
  options: {},
};
