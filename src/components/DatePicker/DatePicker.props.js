import PropTypes from 'prop-types';

import { getSingular, getPlural } from 'config/ui';
import { noop } from 'utils';

export const propTypes = {
  dayPickerProps: PropTypes.object,
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  label: PropTypes.string,
  onSelected: PropTypes.func,
  placeholder: PropTypes.string,
  selectedValues: PropTypes.object,
  showOverlay: PropTypes.bool,
  summaryText: PropTypes.string,
};

export const defaultProps = {
  onSelected: noop,
  placeholder: 'Select dates',
  showOverlay: true,
  summaryText: getSingular('night'),
  summaryTextPlural: getPlural('night'),
};
