import { connect } from 'react-redux';

import { getOffer, getOfferUploads } from 'store/modules/offers/selectors';

export const mapStateToProps = (state, { id }) => ({
  offer: getOffer(state, id),
  uploads: getOfferUploads(state, id),
});

export default connect(mapStateToProps);
