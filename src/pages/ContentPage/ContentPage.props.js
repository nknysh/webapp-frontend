import PropTypes from 'prop-types';

export const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      pageId: PropTypes.string,
    }),
  }),
};

export const defaultProps = {
  match: {
    params: {
      pageId: undefined,
    },
  },
};
