import utils from 'store/utils';

const model = 'salesRepresentatives';

export const getSalesRepresentatives = (state, { ids } = {}) => utils.getList({ state, model, ids });
export const getSalesRepresentative = (state, key) => utils.getItem({ state, model, key });
