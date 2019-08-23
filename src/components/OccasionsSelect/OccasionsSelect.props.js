import PropTypes from 'prop-types';
import { values } from 'ramda';

import { noop } from 'utils';
import { Occassions } from 'config/enums';

export const propTypes = {
  onChange: PropTypes.func,
  occasions: PropTypes.array,
};

export const defaultProps = {
  onChange: noop,
  occasions: values(Occassions),
};
