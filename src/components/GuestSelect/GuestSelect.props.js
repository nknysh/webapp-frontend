import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onSelected: PropTypes.func,
  onRoomChange: PropTypes.func,
  sectionData: PropTypes.object,
  keepOpen: PropTypes.bool,
  errors: PropTypes.array,
  selectedValues: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.shape({
      quantity: PropTypes.number,
      adult: PropTypes.number,
      teens: PropTypes.number,
      children: PropTypes.number,
      infant: PropTypes.number,
    }),
  ]),
};

export const defaultProps = {
  onSelected: noop,
  onRoomChange: noop,
  selectedValues: [],
  errors: [],
};
