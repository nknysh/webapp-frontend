import { pipe } from 'ramda';
import { connect } from 'react-redux';

import {
  updateRequestedBuildLodgingGuestAges,
  updateRequestedBuildLodgingDates,
  updateRequestedBuildLodgingMealPlan,
} from 'store/modules/bookings';

export const mapStateToProps = (state, { id }) => ({});

export const mapDispatchToProps = dispatch => ({
  updateRequestedBuildLodgingGuestAges: pipe(
    updateRequestedBuildLodgingGuestAges,
    dispatch
  ),
  updateRequestedBuildLodgingDates: pipe(
    updateRequestedBuildLodgingDates,
    dispatch
  ),
  updateRequestedBuildLodgingMealPlan: pipe(
    updateRequestedBuildLodgingMealPlan,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
