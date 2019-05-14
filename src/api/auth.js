import client from './index';

export const getUser = () => client.get('/users/me');

export const signUp = values => client.post('/users/signup', values);

export const logIn = values => client.post('/users/login', values);

export const logOut = () => client.post('/users/logout');

export const resetPassword = values => client.post('/users/reset-password', values);

export const setPassword = values => client.patch('/users/set-password', values);

export default { getUser, signUp, logIn, logOut, resetPassword, setPassword };
