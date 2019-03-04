import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  align: PropTypes.oneOf(['start', 'middle', 'end']),
  className: PropTypes.string,
  currentPath: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      href: PropTypes.string,
      inverse: PropTypes.bool,
      bold: PropTypes.true,
    })
  ).isRequired,
  onLinkClick: PropTypes.func,
};

export const defaultProps = {
  align: 'middle',
  currentPath: '',
  links: [],
  onLinkClick: noop,
};
