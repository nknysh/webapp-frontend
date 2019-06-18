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
    children: {
      ageFrom: 0,
      ageTo: 17,
    },
  },
  minMax: {},
  showAgeDropDown: {
    adult: false,
  },
  onSelect: noop,
};
