import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { fetchLatestOffers } from 'store/modules/offers/actions';
import { getOffersData, getOffersStatus } from 'store/modules/offers/selectors';

export const mapStateToProps = state => ({
  offers: getOffersData(state),
  requestStatus: getOffersStatus(state),
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
