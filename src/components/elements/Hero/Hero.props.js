import PropTypes from 'prop-types';

export const propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  full: PropTypes.bool,
  media: PropTypes.shape({
    image: PropTypes.string,
    video: PropTypes.shape({
      path: PropTypes.string,
      type: PropTypes.string,
    }),
  }),
  offsetBy: PropTypes.number,
};

export const defaultProps = {
  full: false,
  media: {},
  offsetBy: 0,
};
