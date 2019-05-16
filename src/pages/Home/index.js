import { lazy } from 'react';

export { default } from './Home';

export const AsyncHome = lazy(() => import('./Home'));
