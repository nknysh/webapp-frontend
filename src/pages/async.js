import { lazy } from 'react';

export const AsyncAdminRedirect = lazy(() => import('./AdminRedirect'));
export const AsyncBooking = lazy(() => import('./Booking'));
export const AsyncContentPage = lazy(() => import('./ContentPage'));
export const AsyncCreateAccount = lazy(() => import('./CreateAccount'));
export const AsyncDashboard = lazy(() => import('./Dashboard'));
export const AsyncHome = lazy(() => import('./Home'));
export const AsyncHomeAuthenticated = lazy(() => import('./HomeAuthenticated'));
export const AsyncHotel = lazy(() => import('./Hotel'));
export const AsyncHotelBooking = lazy(() => import('./HotelBooking'));
export const AsyncLogin = lazy(() => import('./Login'));
export const AsyncLogout = lazy(() => import('./Logout'));
export const AsyncNotFound = lazy(() => import('./NotFound'));
export const AsyncPasswordReset = lazy(() => import('./PasswordReset'));
export const AsyncProposal = lazy(() => import('./Proposal'));
export const AsyncSearch = lazy(() => import('./Search'));
export const AsyncSetPassword = lazy(() => import('./SetPassword'));
export const AsyncUser = lazy(() => import('./User'));

export const AsyncProposalList = lazy(() => import('../containers/ProposalList'));
export const AsyncBookingList = lazy(() => import('../containers/BookingList'));
export const AsyncOffersList = lazy(() => import('../containers/OffersList'));
export const AsyncOffersView = lazy(() => import('../containers/OffersView'));
