import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { fetchLatestOffers, getOffersResults, getOffersStatus } from 'store/modules/offers';
import { searchByQuery, getSearchStatus } from 'store/modules/search';

export const mapStateToProps = state => ({
  offers: getOffersResults(state),
  searchStatus: getSearchStatus(state),
  offersStatus: getOffersStatus(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchLatestOffers: pipe(
    fetchLatestOffers,
    dispatch
  ),
  searchByQuery: pipe(
    searchByQuery,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
