import { lazy } from 'react';

export { default } from './HomeAuthenticated';

export const AsyncHomeAuthenticated = lazy(() => import('./HomeAuthenticated'));
