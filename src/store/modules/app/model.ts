import { CIRCLE_BUILD_NUM } from 'config';

export interface IAppState {
  latestAppVersion: string;
  isAppDeprecated: boolean;
}

export const initialState: IAppState = {
  latestAppVersion: CIRCLE_BUILD_NUM,
  isAppDeprecated: false
};
