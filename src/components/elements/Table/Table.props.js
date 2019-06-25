import PropTypes from 'prop-types';

export const propTypes = {
  head: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      // Function to select data for row
      selector: PropTypes.function,
      props: PropTypes.object,
    })
  ),
  data: PropTypes.arrayOf(PropTypes.object),
};

export const defaultProps = {
  head: [],
  data: [],
};
