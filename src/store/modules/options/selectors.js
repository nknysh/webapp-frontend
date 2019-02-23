import utils from 'store/utils';

const model = 'options';

export const getOptions = (state, { ids } = {}) => utils.getList({ state, model, ids });
export const getOption = (state, key) => utils.getItem({ state, model, key });
