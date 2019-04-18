import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  onChange: PropTypes.func,
  onReset: PropTypes.func,
  regions: PropTypes.array,
  starRatings: PropTypes.array,
  features: PropTypes.array,
};

export const defaultProps = {
  onChange: noop,
  onReset: noop,
  regions: [],
  starRatings: [],
  features: [],
};
