export const BOOTSTRAP_APP_REQUEST = 'bootstrap/BOOTSTRAP_APP_REQUEST';
export const BOOTSTRAP_APP_SUCCESS = 'bootstrap/BOOTSTRAP_APP_SUCCESS';
export const BOOTSTRAP_APP_FAILURE = 'bootstrap/BOOTSTRAP_APP_FAILURE';

export type BootstrapAppRequestAction = ReturnType<typeof bootstrapAppRequestAction>;
export const bootstrapAppRequestAction = () => ({
  type: BOOTSTRAP_APP_REQUEST as typeof BOOTSTRAP_APP_REQUEST,
});

export type BootstrapAppSuccessAction = ReturnType<typeof bootstrapAppSuccessAction>;
export const bootstrapAppSuccessAction = (countries: any[], hotels: any[]) => ({
  type: BOOTSTRAP_APP_SUCCESS as typeof BOOTSTRAP_APP_SUCCESS,
  countries,
  hotels,
});

export type BootstrapAppFailureAction = ReturnType<typeof bootstrapAppFailureAction>;
export const bootstrapAppFailureAction = (error: any) => ({
  type: BOOTSTRAP_APP_FAILURE as typeof BOOTSTRAP_APP_FAILURE,
  error,
});

export type BoostrapDomainAction = BootstrapAppRequestAction | BootstrapAppSuccessAction | BootstrapAppFailureAction;
