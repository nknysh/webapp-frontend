import client from './index';

export const getUser = () => client.get('/users/me');

export const signUp = values => client.post('/users', values);

export const logIn = values => client.post('/users/login', values);

export const logOut = values => client.post('/users/logout', values);

export const resetPassword = values => client.post('/users/reset', values);

export const setPassword = values => client.patch('/users', values);

export default { getUser, signUp, logIn, logOut, resetPassword, setPassword };
