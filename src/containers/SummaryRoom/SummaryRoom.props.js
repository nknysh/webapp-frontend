import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  id: PropTypes.string,
  details: PropTypes.object,
  dates: PropTypes.array,
  total: PropTypes.string,
  mealPlan: PropTypes.object,
  quantity: PropTypes.array,
  onChange: PropTypes.func,
  onEdit: PropTypes.func,
  canEdit: PropTypes.bool,
  showImage: PropTypes.bool,
  showHolds: PropTypes.bool,
};

export const defaultProps = {
  id: '',
  quantity: [],
  onChange: noop,
  onEdit: noop,
  canEdit: false,
  dates: {},
  showImage: true,
  showHolds: false,
};
