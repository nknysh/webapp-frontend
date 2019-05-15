import { lazy } from 'react';

export { default } from './PasswordReset';

export const AsyncPasswordReset = lazy(() => import('./PasswordReset'));
