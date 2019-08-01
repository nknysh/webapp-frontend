import client from './index';

export const getUsers = (params, opts) => client.get('/users', { params, ...opts });

export const me = (params, opts) => client.get('/users/me', { params, ...opts });

export const updateUser = (id, body, params, opts) => client.patch(`/users/${id}`, body, { params, ...opts });

export default { getUsers, me, updateUser };
