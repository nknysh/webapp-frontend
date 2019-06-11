import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  booking: PropTypes.object,
  bookLabel: PropTypes.string,
  canBook: PropTypes.bool,
  canChangeDates: PropTypes.bool,
  canEdit: PropTypes.bool,
  className: PropTypes.string,
  compact: PropTypes.bool,
  guardEdit: PropTypes.bool,
  hotel: PropTypes.object,
  name: PropTypes.string,
  onBook: PropTypes.func,
  onGuardEdit: PropTypes.func,
  onSubmit: PropTypes.func,
  saving: PropTypes.number,
  summaryOnly: PropTypes.bool,
  total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export const defaultProps = {
  booking: {},
  canChangeDates: true,
  canEdit: true,
  compact: false,
  guardEdit: false,
  hotel: {},
  onBook: noop,
  onGuardEdit: () => Promise.resolve(),
  onGuardEditComplete: () => Promise.resolve(),
  onSubmit: noop,
  summaryOnly: false,
  total: 0,
};
