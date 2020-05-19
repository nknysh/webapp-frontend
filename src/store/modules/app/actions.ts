export const SET_LATEST_APP_VERSION = 'app/SET_LATEST_APP_VERSION';

export type SetLatestAppVersion = ReturnType<typeof setLatestAppVersion>;
export const setLatestAppVersion = (latestAppVersion: string, isAppDeprecated: boolean) => ({
  type: SET_LATEST_APP_VERSION as typeof SET_LATEST_APP_VERSION,
  latestAppVersion,
  isAppDeprecated
});


export type AppAction =
 | SetLatestAppVersion
