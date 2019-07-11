import client from './index';

export const getUsers = (params, opts) => client.get('/users', { params, ...opts });

export default { getUsers };
