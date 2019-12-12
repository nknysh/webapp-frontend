import PropTypes from 'prop-types';

import { noop } from 'utils';

export const propTypes = {
  hotel: PropTypes.object,
  policiesAndTerms: PropTypes.shape({
    paymentTerms: PropTypes.object,
    cancellationPolicy: PropTypes.object,
  }),
  updateBooking: PropTypes.func,
  resetBookingBuilderUiStateAction: PropTypes.func,
};

export const defaultProps = {
  hotel: {},
  updateBooking: noop,
  policiesAndTerms: {
    paymentTerms: {},
    cancellationPolicy: {},
  },
};
