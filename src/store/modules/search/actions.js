export const SEARCH_INDEX_BUILD = 'SEARCH_INDEX_BUILD';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

export const buildIndex = payload => ({
  type: SEARCH_INDEX_BUILD,
  payload,
});

export const setSearchQuery = payload => ({
  type: SET_SEARCH_QUERY,
  payload,
});
