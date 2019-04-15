import PropTypes from 'prop-types';

import { noop } from 'utils';

import { getPlural } from 'config/ui';

const ageRange = {
  from: PropTypes.number,
  to: PropTypes.number,
};
const minMax = {
  min: PropTypes.number,
  max: PropTypes.number,
};

export const propTypes = {
  labels: PropTypes.shape({
    adults: PropTypes.string,
    teens: PropTypes.string,
    children: PropTypes.string,
    infants: PropTypes.string,
  }),
  values: PropTypes.shape({
    adults: PropTypes.number,
    teens: PropTypes.number,
    children: PropTypes.number,
    infants: PropTypes.number,
  }),
  ageRanges: PropTypes.shape({
    teens: PropTypes.shape(ageRange),
    children: PropTypes.shape(ageRange),
    infants: PropTypes.shape(ageRange),
  }),
  minMax: PropTypes.shape({
    teens: PropTypes.shape(minMax),
    children: PropTypes.shape(minMax),
    infants: PropTypes.shape(minMax),
  }),
  onSelect: PropTypes.func,
};

export const defaultProps = {
  labels: {
    adults: getPlural('adult'),
    teens: getPlural('teen'),
    children: getPlural('children'),
    infants: getPlural('infant'),
  },
  values: {
    adults: 0,
    teens: 0,
    children: 0,
    infants: 0,
  },
  ageRanges: {
    teens: {
      from: 13,
      to: 18,
    },
    children: {
      from: 2,
      to: 12,
    },
    infants: {
      from: 0,
      to: 2,
    },
  },
  minMax: {},
  onSelect: noop,
};
