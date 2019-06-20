import client from './index';

export const getUsers = params => client.get('/users', { params });

export default { getUsers };
