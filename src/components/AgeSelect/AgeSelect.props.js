import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  values: PropTypes.shape({}),
  ageRanges: PropTypes.shape({}),
  minMax: PropTypes.shape({}),
  onSelect: PropTypes.func,
};

export const defaultProps = {
  ageRanges: {
    adult: {},
    teen: {
      from: 13,
      to: 18,
    },
    child: {
      from: 2,
      to: 12,
    },
    infant: {
      from: 0,
      to: 2,
    },
  },
  minMax: {},
  onSelect: noop,
};
