import { join, curry } from 'ramda';

export const searchByQueries = curry((index, queries = []) => index.search(join(' ', queries)));
