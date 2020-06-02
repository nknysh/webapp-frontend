import { ITravelAgent } from 'services/BackendApi/types';

export interface ITravelAgentsDomain {
  isFetchingTA: boolean;
  travelAgents: ITravelAgent[] | null;
  selectedTa: ITravelAgent | null;
  showTaDropdown: boolean;
  taNameSearch: string;
}

export const initialState: ITravelAgentsDomain = {
  isFetchingTA: false,
  travelAgents: null,
  selectedTa: null,
  showTaDropdown: false,
  taNameSearch: '',
}