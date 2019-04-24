import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  hotelUuid: PropTypes.string,
  id: PropTypes.string,
  dates: PropTypes.object,
  ageRanges: PropTypes.object,
  details: PropTypes.object,
  quantity: PropTypes.array,
  mealPlan: PropTypes.object,
  mealPlans: PropTypes.object,
  onChange: PropTypes.func,
  onEdit: PropTypes.func,
  onDatesShow: PropTypes.func,
};

export const defaultProps = {
  hotelUuid: '',
  id: '',
  dates: {},
  ageRanges: {},
  details: {},
  quantity: [],
  mealPlan: {},
  mealPlans: {},
  onChange: noop,
  onEdit: noop,
  onDatesShow: noop,
};
