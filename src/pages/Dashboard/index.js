import { lazy } from 'react';

export { default } from './Dashboard';
export const AsyncDashboard = lazy(() => import('./Dashboard'));
