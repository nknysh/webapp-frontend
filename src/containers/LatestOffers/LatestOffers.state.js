import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { fetchOffers } from 'store/modules/offers/actions';
import { getOffersData, getOffersStatus } from '../../store/modules/offers/selectors';

export const mapStateToProps = state => ({
  offers: getOffersData(state),
  requestStatus: getOffersStatus(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchOffers: pipe(
    fetchOffers,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
