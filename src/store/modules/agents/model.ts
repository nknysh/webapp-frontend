import { ITravelAgent } from 'services/BackendApi';
export interface IAgentsModuleDomain {
  requestPending: boolean;
  agents: ITravelAgent[] | undefined;
  error: string | undefined;
  isFetchingTA: boolean;
  selectedTa: ITravelAgent | null;
  showTaDropdown: boolean;
  taNameSearch: string;
}

export const initialState: IAgentsModuleDomain = {
  requestPending: false,
  agents: undefined,
  error: undefined,
  isFetchingTA: false,
  selectedTa: null,
  showTaDropdown: false,
  taNameSearch: '',
};
