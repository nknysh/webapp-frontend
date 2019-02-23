import PropTypes from 'prop-types';

export const propTypes = {
  align: PropTypes.oneOf(['start', 'middle', 'end']),
  className: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      href: PropTypes.string,
      inverse: PropTypes.bool,
      bold: PropTypes.true,
    })
  ).isRequired,
};

export const defaultProps = {
  align: 'middle',
  links: [],
};
