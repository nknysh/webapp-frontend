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

export const taNamesSelector = createSelector(
  domainSelector,
  (domain: IAgentsModuleDomain): string[] => {
    if (!domain.agents) {
      return [];
    }
    return domain.agents.map(getTaFullName).filter(name => name.toLocaleLowerCase().search(domain.taNameSearch.toLocaleLowerCase()) !== -1);
  }
);
