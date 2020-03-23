import { AxiosResponse } from 'axios';
import { call, takeLatest, select, put } from 'redux-saga/effects';
import { makeBackendApi } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';
import {
  BootstrapAppRequestAction,
  bootstrapAppSuccessAction,
  bootstrapAppFailureAction,
  BOOTSTRAP_APP_REQUEST,
} from '../actions';

export function* bootstrapAppRequestSaga(action: BootstrapAppRequestAction) {
  try {
    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);
    const countriesResult: AxiosResponse = yield call(backendApi.getBootstrapCountries);
    const hotelsResult: AxiosResponse = yield call(backendApi.getHotelsAsHotelNames);
    const extraPersonSupplementProductResult: AxiosResponse = yield call(
      backendApi.getBootstrapExtraPersonSupplementProduct
    );

    const countries = countriesResult.data.data;
    const hotels = hotelsResult.data.data;
    const extraPersonSupplementProduct = extraPersonSupplementProductResult.data.data;

    yield put(bootstrapAppSuccessAction(countries, hotels, extraPersonSupplementProduct));
  } catch (e) {
    yield put(bootstrapAppFailureAction(e));
  }
}

export function* watchBootstrapAppRequest() {
  yield takeLatest(BOOTSTRAP_APP_REQUEST, bootstrapAppRequestSaga);
}
