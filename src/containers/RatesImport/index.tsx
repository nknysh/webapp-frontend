import React from 'react';

import { EImportEntity } from '../../store/modules/importer/model';
import { ratesImportDomainSelector } from '../../store/modules/ratesImport/selectors';

import Importer, { IImportProps } from 'pureUi/Importer';
import { WithImporter } from 'hoc/WithImporter';

const RatesImportContainer = (props: Omit<IImportProps, 'entityName'>) =>
  <Importer entityName="rates" {...props}/>;

export const RatesImportContainerConnected = WithImporter(
  EImportEntity.RATES,
  ratesImportDomainSelector
)(RatesImportContainer);