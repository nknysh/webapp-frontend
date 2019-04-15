import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { getHotel, getHotelFeaturedPhoto } from 'store/modules/hotels/selectors';
import { fetchLatestOffers } from 'store/modules/offers/actions';
import { getOffersResults, getOffersStatus, getOffer } from 'store/modules/offers/selectors';

export const mapStateToProps = state => ({
  offers: getOffersResults(state),
  offersStatus: getOffersStatus(state),
  getHotel: getHotel(state),
  getOffer: getOffer(state),
  getHotelFeaturedPhoto: getHotelFeaturedPhoto(state),
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
