import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  indexes: PropTypes.array,
  indexSelectors: PropTypes.array,
  searchPatterns: PropTypes.array,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  onSubmit: PropTypes.func,
  searchStatus: PropTypes.string,
  showSubmit: PropTypes.bool,
  vertical: PropTypes.bool,
  canSearch: PropTypes.bool,
  searchQuery: PropTypes.shape({
    value: PropTypes.string,
  }),
};

export const defaultProps = {
  indexes: [],
  searchPatterns: [],
  indexSelectors: [],
  onChange: noop,
  onSearch: noop,
  onSubmit: noop,
  showSubmit: true,
  vertical: false,
  canSearch: true,
  searchQuery: {
    value: '',
  },
};
