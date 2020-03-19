import {
  importRatesRequestAction,
  importRatesSuccessAction,
  importRatesFailureAction,
  getRatesImportStatusRequestAction,
  getRatesImportStatusSuccessAction,
  getRatesImportStatusFailureAction,
  ratesImportPageLoaded,
  ratesImportPageUnloaded,
  openRatesImportConfirmationModal,
  confirmRatesImportIntent,
  cancelRatesImportIntent
} from '../actions';

import { ratesImportStatus } from './mock';

describe('Rates Import actions', () => {
  it('Returns the correct object literals', () => {
    expect(importRatesRequestAction()).toMatchSnapshot();
    expect(importRatesSuccessAction(ratesImportStatus)).toMatchSnapshot();
    expect(importRatesFailureAction('Failed to import rates')).toMatchSnapshot();
    expect(getRatesImportStatusRequestAction()).toMatchSnapshot();
    expect(getRatesImportStatusSuccessAction(ratesImportStatus)).toMatchSnapshot();
    expect(getRatesImportStatusFailureAction('Failed to get import rates status')).toMatchSnapshot();
    expect(ratesImportPageLoaded()).toMatchSnapshot();
    expect(ratesImportPageUnloaded()).toMatchSnapshot();
    expect(openRatesImportConfirmationModal()).toMatchSnapshot();
    expect(confirmRatesImportIntent()).toMatchSnapshot();
    expect(cancelRatesImportIntent()).toMatchSnapshot();
  });
});
