import { ITravelAgent } from 'services/BackendApi';
export interface IAgentsModuleDomain {
  requestPending: boolean;
  agents: ITravelAgent[] | undefined;
  error: string | undefined;
}

export const initialState: IAgentsModuleDomain = {
  requestPending: false,
  agents: undefined,
  error: undefined,
};
