import { lazy } from 'react';

export { default } from './Logout';

export const AsyncLogout = lazy(() => import('./Logout'));
