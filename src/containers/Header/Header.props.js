import PropTypes from 'prop-types';
import { propOr } from 'ramda';

import { propTypes as menuPropTypes } from 'components/Menu';
import { propTypes as withAuthPropTypes } from 'hoc/withAuthentication';

export const propTypes = {
  ...withAuthPropTypes,
  menu: propOr(PropTypes.any, 'links', menuPropTypes),
};
