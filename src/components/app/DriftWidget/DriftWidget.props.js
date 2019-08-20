import PropTypes from 'prop-types';

export const propTypes = {
  appId: PropTypes.string.isRequired,
  userId: PropTypes.string,
  attributes: PropTypes.object,
  enabled: PropTypes.bool,
};

export const defaultProps = {};
