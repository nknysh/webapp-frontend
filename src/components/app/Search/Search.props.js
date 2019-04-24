import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  indexes: PropTypes.array,
  indexSelectors: PropTypes.array,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  onSubmit: PropTypes.func,
  searchStatus: PropTypes.string,
  showSubmit: PropTypes.bool,
  vertical: PropTypes.bool,
  searchQuery: PropTypes.shape({
    value: PropTypes.string,
  }),
};

export const defaultProps = {
  indexes: [],
  indexSelectors: [],
  onChange: noop,
  onSearch: noop,
  onSubmit: noop,
  showSubmit: true,
  vertical: false,
  searchQuery: {
    value: '',
  },
};
