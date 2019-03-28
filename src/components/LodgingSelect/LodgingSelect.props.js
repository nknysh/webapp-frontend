import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onSelected: PropTypes.func,
  sectionData: PropTypes.object,
  selectedValues: PropTypes.shape({
    rooms: PropTypes.number,
    adults: PropTypes.number,
    teens: PropTypes.number,
    children: PropTypes.number,
    infants: PropTypes.number,
  }),
};

export const defaultProps = {
  onSelected: noop,
  selectedValues: {
    rooms: 0,
    adults: 0,
    teens: 0,
    children: 0,
    infants: 0,
  },
};
