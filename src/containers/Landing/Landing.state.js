import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { fetchLatestOffers } from 'store/modules/offers/actions';
import { getOffersResults, getOffersStatus } from 'store/modules/offers/selectors';

import { fetchSearch } from 'store/modules/search/actions';
import { getSearchStatus } from 'store/modules/search/selectors';

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
  fetchSearch: pipe(
    fetchSearch,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
