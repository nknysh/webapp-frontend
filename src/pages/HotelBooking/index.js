import { lazy } from 'react';

export { default } from './HotelBooking';

export const AsyncHotelBooking = lazy(() => import('./HotelBooking'));
