import { lazy } from 'react';

export { default } from './Hotel';

export const AsyncHotel = lazy(() => import('./Hotel'));
