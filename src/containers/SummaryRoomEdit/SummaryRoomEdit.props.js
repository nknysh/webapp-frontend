import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  ageRanges: PropTypes.object,
  canChangeDates: PropTypes.bool,
  dates: PropTypes.array,
  details: PropTypes.object,
  hotelUuid: PropTypes.string,
  id: PropTypes.string,
  mealPlan: PropTypes.string,
  mealPlans: PropTypes.array,
  onChange: PropTypes.func,
  onDatesShow: PropTypes.func,
  onEdit: PropTypes.func,
  onSubmit: PropTypes.func,
  quantity: PropTypes.array,
};

export const defaultProps = {
  ageRanges: {},
  canChangeDates: true,
  dates: {},
  details: {},
  hotelUuid: '',
  id: '',
  mealPlan: '',
  mealPlans: {},
  onChange: noop,
  onDatesShow: noop,
  onEdit: noop,
  onSubmit: noop,
  quantity: [],
};
