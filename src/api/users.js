import client from './index';

/**
 * Get users
 *
 * Get a list of users (permissions handled by backend)
 *
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const getUsers = (params, opts) => client.get('/users', { params, ...opts });

/**
 * Me
 *
 * Get's current user
 *
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const me = (params, opts) => client.get('/users/me', { params, ...opts });

/**
 * Update user
 *
 * Patch on a user.  Certain roles can only patch certain fields
 * Please refer to webapp-backend
 *
 * @param {string} id
 * @param {object} body
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const updateUser = (id, body, params, opts) => client.patch(`/users/${id}`, body, { params, ...opts });

export default { getUsers, me, updateUser };
