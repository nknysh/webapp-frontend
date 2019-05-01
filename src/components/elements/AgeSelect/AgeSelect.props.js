import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  values: PropTypes.object,
  ageRanges: PropTypes.object,
  minMax: PropTypes.object,
  onSelect: PropTypes.func,
  showAgeDropDown: PropTypes.object,
};

export const defaultProps = {
  ageRanges: {
    adult: {},
    teen: {
      ageFrom: 13,
      ageTo: 18,
    },
    child: {
      ageFrom: 2,
      ageTo: 12,
    },
    infant: {
      ageFrom: 0,
      ageTo: 2,
    },
  },
  minMax: {},
  showAgeDropDown: {
    adult: false,
  },
  onSelect: noop,
};
