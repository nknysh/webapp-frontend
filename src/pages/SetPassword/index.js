import { lazy } from 'react';

export { default } from './SetPassword';

export const AsyncSetPassword = lazy(() => import('./SetPassword'));
