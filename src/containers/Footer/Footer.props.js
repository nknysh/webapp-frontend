import PropTypes from 'prop-types';
import { propOr } from 'ramda';

import { propTypes as menuPropTypes } from 'components/Menu';

export const propTypes = {
  currentPath: PropTypes.string,
  menu: propOr(PropTypes.any, 'links', menuPropTypes),
};

export const defaultProps = {
  currentPath: '',
};
