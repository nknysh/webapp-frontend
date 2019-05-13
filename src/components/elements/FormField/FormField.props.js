import PropTypes from 'prop-types';

import Input from 'components/elements/Input';

export const propTypes = {
  label: PropTypes.string,
  Component: PropTypes.func,
};

export const defaultProps = {
  Component: Input,
};