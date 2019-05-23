import { pipe } from 'ramda';
import { connect } from 'react-redux';

import {
  getAuthStatus,
  getAuthError,
  getCurrentUser,
  getUserCountryContext,
  getCurrentUserCountryCode,
} from 'store/modules/auth/selectors';
import { getCountriesNamesAsKeyValue } from 'store/modules/countries/selectors';
import { authSetCountry } from 'store/modules/auth/actions';
import { isSr } from 'utils';

export const mapStateToProps = state => {
  const currentUser = getCurrentUser(state);
  const countries = isSr(currentUser) && getCountriesNamesAsKeyValue(state);

  return {
    countries,
    countryContext: getUserCountryContext(state),
    currentUser,
    error: getAuthError(state),
    requestStatus: getAuthStatus(state),
    userCountry: getCurrentUserCountryCode(state),
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
