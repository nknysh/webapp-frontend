import client from './index';

export const getUser = (params, opts) => client.get('/users/me', { params, ...opts });

export const signUp = (body, params, opts) => client.post('/users/signup', body, { params, ...opts });

export const logIn = (body, params, opts) => client.post('/users/login', body, { params, ...opts });

export const logOut = (body, params, opts) => client.post('/users/logout', body, { params, ...opts });

export const resetPassword = (body, params, opts) => client.post('/users/reset-password', body, { params, ...opts });

export const setPassword = (body, params, opts) => client.patch('/users/set-password', body, { params, ...opts });

export const updatePassword = (body, params, opts) => client.patch('/users/update-password', body, { params, ...opts });

export default { getUser, signUp, logIn, logOut, resetPassword, setPassword, updatePassword };
