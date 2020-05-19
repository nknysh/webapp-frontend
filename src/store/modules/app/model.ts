import * as pj from '../../../../package.json';

export interface AppState {
  latestAppVersion: string;
  isAppDeprecated: boolean;
}

export const initialState: AppState = {
  latestAppVersion: pj.version,
  isAppDeprecated: false
};
