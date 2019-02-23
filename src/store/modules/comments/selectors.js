import utils from 'store/utils';

const model = 'comments';

export const getComments = (state, { ids } = {}) => utils.getList({ state, model, ids });
export const getComment = (state, key) => utils.getItem({ state, model, key });
