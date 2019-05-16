import { lazy } from 'react';

export { default } from './ContentPage';
export const AsyncContentPage = lazy(() => import('./ContentPage'));
