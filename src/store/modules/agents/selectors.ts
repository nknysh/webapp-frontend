import { createSelector } from 'reselect';
import { IAgentsModuleDomain } from './model';
import { IValueLabelPair } from '../../../interfaces';
import { ITravelAgent } from 'services/BackendApi';

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
