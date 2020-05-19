import { EImportEntity }  from '../importer/model';
import { importReducer } from '../importer/reducer';

export const allotmentsImport = importReducer(EImportEntity.ALLOTMENTS);
