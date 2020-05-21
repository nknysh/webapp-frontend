import React from 'react';

import { EImportEntity } from '../../store/modules/importer/model';
import { allotmentsImportDomainSelector } from '../../store/modules/allotmentsImport/selectors';

import Importer, { IImportProps } from 'pureUi/Importer';
import { WithImporter } from 'hoc/WithImporter';

const AllotmentsImportContainer = (props: Omit<IImportProps, 'entityName'>) =>
  <Importer entityName="allotments" {...props}/>;

export const AllotmentsImportContainerConnected = WithImporter(
  EImportEntity.ALLOTMENTS,
  allotmentsImportDomainSelector
)(AllotmentsImportContainer);