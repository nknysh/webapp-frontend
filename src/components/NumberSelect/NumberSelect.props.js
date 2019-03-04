import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  onChange: PropTypes.func,
  startAt: PropTypes.number,
};

export const defaultProps = {
  onChange: noop,
  startAt: 0,
};
