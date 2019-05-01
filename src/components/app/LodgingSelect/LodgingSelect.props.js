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
    adult: PropTypes.array,
    teen: PropTypes.array,
    child: PropTypes.array,
    infant: PropTypes.array,
  }),
};

export const defaultProps = {
  onSelected: noop,
  selectedValues: {
    quantity: 0,
    adult: [],
    teen: [],
    child: [],
    infant: [],
  },
};
