import PropTypes from 'prop-types';

import { noop } from 'utils';

const stringNumber = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

export const propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onSelected: PropTypes.func,
  sectionData: PropTypes.object,
  keepOpen: PropTypes.bool,
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      numberOfAdults: stringNumber,
      agesOfAllChildren: PropTypes.arrayOf(stringNumber),
    })
  ),
};

export const defaultProps = {
  onSelected: noop,
  rooms: [],
};
