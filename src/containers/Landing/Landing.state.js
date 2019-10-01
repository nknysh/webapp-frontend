import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { fetchLatestOffers, getOffersResults, getOffersStatus } from 'store/modules/offers';

export const mapStateToProps = state => ({
  offers: getOffersResults(state),
  offersStatus: getOffersStatus(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchLatestOffers: pipe(
    fetchLatestOffers,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
