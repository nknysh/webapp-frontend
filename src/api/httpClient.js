import { fetchUtils } from 'react-admin';

export default (url, options = {}) => {
  const token = localStorage.getItem('authToken');
  if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
  }
  options.headers.set('Authorization', `${token}`);
  return fetchUtils.fetchJson(url, options);
}