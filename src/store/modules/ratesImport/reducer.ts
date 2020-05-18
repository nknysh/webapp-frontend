import { EImportEntity }  from '../importer/model';
import { importReducer } from '../importer/reducer';

export const ratesImport = importReducer(EImportEntity.RATES);
