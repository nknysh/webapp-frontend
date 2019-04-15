import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onSelected: PropTypes.func,
  sectionData: PropTypes.object,
  keepOpen: PropTypes.bool,
  selectedValues: PropTypes.shape({
    quantity: PropTypes.number,
    adult: PropTypes.number,
    teens: PropTypes.number,
    children: PropTypes.number,
    infant: PropTypes.number,
  }),
};

export const defaultProps = {
  onSelected: noop,
  selectedValues: {
    quantity: 0,
    adult: 0,
    teens: 0,
    children: 0,
    infant: 0,
  },
};
