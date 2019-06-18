import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  booking: PropTypes.object,
  bookLabel: PropTypes.string,
  canBook: PropTypes.bool,
  canChangeDates: PropTypes.bool,
  canEdit: PropTypes.bool,
  holdOnly: PropTypes.bool,
  children: PropTypes.func,
  className: PropTypes.string,
  compact: PropTypes.bool,
  guardEdit: PropTypes.bool,
  hotel: PropTypes.object,
  name: PropTypes.string,
  onAddHolds: PropTypes.func,
  onBook: PropTypes.func,
  onGuardEdit: PropTypes.func,
  onReleaseHolds: PropTypes.func,
  onSubmit: PropTypes.func,
  saving: PropTypes.number,
  showHolds: PropTypes.bool,
  showRoomImage: PropTypes.bool,
  summaryOnly: PropTypes.bool,
  total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export const defaultProps = {
  booking: {},
  canChangeDates: true,
  canEdit: true,
  children: noop,
  compact: false,
  guardEdit: false,
  holdOnly: false,
  hotel: {},
  onBook: noop,
  onGuardEdit: () => Promise.resolve(),
  onGuardEditComplete: () => Promise.resolve(),
  onSubmit: noop,
  showRoomImage: true,
  summaryOnly: false,
  total: 0,
  showHolds: false,
  onReleaseHolds: noop,
  onAddHolds: noop,
};
