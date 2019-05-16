import { lazy } from 'react';

export { default } from './Login';

export const AsyncLogin = lazy(() => import('./Login'));
