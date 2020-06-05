import { createSelector } from 'reselect';
import { IAgentsModuleDomain } from './model';
import { IValueLabelPair } from '../../../interfaces';
import { ITravelAgent } from 'services/BackendApi';
import { getTaFullName } from 'store/utils';

export const domainSelector = (state: any) => state.agents;

export const requestPendingSelector = createSelector(
  domainSelector,
  (domain: IAgentsModuleDomain): IAgentsModuleDomain['requestPending'] => domain.requestPending
);

export const agentsSelector = createSelector(
  domainSelector,
  (domain: IAgentsModuleDomain): IAgentsModuleDomain['agents'] => domain.agents
);

export const errorSelector = createSelector(
  domainSelector,
  (domain: IAgentsModuleDomain): IAgentsModuleDomain['error'] => domain.error
);

export const travelAgentSelectOptionsSelector = createSelector(
  agentsSelector,
  requestPendingSelector,
  errorSelector,
  (agents: ITravelAgent[] | undefined, requestPending: boolean, error: string | undefined): IValueLabelPair[] => {
    if (requestPending) {
      return [{ value: '', label: 'Loading travel agents', disabled: true }];
    }

    if (error) {
      return [{ value: '', label: 'Error loading agents', disabled: true }];
    }

    if (!agents) {
      return [{ value: '', label: 'No Agents', disabled: true }];
    }

    const initialOption = { value: '', label: 'All Agents' };
    const options = agents.map(ta => ({
      value: ta.uuid,
      label: `${ta.title}. ${ta.firstName} ${ta.lastName}`,
    }));

    return [initialOption, ...options];
  }
);

export const selectedTaSelector = createSelector(
  domainSelector,
  (domain: IAgentsModuleDomain): IAgentsModuleDomain['selectedTa'] | null => domain.selectedTa
);

export const showTaDropdownSelector = createSelector(
  domainSelector,
  (domain: IAgentsModuleDomain): IAgentsModuleDomain['showTaDropdown'] => domain.showTaDropdown
);

export const taNameSearchSelector = createSelector(
  domainSelector,
  (domain: IAgentsModuleDomain): IAgentsModuleDomain['taNameSearch'] => domain.taNameSearch
);

export const isFetchingTaSelector = createSelector(
  domainSelector,
  (domain: IAgentsModuleDomain): IAgentsModuleDomain['isFetchingTA'] => domain.isFetchingTA
);

export const selectedCompanySelector = createSelector(
  domainSelector,
  (domain: IAgentsModuleDomain): IAgentsModuleDomain['selectedCompany'] => domain.selectedCompany
);

export const showCompanyDropdownSelector = createSelector(
  domainSelector,
  (domain: IAgentsModuleDomain): IAgentsModuleDomain['showCompanyDropdown'] => domain.showCompanyDropdown
);

export const companyNameSearchSelector = createSelector(
  domainSelector,
  (domain: IAgentsModuleDomain): IAgentsModuleDomain['companyNameSearch'] => domain.companyNameSearch
);

export const isFetchingCompaniesSelector = createSelector(
  domainSelector,
  (domain: IAgentsModuleDomain): IAgentsModuleDomain['isFetchingCompanies'] => domain.isFetchingCompanies
);

export const companiesSelector = createSelector(
  domainSelector,
  (domain: IAgentsModuleDomain): IAgentsModuleDomain['companies'] => domain.companies
);

export const selectedCompanyAgents = createSelector(
  domainSelector,
  (domain: IAgentsModuleDomain): IAgentsModuleDomain['selectedCompanyAgents'] => domain.selectedCompanyAgents
);

export const selectedCompanyAgentsNames = createSelector(
  domainSelector,
  (domain: IAgentsModuleDomain): string[] => {
    if (!domain.selectedCompanyAgents) {
      return [];
    }
    return domain.selectedCompanyAgents.map(getTaFullName).filter(name => name.toLocaleLowerCase().search(domain.taNameSearch.toLocaleLowerCase()) !== -1);
  }
);

export const companiesNamesSelector = createSelector(
  domainSelector,
  (domain: IAgentsModuleDomain): string[] => {
    if (!domain.companies) {
      return [];
    }
    return domain.companies.map(c => c.name).filter(name => name.toLocaleLowerCase().search(domain.companyNameSearch.toLocaleLowerCase()) !== -1);
  }
);
