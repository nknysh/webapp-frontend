import { pipe } from 'ramda';
import { connect } from 'react-redux';

import {
  getAuthStatus,
  getAuthError,
  getCurrentUser,
  getUserCountryContext,
  getCurrentUserCountryCode,
  isSR,
} from 'store/modules/auth/selectors';
import { getCountriesNamesAsKeyValue } from 'store/modules/countries/selectors';
import { authSetCountry } from 'store/modules/auth/actions';

export const mapStateToProps = state => {
  const currentUser = getCurrentUser(state);
  const isSr = isSR(state);
  const countries = isSr && getCountriesNamesAsKeyValue(state);

  return {
    countries,
    countryContext: getUserCountryContext(state),
    currentUser,
    error: getAuthError(state),
    requestStatus: getAuthStatus(state),
    userCountry: getCurrentUserCountryCode(state),
    isSr,
  };
};

export const mapDispatchToProps = dispatch => ({
  setCountry: pipe(
    authSetCountry,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
