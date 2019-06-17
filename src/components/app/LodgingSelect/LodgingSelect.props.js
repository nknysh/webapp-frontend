import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onSelected: PropTypes.func,
  sectionData: PropTypes.object,
  keepOpen: PropTypes.bool,
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      numberOfAdults: PropTypes.number,
      agesOfAllChildren: PropTypes.arrayOf(PropTypes.number),
    })
  ),
};

export const defaultProps = {
  onSelected: noop,
  rooms: [],
};
