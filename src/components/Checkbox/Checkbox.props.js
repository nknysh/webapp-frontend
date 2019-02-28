import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  label: PropTypes.string,
  onSelected: PropTypes.func,
};

export const defaultProps = {
  onSelected: noop,
};
