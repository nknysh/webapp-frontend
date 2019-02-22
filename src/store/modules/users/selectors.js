import utils from 'store/utils';

const model = 'users';

export const getUsers = (state, { ids } = {}) => utils.getList({ state, model, ids });
export const getUser = (state, key) => utils.getItem({ state, model, key });
