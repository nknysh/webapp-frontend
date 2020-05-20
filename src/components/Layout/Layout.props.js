import PropTypes from 'prop-types';

export const propTypes = {
  isAppVersionDeprecated: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
};
