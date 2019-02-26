import PropTypes from 'prop-types';

export const propTypes = {
  page: PropTypes.any,
  pageId: PropTypes.string,
  getPage: PropTypes.func,
};

export const defaultProps = {
  page: undefined,
  pageId: undefined,
  getPage: () => {},
};
