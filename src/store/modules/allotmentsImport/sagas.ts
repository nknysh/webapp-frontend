import { rootSagaFactory } from '../importer/sagas';
import { EImportEntity }  from '../importer/model';

import { allotmentsImportDomainSelector } from './selectors';

export default rootSagaFactory({
  entity: EImportEntity.ALLOTMENTS,
  domainSelector: allotmentsImportDomainSelector,
  importApiCall: backendApi => backendApi.importAllotments(),
  importStatusApiCall: backendApi => backendApi.getAllotmentsImportStatus()
});
