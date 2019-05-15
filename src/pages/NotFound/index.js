import { lazy } from 'react';

export { default } from './NotFound';

export const AsyncNotFound = lazy(() => import('./NotFound'));
