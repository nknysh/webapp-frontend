import Request, { Loopback } from './request';

const request = new Request(Loopback);

export const getUserFromToken = ({ token }) => {
  const endpoint = '/api/users/me';
  return request()
    .withAuth(token)
    .get(endpoint);
};

export const signUp = (values) => {
  const endpoint = '/api/users';
  return request()
    .post(endpoint, values);
};

export const logIn = (values) => {
  const endpoint = '/api/users/login';
  return request()
    .post(endpoint, values, { params: { include: 'user' }});
};

export const resetPassword = (values) => {
  const endpoint = '/api/users/reset';
  return request()
    .post(endpoint, values);
};
