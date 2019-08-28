import PropTypes from 'prop-types';

export const propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export const defaultProps = {
  location: {
    pathname: '',
  },
};

export const contextTypes = Object.freeze({
  SIGN_UP: 'signup',
  LOGIN: 'login',
});
