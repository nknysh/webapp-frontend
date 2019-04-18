import PropTypes from 'prop-types';
import { propOr } from 'ramda';

import { propTypes as menuPropTypes } from 'components/elements/Menu';
import { propTypes as withAuthPropTypes } from 'hoc/withAuthentication';

export const propTypes = {
  ...withAuthPropTypes,
  menu: propOr(PropTypes.any, 'links', menuPropTypes),
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
