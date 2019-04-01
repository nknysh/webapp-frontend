import PropTypes from 'prop-types';

export const propTypes = {
  offer: PropTypes.shape({
    validFrom: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
    validTo: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
    description: PropTypes.string,
    name: PropTypes.name,
    rate: PropTypes.shape({
      rate: PropTypes.string,
    }),
    hotel: PropTypes.shape({
      uuid: PropTypes.string,
      name: PropTypes.string,
      image: PropTypes.string,
    }),
  }),
};

export const defaultProps = {};
