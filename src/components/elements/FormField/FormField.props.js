import PropTypes from 'prop-types';

import Input from 'components/elements/Input';

export const propTypes = {
  label: PropTypes.string,
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export const defaultProps = {
  Component: Input,
};
