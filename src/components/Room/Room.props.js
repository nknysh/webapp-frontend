import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  withSelection: PropTypes.bool,
  onChange: PropTypes.func,
  selectedCount: PropTypes.number,
  currencyCode: PropTypes.string,
  updateInProgress: PropTypes.bool,
};

export const defaultProps = {
  withSelection: true,
  onChange: noop,
  selectedCount: 0,
  updateInProgress: false,
};
