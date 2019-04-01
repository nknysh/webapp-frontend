import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { getHotel } from 'store/modules/hotels/selectors';
import { fetchLatestOffers } from 'store/modules/offers/actions';
import { getOffersData, getOffersStatus } from 'store/modules/offers/selectors';

export const mapStateToProps = state => ({
  offers: getOffersData(state),
  offersStatus: getOffersStatus(state),
  getHotel: getHotel(state),
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
