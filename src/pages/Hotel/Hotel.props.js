import PropTypes from 'prop-types';

export const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
};

export const defaultProps = {
  match: {
    params: {},
  },
};
