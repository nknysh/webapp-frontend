import { createSelector } from 'reselect';

import { ITravelAgentsDomain } from './model';
import { getTaFullName } from 'store/utils';

const travelAgentsDomain = (state: any): ITravelAgentsDomain => state.travelAgents;

export const travelAgentsSelector = createSelector(
  travelAgentsDomain,
  (domain: ITravelAgentsDomain): ITravelAgentsDomain['travelAgents'] | null => domain.travelAgents
);

export const selectedTaSelector = createSelector(
  travelAgentsDomain,
  (domain: ITravelAgentsDomain): ITravelAgentsDomain['selectedTa'] | null => domain.selectedTa
);

export const showTaDropdownSelector = createSelector(
  travelAgentsDomain,
  (domain: ITravelAgentsDomain): ITravelAgentsDomain['showTaDropdown'] => domain.showTaDropdown
);

export const taNameSearchSelector = createSelector(
  travelAgentsDomain,
  (domain: ITravelAgentsDomain): ITravelAgentsDomain['taNameSearch'] => domain.taNameSearch
);

export const isFetchingTaSelector = createSelector(
  travelAgentsDomain,
  (domain: ITravelAgentsDomain): ITravelAgentsDomain['isFetchingTA'] => domain.isFetchingTA
);

export const taNamesSelector = createSelector(
  travelAgentsDomain,
  (domain: ITravelAgentsDomain): string[] => {
    if (!domain.travelAgents) {
      return [];
    }
    return domain.travelAgents.map(getTaFullName).filter(name => name.toLocaleLowerCase().search(domain.taNameSearch.toLocaleLowerCase()) !== -1);
  }
);
