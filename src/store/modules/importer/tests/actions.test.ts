import {
  importRequestAction,
  importSuccessAction,
  importFailureAction,
  getImportStatusRequestAction,
  getImportStatusSuccessAction,
  getImportStatusFailureAction,
  importPageLoaded,
  importPageUnloaded,
  openImportConfirmationModal,
  confirmImportIntent,
  cancelImportIntent
} from '../actions';

import { EImportEntity } from '../model';
import { importStatus } from './mock';

describe('Import actions', () => {
  it('Returns the correct object literals', () => {
    const workbookId = '123-456';
    const entity = EImportEntity.RATES;

    expect(importRequestAction(entity)).toMatchSnapshot();
    expect(importSuccessAction(entity, importStatus, workbookId)).toMatchSnapshot();
    expect(importFailureAction(entity, 'Failed to import rates')).toMatchSnapshot();
    expect(getImportStatusRequestAction(entity)).toMatchSnapshot();
    expect(getImportStatusSuccessAction(entity, importStatus, workbookId)).toMatchSnapshot();
    expect(getImportStatusFailureAction(entity, 'Failed to get import rates status')).toMatchSnapshot();
    expect(importPageLoaded(entity)).toMatchSnapshot();
    expect(importPageUnloaded(entity)).toMatchSnapshot();
    expect(openImportConfirmationModal(entity)).toMatchSnapshot();
    expect(confirmImportIntent(entity)).toMatchSnapshot();
    expect(cancelImportIntent(entity)).toMatchSnapshot();
  });
});
