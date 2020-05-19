import * as pj from '../../../../package.json';

export interface IAppState {
  latestAppVersion: string;
  isAppDeprecated: boolean;
}

export const initialState: IAppState = {
  latestAppVersion: pj.version,
  isAppDeprecated: false
};
