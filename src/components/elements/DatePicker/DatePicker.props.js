import PropTypes from 'prop-types';

import i18n from 'config/i18n';

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
      startDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
      endDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
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
  summaryText: i18n.t('night'),
  summaryTextPlural: i18n.t('night_plural'),
  selectedValues: undefined,
  multiple: true,
};
