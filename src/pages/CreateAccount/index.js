import { lazy } from 'react';

export { default } from './CreateAccount';

export const AsyncCreateAccount = lazy(() => import('./CreateAccount'));
