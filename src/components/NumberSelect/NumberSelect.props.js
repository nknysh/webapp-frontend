import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  onChange: PropTypes.func,
  startAt: PropTypes.number,
  zeroText: PropTypes.string,
  prevClassName: PropTypes.string,
  nextClassName: PropTypes.string,
  countClassName: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
};

export const defaultProps = {
  onChange: noop,
  startAt: 0,
};
