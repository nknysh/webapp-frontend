import PropTypes from 'prop-types';
import { propOr } from 'ramda';

import { propTypes as menuPropTypes } from 'components/Menu';

export const propTypes = {
  menu: propOr(PropTypes.any, 'links', menuPropTypes),
};
