import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  isLoading: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  results: PropTypes.shape({
    countries: PropTypes.array,
    hotels: PropTypes.array,
  }),
  value: PropTypes.string,
};

export const defaultProps = {
  onChange: noop,
  results: {},
};
