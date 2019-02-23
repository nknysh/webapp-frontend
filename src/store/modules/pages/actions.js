export const GET_PAGE = 'GET_PAGE';

export const getPageById = pageId => ({
  type: GET_PAGE,
  payload: { pageId },
});
