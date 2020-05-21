import { rootSagaFactory } from '../importer/sagas';
import { EImportEntity }  from '../importer/model';

import { ratesImportDomainSelector } from './selectors';

export default rootSagaFactory({
  entity: EImportEntity.RATES,
  domainSelector: ratesImportDomainSelector,
  importApiCall: backendApi => backendApi.importRates(),
  importStatusApiCall: backendApi => backendApi.getRatesImportStatus()
});
