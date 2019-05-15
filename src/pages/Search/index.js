import { lazy } from 'react';

export { default } from './Search';

export const AsyncSearch = lazy(() => import('./Search'));
