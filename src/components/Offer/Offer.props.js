import PropTypes from 'prop-types';

export const propTypes = {
  offer: PropTypes.shape({
    name: PropTypes.string,
    pricePerAdult: PropTypes.number,
    description: PropTypes.string,
    hotelUuid: PropTypes.shape({
      uuid: PropTypes.string,
      name: PropTypes.string,
      image: PropTypes.string,
    }),
  }),
};

export const defaultProps = {};
