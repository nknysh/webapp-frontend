import client from './index';

/**
 * Get User (Me)
 *
 * Get current user
 *
 * @param {*} params
 * @param {*} opts
 * @returns {Promise}
 */
export const getUser = (params, opts) => client.get('/users/me', { params, ...opts });

/**
 * Sign up
 *
 * Create user account
 *
 * @param {object} body
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 */
export const signUp = (body, params, opts) => client.post('/users/signup', body, { params, ...opts });

/**
 * Login
 *
 * @param {object} body
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const logIn = (body, params, opts) => client.post('/users/login', body, { params, ...opts });

/**
 * Auth0 callback
 *
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const auth0Callback = (params, opts) => client.get('/users/auth0/callback', { params, ...opts });

/**
 * Log out
 *
 * @param {object} body
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const logOut = (body, params, opts) => client.post('/users/logout', body, { params, ...opts });

/**
 * Reset password
 *
 * @param {object} body
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const resetPassword = (body, params, opts) => client.post('/users/reset-password', body, { params, ...opts });

/**
 * Set password
 *
 * @param {object} body
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const setPassword = (body, params, opts) => client.patch('/users/set-password', body, { params, ...opts });

/**
 *
 * @param {object} body
 * @param {*} params
 * @param {Partial<AxiosRequestConfig>} opts
 * @returns {Promise}
 */
export const updatePassword = (body, params, opts) => client.patch('/users/update-password', body, { params, ...opts });

export default { getUser, signUp, logIn, auth0Callback, logOut, resetPassword, setPassword, updatePassword };
