import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { isLoading } from 'store/common';

import { fetchLatestOffers } from 'store/modules/offers/actions';
import { getOffersData, getOffersStatus } from 'store/modules/offers/selectors';

import { fetchHotels } from 'store/modules/hotels/actions';

import { getCountriesData, getCountriesStatus } from 'store/modules/countries/selectors';
import { getHotelsData, getHotelsStatus } from 'store/modules/hotels/selectors';

export const mapStateToProps = state => ({
  offers: getOffersData(state),
  hotels: getHotelsData(state),
  countries: getCountriesData(state),
  requesting:
    isLoading(getHotelsStatus(state)) || isLoading(getCountriesStatus(state)) || isLoading(getOffersStatus(state)),
});

export const mapDispatchToProps = dispatch => ({
  fetchLatestOffers: pipe(
    fetchLatestOffers,
    dispatch
  ),
  fetchHotels: pipe(
    fetchHotels,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
