import admin from './admin';
import auth from './auth';
import bookings from './bookings';
import proposals from './proposals';
import settings from './settings';
import site from './site';
import users from './users';
import notFound from './notFound';

export default [...site, ...admin, ...auth, ...bookings, ...proposals, ...settings, ...users, ...notFound];
