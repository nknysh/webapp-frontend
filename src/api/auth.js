import client from './index';

export const getUserFromToken = token => client.query({ token }).get('/users/me');

export const signUp = values => client.post('/users', values);

export const logIn = values => client.post('/users/login', values);

export const resetPassword = values => client.post('/users/reset', values);

export default { getUserFromToken, signUp, logIn, resetPassword };
