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
  selectedValues: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      from: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
      to: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
    }),
  ]),
  showOverlay: PropTypes.bool,
  summaryText: PropTypes.string,
  multiple: PropTypes.bool,
};

export const defaultProps = {
  onSelected: noop,
  placeholder: 'Select dates',
  showOverlay: true,
  summaryText: getSingular('night'),
  summaryTextPlural: getPlural('night'),
  selectedValues: undefined,
  multiple: true,
};
