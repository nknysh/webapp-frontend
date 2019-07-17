import client from './index';

export const getUsers = (params, opts) => client.get('/users', { params, ...opts });

export const me = (params, opts) => client.get('/users/me', { params, ...opts });

export default { getUsers, me };
