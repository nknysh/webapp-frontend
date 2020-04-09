import { pipe } from 'ramda';
import { connect } from 'react-redux';

import { getCountriesNamesAsKeyValue } from 'store/modules/countries';
import {
  getAuthStatus,
  getAuthError,
  getUserCountryContext,
  getCurrentUserCountryCode,
  isSR,
  authSetCountry,
} from 'store/modules/auth';

export const mapStateToProps = state => {
  const isSr = isSR(state);
  const countries = isSr && getCountriesNamesAsKeyValue(state);

  return {
    countries,
    countryContext: getUserCountryContext(state),
    error: getAuthError(state),
    requestStatus: getAuthStatus(state),
    userCountry: getCurrentUserCountryCode(state),
  };
};

export const mapDispatchToProps = dispatch => ({
  setCountry: pipe(authSetCountry, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
