import PropTypes from 'prop-types';

export const propTypes = {
  children: PropTypes.any,
  inputContent: PropTypes.any,
  inputProps: PropTypes.object,
  maskProps: PropTypes.shape({
    ['data-empty']: PropTypes.bool,
  }),
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  overlayProps: PropTypes.object,
  showArrow: PropTypes.bool,
  showContent: PropTypes.bool,
  showOverlay: PropTypes.bool,
  showInput: PropTypes.bool,
  contentOnly: PropTypes.bool,
  closeOnClickAway: PropTypes.bool,
};

export const defaultProps = {
  showArrow: true,
  showInput: true,
  contentOnly: false,
  closeOnClickAway: true,
};
